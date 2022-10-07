<template>
  <v-app>
    <v-container
      fluid
      class="pa-0"
      style="height: 100%">
      <v-row
        class="no-gutters d-flex flex-column flex-nowrap"
        style="min-height:100vh">
        <v-col>
          <!-- Main workspace -->
          <v-main style="height: 100%">
            <app-bar @menuClicked="isNavigationBarOpen = !isNavigationBarOpen"/>
            <!-- <h5 class="px-2 py-1 yellow">NIP rules</h5>
            <h5 class="px-2 py-1 yellow">Tel rules</h5>
            <h5 class="px-2 py-1 yellow">Mode Development bez autoryzacji</h5>
            <h5 class="px-2 py-1 yellow">Zapisz błędy do loga</h5>
            <h5 class="px-2 py-1 yellow">Instrukcja instalacji</h5> -->
            <router-view
              @isProcessing="isProcessing = $event"
              @showMessage="showMessageDialog"
              @closeMessage="closeMessageDialog"
              @showQuestion="showQuestionDialog"
              @closeQuestion="closeQuestionDialog"/>
            <side-bar
              v-model="isNavigationBarOpen"
              :links="links"
              @isOpenChanged="setIsNavigationBarOpen"/>
            <loading-icon v-if="isProcessing" />
          </v-main>
        </v-col>
      </v-row>
      <!-- Message box -->
      <v-row justify="center" class="no-gutters">
        <message-dialog
          :title="messageDialog.title"
          :isVisible="messageDialog.isVisible"
          :message="messageDialog.message"
          :closeRequest="closeMessageDialog"/>
      </v-row>
      <!-- Delete message box -->
      <v-row justify="center" class="no-gutters">
        <question-dialog
          :title="questionDialog.title"
          :isVisible="questionDialog.isVisible"
          :itemId="questionDialog.id"
          :message="questionDialog.message"
          :closeRequest="closeQuestionDialog"
          @apply="runQuestionDialogCallback"/>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import LoadingIcon from '@/components/LoadingIcon.vue';
import MessageDialog from '@/components/MessageDialog.vue';
import QuestionDialog from '@/components/QuestionDialog.vue';
import AppBar from '@/components/AppBar.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'App',
  components: {
    LoadingIcon,
    MessageDialog,
    QuestionDialog,
    AppBar,
    SideBar,
  },
  data: () => ({
    isProcessing: false,
    isNavigationBarOpen: false,
    links: [
      { icon: 'mdi-format-list-numbered', text: 'Lista zleceń serwisowych', route: '/requests' },
      { icon: 'mdi-car-side', text: 'Nowe zlecenie osobowe', route: '/service/car' },
      { icon: 'mdi-truck', text: 'Nowe zlecenie ciężarowe', route: '/service/truck' },
      { icon: 'mdi-home-import-outline', text: 'Nowy depozyt', route: '/deposit' },
    ],
    messageDialog: {
      title: null,
      message: null,
      isVisible: false,
    },
    questionDialog: {
      id: 0,
      title: '',
      message: '',
      isVisible: false,
      callbackFunction: {
        type: Function,
        default: () => {},
      },
    },
  }),
  created() {
    console.log('created localStorage.userInfo:', localStorage.getItem('userInfo'));
    if (!localStorage.getItem('userInfo')) {
      if (this.$route.name !== 'Login' && this.$route.name !== 'Register') {
        this.$router.replace({ name: 'Login' });
      }
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // require login each day
    const loginTimestamp = new Date(parseInt(userInfo.timestamp, 10));
    if ((!loginTimestamp || loginTimestamp.getDate() !== new Date().getDate())
    && this.$route.name !== 'Login'
    && this.$route.name !== 'Register') {
      this.$router.replace({ name: 'Login' });
      return;
    }

    // set store user info
    this.$store.dispatch('setUserName', userInfo.userName);
    this.$store.dispatch('setToken', userInfo.token);
    this.$store.dispatch('setAccountManager', userInfo.isAccountManager);

    // console.log('store.user: ', this.$store.state.userName);
    // console.log('store.token: ', this.$store.state.token);
    // console.log('store.manager: ', this.$store.state.isAccountManager);
  },
  methods: {
    showMessageDialog(title, message) {
      this.messageDialog.title = title;
      this.messageDialog.message = message;
      this.messageDialog.isVisible = true;
    },
    closeMessageDialog() {
      this.messageDialog.isVisible = false;
    },
    showQuestionDialog(title, message, id, callbackFunction) {
      this.questionDialog.id = id;
      this.questionDialog.callbackFunction = callbackFunction;
      this.questionDialog.title = title;
      this.questionDialog.message = message;
      this.questionDialog.isVisible = true;
    },
    runQuestionDialogCallback(id) {
      this.questionDialog.callbackFunction(id);
    },
    closeQuestionDialog() {
      this.questionDialog.isVisible = false;
    },
    setIsNavigationBarOpen(value) {
      this.isNavigationBarOpen = value;
    },
  },
};
</script>

<style lang="scss">
  //@import url('https://fonts.googleapis.com/css?family=Montserrat:330,400,600,800');
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap');

  //$font-family: 'Montserrat';
  $font-family: 'Nunito';

  *, *::before, *::after {
    box-sizing: border-box;
  }

  // Vuetify buttons are uppercase by default, this allows normal text
  button {
    text-transform: unset !important;
  }

  #app {
    font-family: $font-family, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: #e8e8e8;

    @media (max-width: 960px) {
      background: white;
    }
  }

  .v-application {
    [class*='text-'] {
      font-family: $font-family, sans-serif !important;
    }

    font-family: $font-family, sans-serif !important;
  }

  .v-btn {
    @media (max-width: 960px) {
      min-height: 50px;
    }
  }

</style>
