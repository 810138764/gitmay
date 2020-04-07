import Vue from 'vue'
import App from './App.vue'

import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'



const httpLink = new HttpLink({
  uri: 'http://localhost:3012/graphql',
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})


Vue.use(VueApollo)
Vue.config.productionTip = false

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  render: h => h(App),
  provide: apolloProvider.provide()
}).$mount('#app')
