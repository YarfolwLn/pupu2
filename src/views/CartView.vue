<script setup>

import { ref, onMounted } from 'vue'
import { getCart, createOrder, removeFromCart, updateCartQuantity } from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const cart = ref({items:[],total: 0})
const loading = ref(true)

onMounted(async () =>{
    const token = localStorage.getItem('token')
    if (!token) {
        router.push('/')
        return
    }
    try {
        loading.value = true
        cart.value = await getCart()
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
})

async function checkout () {
    try {
        await createOrder()
        alert('Заказ оформлен')
        router.push('/orders')
    } catch (e) {
        alert(e.message)
    }
}

async function updateQuantity(productId, quantity) {
    if (quantity < 1) return
    try {
        await updateCartQuantity(productId, quantity)
        cart.value = await getCart()
    } catch (e) {
        console.error(e)
    }
}

async function removeItem(productId) {
    try {
        await removeFromCart(productId)
        cart.value = await getCart()
    } catch (e) {
        console.error(e)
    }
}

</script>

<template>
<!-- ЭКРАН: КОРЗИНА -->
            <div id="screen-cart">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <router-link to="/cart" class="mb-0">
                        <i class="fas fa-shopping-cart me-2"></i>Корзина
                    </router-link>
                    <router-link to="/" class="btn btn-outline-secondary" data-screen="catalog">
                        <i class="fas fa-arrow-left me-2"></i>Назад в каталог
                    </router-link>
                </div>

                <!-- Empty cart -->
                <div id="cart-empty" v-if="cart.items.length === 0" class="text-center py-5">
                    <i class="fas fa-shopping-basket fa-4x text-muted mb-3"></i>
                    <p class="text-muted h4">Корзина пуста</p>
                    <router-link to="/" class="btn btn-custom mt-3" data-screen="catalog">
                        Перейти в каталог
                    </router-link>
                </div>

                <!-- Cart items -->
                <div id="cart-items" v-else>
                    <div class="list-group mb-4">
                        <!-- Пример товара в корзине - будет заменен динамически -->
                        <div class="list-group-item cart-item d-flex align-items-center" v-for="item in cart.items" :key="item.productId">
                            <img :src="item.image || 'https://via.placeholder.com/300x200?text=Сувенир'" 
                             class="card-img-top product-image" 
                             :alt="item.name">
                            <div class="flex-grow-1">
                                <h5 class="mb-1">{{item.name}}</h5>
                                <p class="mb-0 text-muted">{{item.price}}</p>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <button class="quantity-btn decrease-btn" @click="updateQuantity(item.productId, item.quantity - 1)">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="fw-bold mx-2" style="min-width: 30px; text-align: center;" >{{ item.quantity }}</span>
                                <button class="quantity-btn increase-btn" @click="updateQuantity(item.productId, item.quantity + 1)">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <div class="ms-4 text-end">
                                <p class="mb-0 fw-bold text-primary h5">{{ item.price }} ₽</p>
                            </div>
                            <button class="btn btn-outline-danger ms-3 remove-btn" @click="removeItem(item.productId)">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Cart summary -->
                    <div class="card shadow">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 class="mb-0">Итого:</h4>
                                    <p class="text-muted mb-0" id="cart-total">{{ cart.items.length }} товаров на сумму {{ cart.total }} ₽</p>
                                </div>
                                <button @click="checkout" class="btn btn-custom btn-lg" id="checkout-btn">
                                    <i class="fas fa-credit-card me-2"></i>Оформить заказ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>