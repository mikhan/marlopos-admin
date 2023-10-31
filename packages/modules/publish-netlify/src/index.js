import Build from './routes/build.vue'

export default {
  id: 'publish-netlify',
  name: 'Publish',
  icon: 'cloud_upload',
  routes: [
    {
      path: '',
      redirect: '/publish-netlify/build',
    },
    {
      path: 'build',
      component: Build,
    },
  ],
  preRegisterCheck: function (user) {
    return user.role.admin_access === true
  },
}
