<template>

      <RouterView />

</template>


<script setup>
  import {watchEffect, reactive, computed, onMounted} from 'vue'
  import { RouterView} from 'vue-router' 
  import { useUserStore } from '@/stores/user.js'
  import { doc } from "firebase/firestore";
  import { useFirestore, useDocument, getCurrentUser, useCurrentUser, useIsCurrentUserLoaded } from 'vuefire'

  const db = useFirestore()
  const userStore = useUserStore()
  const user = reactive({})

  onMounted(async () => {
    const currentUser = await getCurrentUser()
    if(currentUser){
      process.env.NODE_ENV === "development" ? console.log( 'user from App.vue', currentUser, user ) : null;
      const {pending} = useDocument(doc(db, 'users', currentUser.uid), {target: user})
    }
  })


  watchEffect(() => {
    if(user.value){
      // process.env.NODE_ENV === "development" ? console.log( 'user from App.vue', currentUser, user ) : null;
      userStore.updateUserData(user.value)
      
    }
  })

  
</script>



<style>
#app{
  max-width:100%!important;
  padding:0!important;
}

.m100v{
  min-height: 100vh;
}

</style>
