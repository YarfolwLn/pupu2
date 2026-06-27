<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {register} from '../services/api'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

const error =ref('')

async function reg() {
    console.log({email:email.value,
            password:password.value,
            name: name.value})
    try {
        await register({
            email:email.value,
            password:password.value,
            name: name.value
        })

        alert('Регистрация успешна!')
        router.push('/login')
    } catch (err) {
        error.value = err.message
        alert(error.value)
    }
}
</script>

<template>
<!-- ЭКРАН: РЕГИСТРАЦИЯ -->
            <div id="screen-register">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h1 class="mb-0">
                        <i class="fas fa-user-plus me-2"></i>Регистрация
                    </h1>
                    <router-link to="/" class="btn btn-outline-secondary" data-screen="catalog">
                        <i class="fas fa-arrow-left me-2"></i>На главную
                    </router-link>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card shadow">
                            <div class="card-body p-4">
                                <form @submit.prevent="reg" id="register-form">
                                    <div class="mb-3">
                                        <label for="register-name" class="form-label">Имя</label>
                                        <input v-model="name" type="text" class="form-control" id="register-name" name="name" required>
                                        <div class="invalid-feedback" id="register-name-error"></div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="register-email" class="form-label">Email</label>
                                        <input v-model="email" type="email" class="form-control" id="register-email" name="email" required>
                                        <div class="invalid-feedback" id="register-email-error"></div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="register-password" class="form-label">Пароль</label>
                                        <input v-model="password" type="password" class="form-control" id="register-password" name="password" required>
                                        <div class="invalid-feedback" id="register-password-error"></div>
                                    </div>
                                    <button type="submit" class="btn btn-custom w-100">
                                        <i class="fas fa-user-plus me-2"></i>Зарегистрироваться
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

</template>