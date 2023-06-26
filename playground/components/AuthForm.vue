<script setup lang="ts">
interface IAuthProps {
	type: 'login' | 'register'
}

interface IAuthFormData {
	email: {
		data: string
		error: string
	}
	password: {
		data: string
		error: string
	}
	confirmPassword: {
		data: string
		error: string
	}
}

const props = defineProps<IAuthProps>()

const isLogin = computed(() => props.type === 'login')

const formData = ref<IAuthFormData>({
	email: {
		data: '',
		error: '',
	},
	password: {
		data: '',
		error: '',
	},
	confirmPassword: {
		data: '',
		error: '',
	},
})
const isLoading = ref(false)

function validateEmail(email: string) {
	if (!email) {
		formData.value.email.error = 'Please enter your email.'
		return false
	}

	if (!/\S+@\S+\.\S+/.test(email)) {
		formData.value.email.error = 'Please enter a valid email.'
		return false
	}

	return true
}

function validatePassword(password: string) {
	if (!password) {
		formData.value.password.error = 'Please enter a password.'
		return false
	}

	if (password.length < 6) {
		formData.value.password.error = 'Please use atleast 6 characters.'
		return false
	}

	return true
}

function validateConfirmPassword(password: string, confirmPassword: string) {
	if (!confirmPassword) {
		formData.value.confirmPassword.error = 'Please enter a password again.'
		return false
	}

	if (confirmPassword.length < 6) {
		formData.value.confirmPassword.error = 'Please use atleast 6 characters.'
		return false
	}

	if (password !== confirmPassword) {
		formData.value.confirmPassword.error = 'Please make sure your passwords match.'
		return false
	}

	return true
}

async function handleLogin() {
	const email = formData.value.email.data
	const password = formData.value.password.data

	const validEmail = validateEmail(email)
	const validPassword = validatePassword(password)

	if (validEmail && validPassword) {
		await authStore.signIn({ email, password })
	}
}

async function handleRegister() {
	const email = formData.value.email.data
	const password = formData.value.password.data
	const confirmPassword = formData.value.confirmPassword.data

	const validEmail = validateEmail(email)
	const validPassword = validatePassword(password)
	const validConfirmPassword = validateConfirmPassword(password, confirmPassword)

	if (validEmail && validPassword && validConfirmPassword) {
		formData.value.email.error = ''
		formData.value.password.error = ''
		formData.value.confirmPassword.error = ''
		await authStore.signUp({ email, password })
	}
}

async function onSubmit() {
	isLoading.value = true

	if (isLogin.value) {
		await handleLogin()
	} else {
		await handleRegister()
	}
	isLoading.value = false
}

function onChange(errorKey: keyof IAuthFormData) {
	if (errorKey === 'password' || errorKey === 'confirmPassword') {
		formData.value.password.error = ''
		formData.value.confirmPassword.error = ''
	}
	if (formData.value[errorKey].error) {
		formData.value[errorKey].error = ''
	}
}
</script>

<template>
  <div class="w-full lg:mx-auto lg:max-w-md">
    <div class="mb-6 rounded-xl bg-gradient-to-t from-gray-0 to-black px-6 pb-8 pt-12 lg:px-8 lg:py-10">
      <form
        class="flex flex-col"
        novalidate
        @submit.prevent="onSubmit"
      >
        <TransitionGroup name="list">
          <JInput
            key="email"
            v-model="formData.email.data"
            class="mb-5"

            type="email"
            prefix="email"
            label="E-Mail"
            placeholder="E-Mail"
            :error-message="formData.email.error"
            @change="onChange('email')"
          />
          <JInput
            key="password"
            v-model="formData.password.data"
            :class="isLogin ? 'mb-12' : 'mb-5'"
            type="password"
            prefix="password"
            label="Password"
            placeholder="Password"
            :error-message="formData.password.error"
            @change="onChange('password')"
          />
          <JInput
            v-if="!isLogin"
            key="password"
            v-model="formData.confirmPassword.data"
            class="mb-12"
            type="password"

            prefix="password"
            label="Confirm Password"
            placeholder="Password repeat"
            :error-message="formData.confirmPassword.error"
            @change="onChange('confirmPassword')"
          />

          <JButton
            key="button"
            variant="secondary"
            type="submit"
            :loading="isLoading"
          >
            {{ isLogin ? 'Log Into Your Account' : 'Create Account' }}
          </JButton>
        </TransitionGroup>
      </form>
    </div>
    <div class="text-center">
      <p
        v-if="isLogin"
        class="text-tertiary"
      >
        Don't have an account?
        <NuxtLink
          to="/register"
          class="text-white"
        >
          Sign up
        </NuxtLink>
      </p>
      <p
        v-else
        class="text-tertiary"
      >
        Have an account?
        <NuxtLink
          to="/login"
          class="text-white"
        >
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<style>
.list-move {
  transition: all 0.333s ease;
}
</style>
