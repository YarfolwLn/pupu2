<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/api'

const router = useRouter()

const email = ref('')
const password = ref('')
const error =ref('')

async function loginin() {
    try {
        const response = await login({
            email:email.value,
            password:password.value
        })

        alert('Успешный вход!')
        if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user))
        }
        router.push('/')
    } catch (err) {
        error.value=err.message
        alert(error.value)
    }
}
</script>

<template>
<!-- ЭКРАН: ВХОД В СИСТЕМУ -->
            <div id="screen-login">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h1 class="mb-0">
                        <i class="fas fa-sign-in-alt me-2"></i>Вход в систему
                    </h1>
                    <router-link to="/" class="btn btn-outline-secondary" data-screen="catalog">
                        <i class="fas fa-arrow-left me-2"></i>На главную
                    </router-link>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card shadow">
                            <div class="card-body p-4">
                                <form @submit.prevent="loginin" id="login-form">
                                    <div class="mb-3">
                                        <label for="login-email" class="form-label">Email</label>
                                        <input v-model="email" type="email" class="form-control" id="login-email" name="email" required>
                                        <div class="invalid-feedback" id="login-email-error"></div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="login-password" class="form-label">Пароль</label>
                                        <input v-model="password" type="password" class="form-control" id="login-password" name="password" required>
                                        <div class="invalid-feedback" id="login-password-error"></div>
                                    </div>
                                    <button type="submit" class="btn btn-custom w-100">
                                        <i class="fas fa-sign-in-alt me-2"></i>Войти
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>