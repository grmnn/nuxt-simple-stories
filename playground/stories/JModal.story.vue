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
    <JButton
      variant="primary"
      @click="defaultModalOpen = true"
    >
      Deactivate Account
    </JButton>
    <JModal
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
        <JButton
          variant="secondary"
          @click="defaultModalOpen = false"
        >
          Cancel
        </JButton>
        <JButton
          variant="error"
          @click="onConfirmDefaultModal"
        >
          Deactivate
        </JButton>
      </template>
    </JModal>
  </Variant>

  <Variant title="Full Height">
    <JButton
      variant="primary"
      @click="fullHeightModalOpen = true"
    >
      Confirm
    </JButton>
    <JModal
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
        <JButton
          variant="primary"
          @click="onConfirmfullHeightModalOpen"
        >
          Confirm
        </JButton>
      </template>
    </JModal>
  </Variant>

  <Variant title="Unstyled - Default">
    <JButton
      variant="primary"
      @click="defaultBareModalOpen = true"
    >
      Deactivate Account
    </JButton>
    <JModal v-model="defaultBareModalOpen">
      <h1>Bare Minimum</h1>
    </JModal>
  </Variant>

  <Variant title="Unstyled - Full Height">
    <JButton
      variant="primary"
      @click="defaultFullBareModalOpen = true"
    >
      Unstyled Full Height
    </JButton>
    <JModal
      v-model="defaultFullBareModalOpen"
      :full-height="true"
    >
      <h1>Unstyled Full Height</h1>
    </JModal>
  </Variant>
</template>
