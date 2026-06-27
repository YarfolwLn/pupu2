<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getProducts, addToCart, getCart } from '../services/api'

const router = useRouter()
const products = ref([])
const isAuthenticated = ref(false)
const user = ref(null)
const cartCount = ref(0)

function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    isAuthenticated.value= false
    user.value=null
    router.push('/')
}

async function addcart(productId){
    try {
        await addToCart(productId)
        const cartData = await getCart()
        cartCount.value= cartData.items.length
        alert('Товар добавлен в корзину')
    } catch (e) {
        alert(e.message)
    }
}

// Проверяем авторизацию
const checkAuth = () => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
        isAuthenticated.value = true
        try {
            user.value = JSON.parse(userData)
        } catch (e) {
            user.value = null
        }
    } else {
        isAuthenticated.value = false
        user.value = null
    }
}

onMounted(async () =>{
    checkAuth()
    if (isAuthenticated.value) {
    try {
        const cartData = await getCart()
        cartCount.value = cartData.items.length
    } catch (e) {
        // пу
    }
    }
    products.value =
    await getProducts()
})

</script>


<template>
    <!-- ЭКРАН: КАТАЛОГ ТОВАРОВ -->
            <div id="screen-catalog" class="screen active">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h1 to="/" class="mb-0">
                        <i class="fas fa-gift me-2"></i>Каталог сувениров
                    </h1>
                    <div class="d-flex gap-3 align-items-center">
                        <router-link to="/register" class="nav-link" data-screen="register" v-if="!isAuthenticated">Регистрация</router-link>
                        <router-link to="/login" class="nav-link" data-screen="login" v-if="!isAuthenticated">Вход</router-link>
                        <a href="#" class="nav-link" v-if="isAuthenticated" id="logout-link" @click.prevent="logout">Выход</a>
                        <router-link to="/cart" class="btn btn-custom position-relative" v-if="isAuthenticated" id="cart-link">
                            <i class="fas fa-shopping-cart"></i>
                            Корзина
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cart-badge" v-if="cartCount > 0">
                                {{ cartCount }}
                            </span>
                        </router-link>
                        <router-link to="/orders" class="nav-link" id="orders-link" v-if="isAuthenticated">Мои заказы</router-link>
                    </div>
                </div>

                <!-- Loading state -->
                <div id="catalog-loading" class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Загрузка...</span>
                    </div>
                </div>

                <!-- Products grid -->
                <div id="products-grid" class="row g-4">
                    <!-- Пример товара - будет заменен динамически -->
                    <div
                    v-for="product in products"
                    :key="product.id"
                    class="col-md-6 col-lg-4"
                    >
                        <div class="card product-card h-100">
                            <img :src="product.image || 'https://via.placeholder.com/300x200?text=Сувенир'" 
                             class="card-img-top product-image" 
                             :alt="product.name">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">{{ product.name }}</h5>
                                <p class="card-text text-muted">{{ product.description }}</p>
                                <div class="mt-auto">
                                    <p class="card-text fw-bold text-primary h4 mb-3">{{ product.price }}</p>
                                    <button class="btn btn-custom w-100 add-to-cart-btn" v-if="isAuthenticated" @click="addcart(product.id)">
                                        <i class="fas fa-cart-plus me-2"></i>В корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>