import { createApp, computed } from 'vue'
import { createPinia,storeToRefs } from 'pinia'

import { firebaseApp } from '@/plugins/firebase'

import { VueFire, VueFireAuth, getCurrentUser, useIsCurrentUserLoaded } from 'vuefire'
import { globalFirestoreOptions, firestoreDefaultConverter } from 'vuefire'

//plugins for form fields
import { plugin, defaultConfig } from '@formkit/vue'
import { createProPlugin, inputs } from '@formkit/pro'
import config from '../formkit.config.js'

// import '@formkit/themes/genesis'
// import '@formkit/pro/genesis'
import './assets/main.css'

import App from './App.vue'
import router from './router'


import dayjs from '@/plugins/day'
// import ResizeTextarea from 'resize-textarea-vue3'
import ResizeTextarea from '@/plugins/resize-text-area'


globalFirestoreOptions.converter = {
    // the default converter just returns the data: (data) => data
    toFirestore: firestoreDefaultConverter.toFirestore,
    fromFirestore: (snapshot, options) => {
        const data = firestoreDefaultConverter.fromFirestore(snapshot, options)
        // if the document doesn't exist, return null
        if (!data) { return null}
        else{
            data.docId = snapshot.id
            // data.metadata = snapshot.metadata
            return data
        }
        // add anything custom to the returned object

    },
}

const pinia = createPinia()

const app = createApp(App)


const pro = createProPlugin('fk-xXXXXXXX', inputs)
// app.use(plugin, defaultConfig({ config: {classes: generateClasses(config.classes)}, icons: config.icons, plugins: [pro] }))
app.use(plugin, defaultConfig({ config: config, plugins: [pro] }))
// app.use(plugin, defaultConfig({ plugins: [pro] }))

app.provide("dayjs",dayjs);
app.use(ResizeTextarea);
// app.use(plugin, defaultConfig)

app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
        // we will see other modules later on
        VueFireAuth(),
    ],
})

// check permissions before app get's launched, have to do it this way
router.beforeEach(async (to, from) => {
    const currentUser = await getCurrentUser();
    // const isCurrentUser = await useIsCurrentUserLoaded()
    process.env.NODE_ENV === "development" ? console.log( 'current user in NAv guard:', from, to.name, currentUser ) : null;

    if(to.name == 'login' && currentUser){
        return {name: 'discover'}
    }
    else{
        // routes with `meta: { requiresAuth: true }` will check for the users, others won't
        if (to.meta.requiresAuth) {
          // if the user is not logged in, redirect to the login page
          if (!currentUser) {
            return {
              path: '/login',
              query: {
                // we keep the current path in the query so we can redirect to it after login
                // with `router.push(route.query.redirect || '/')`
                redirect: to.fullPath,
              },
            }
          }
        }
    }

  })

app.use(router);
// app.use(VueAxios, axios)

app.use(pinia)


app.mount('#app')
