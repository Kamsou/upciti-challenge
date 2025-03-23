<template>
  <header
    class="bg-white border-b border-t border-gray-200 p-4 flex justify-between items-center"
  >
    <slot name="left" />

    <slot name="center" />

    <slot name="right">
      <div
        class="flex justify-center items-center w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md"
      >
        <img
          src="@/assets/aya-nakamura.jpg"
          alt="User Avatar"
          class="w-full h-full object-cover"
        >
      </div>
    </slot>
  </header>
</template>
