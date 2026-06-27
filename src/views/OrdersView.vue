<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getOrders } from '../services/api'

const router = useRouter()
const orders = ref([])
const loading = ref(true)

onMounted(async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        router.push('/')
        return
    }
    try {
        loading.value = true
        orders.value = await getOrders()
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <!-- ЭКРАН: ОФОРМЛЕННЫЕ ЗАКАЗЫ -->
            <div id="screen-orders">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <router-link to="/orders" class="mb-0">
                        <i class="fas fa-receipt me-2"></i>Мои заказы
                    </router-link>
                    <router-link to="/" class="btn btn-outline-secondary" data-screen="catalog">
                        <i class="fas fa-arrow-left me-2"></i>Назад в каталог
                    </router-link>
                </div>

                <!-- Loading state -->
                <div id="orders-loading" class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Загрузка...</span>
                    </div>
                </div>

                <!-- Empty orders -->
                <div id="orders-empty" v-if="!loading && orders.length === 0">
                    <i class="fas fa-inbox fa-4x text-muted mb-3"></i>
                    <p class="text-muted h4">У вас пока нет заказов</p>
                    <router-link to="/" class="btn btn-custom mt-3" data-screen="catalog">
                        Перейти в каталог
                    </router-link>
                </div>

                <!-- Orders list -->
                <div id="orders-list" v-else class="row g-4">
                    <!-- Пример заказа - будет заменен динамически -->
                    <div v-for="order in orders" :key="order.id" class="col-12">
                        <div class="card shadow">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <h5 class="card-title mb-1">Заказ #{{order.id}}</h5>
                                        <p class="text-muted mb-0">
                                            <i class="fas fa-calendar me-2"></i>{{ order.createdAt }}
                                        </p>
                                    </div>
                                    <div class="text-end">
                                        <span class="badge bg-warning">{{ order.status }}</span>
                                        <p class="mb-0 fw-bold text-primary h4 mt-2">{{order.total}} ₽</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="table-responsive">
                                    <table class="table table-sm mb-0">
                                        <thead>
                                            <tr>
                                                <th>Товар</th>
                                                <th class="text-center">Количество</th>
                                                <th class="text-end">Цена</th>
                                                <th class="text-end">Сумма</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in order.items">
                                                <td>{{ item.name }}</td>
                                                <td class="text-center">{{ item.quantity }}</td>
                                                <td class="text-end">{{ item.price }} ₽</td>
                                                <td class="text-end">{{ item.price * item.quantity}} ₽</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colspan="3" class="text-end fw-bold">Итого:</td>
                                                <td class="text-end fw-bold text-primary">{{order.total}} ₽</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>