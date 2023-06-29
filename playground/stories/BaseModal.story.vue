<script setup lang="ts">
const defaultModalOpen = ref(false)
const fullHeightModalOpen = ref(false)
const defaultBareModalOpen = ref(false)
const defaultFullBareModalOpen = ref(false)

function onConfirmDefaultModal() {
	defaultModalOpen.value = false
}
function onConfirmfullHeightModalOpen() {
	fullHeightModalOpen.value = false
}
</script>

<template>
  <Variant title="Default">
    <BaseButton
      variant="primary"
      @click="defaultModalOpen = true"
    >
      Deactivate Account
    </BaseButton>
    <BaseModal
      v-model="defaultModalOpen"
      title="Deactivate your account"
    >
      <template #default>
        <main class="flex-1">
          <p>
            Are you sure you want to deactivate your account? All of your data will be permanently removed.
            <span class="font-semibold">This action cannot be undone.</span>
          </p>
        </main>
      </template>

      <template #footer>
        <BaseButton
          variant="secondary"
          @click="defaultModalOpen = false"
        >
          Cancel
        </BaseButton>
        <BaseButton
          variant="error"
          @click="onConfirmDefaultModal"
        >
          Deactivate
        </BaseButton>
      </template>
    </BaseModal>
  </Variant>

  <Variant title="Full Height">
    <BaseButton
      variant="primary"
      @click="fullHeightModalOpen = true"
    >
      Confirm
    </BaseButton>
    <BaseModal
      v-model="fullHeightModalOpen"
      :full-height="true"
    >
      <template #header>
        <h1 class="text-lg font-semibold lg:text-xl">
          Deactivate your account
        </h1>
      </template>

      <template #default>
        <p class="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, asperiores veritatis unde culpa eius dolor excepturi dicta dolore. Placeat tempora eaque veritatis? Voluptates sapiente
          harum nisi possimus aut repellendus libero? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam perspiciatis dolorem dolore id esse! Cum, autem, reprehenderit qui saepe inventore
          incidunt earum eius, fugit fugiat voluptatibus doloremque voluptatem nostrum alias.
        </p>
        <p class="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, asperiores veritatis unde culpa eius dolor excepturi dicta dolore. Placeat tempora eaque veritatis? Voluptates sapiente
          harum nisi possimus aut repellendus libero? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam perspiciatis dolorem dolore id esse! Cum, autem, reprehenderit qui saepe inventore
          incidunt earum eius, fugit fugiat voluptatibus doloremque voluptatem nostrum alias.
        </p>
        <p class="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam perspiciatis dolorem dolore id esse! Cum, autem, reprehenderit qui saepe inventore incidunt earum eius, fugit fugiat
          voluptatibus doloremque voluptatem nostrum alias.
        </p>
        <p class="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam perspiciatis dolorem dolore id esse! Cum, autem, reprehenderit qui saepe inventore incidunt earum eius, fugit fugiat
          voluptatibus doloremque voluptatem nostrum alias.
        </p>
        <p class="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam perspiciatis dolorem dolore id esse! Cum, autem, reprehenderit qui saepe inventore incidunt earum eius, fugit fugiat
          voluptatibus doloremque voluptatem nostrum alias.
        </p>
        <p class="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam perspiciatis dolorem dolore id esse! Cum, autem, reprehenderit qui saepe inventore incidunt earum eius, fugit fugiat
          voluptatibus doloremque voluptatem nostrum alias.
        </p>
        <p class="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, asperiores veritatis unde culpa eius dolor excepturi dicta dolore. Placeat tempora eaque veritatis? Voluptates sapiente
          harum nisi possimus aut repellendus libero? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam perspiciatis dolorem dolore id esse! Cum, autem, reprehenderit qui saepe inventore
          incidunt earum eius, fugit fugiat voluptatibus doloremque voluptatem nostrum alias.
        </p>
        <p class="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, asperiores veritatis unde culpa eius dolor excepturi dicta dolore. Placeat tempora eaque veritatis? Voluptates sapiente
          harum nisi possimus aut repellendus libero? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam perspiciatis dolorem dolore id esse! Cum, autem, reprehenderit qui saepe inventore
          incidunt earum eius, fugit fugiat voluptatibus doloremque voluptatem nostrum alias.
        </p>
        <p class="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam perspiciatis dolorem dolore id esse! Cum, autem, reprehenderit qui saepe inventore incidunt earum eius, fugit fugiat
          voluptatibus doloremque voluptatem nostrum alias.
        </p>
        <p class="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam perspiciatis dolorem dolore id esse! Cum, autem, reprehenderit qui saepe inventore incidunt earum eius, fugit fugiat
          voluptatibus doloremque voluptatem nostrum alias.
        </p>
        <p class="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam perspiciatis dolorem dolore id esse! Cum, autem, reprehenderit qui saepe inventore incidunt earum eius, fugit fugiat
          voluptatibus doloremque voluptatem nostrum alias.
        </p>
        <p class="mb-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam perspiciatis dolorem dolore id esse! Cum, autem, reprehenderit qui saepe inventore incidunt earum eius, fugit fugiat
          voluptatibus doloremque voluptatem nostrum alias.
        </p>
      </template>

      <template #footer>
        <BaseButton
          variant="primary"
          @click="onConfirmfullHeightModalOpen"
        >
          Confirm
        </BaseButton>
      </template>
    </BaseModal>
  </Variant>

  <Variant title="Unstyled - Default">
    <BaseButton
      variant="primary"
      @click="defaultBareModalOpen = true"
    >
      Deactivate Account
    </BaseButton>
    <BaseModal v-model="defaultBareModalOpen">
      <h1>Bare Minimum</h1>
    </BaseModal>
  </Variant>

  <Variant title="Unstyled - Full Height">
    <BaseButton
      variant="primary"
      @click="defaultFullBareModalOpen = true"
    >
      Unstyled Full Height
    </BaseButton>
    <BaseModal
      v-model="defaultFullBareModalOpen"
      :full-height="true"
    >
      <h1>Unstyled Full Height</h1>
    </BaseModal>
  </Variant>
</template>
