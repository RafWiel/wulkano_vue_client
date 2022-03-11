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
            <app-bar />
            <router-view
              @isProcessing="isProcessing = $event"
              @showMessage="showMessageDialog"
              @closeMessage="closeMessageDialog"
              @showQuestion="showQuestionDialog"
              @closeQuestion="closeQuestionDialog"/>
            <LoadingIcon v-if="isProcessing" />
          </v-main>
        </v-col>
      </v-row>
      <!-- Message box -->
      <v-row justify="center" class="no-gutters">
        <MessageDialog
          :title="messageDialog.title"
          :isVisible="messageDialog.isVisible"
          :message="messageDialog.message"
          :closeRequest="closeMessageDialog"/>
      </v-row>
      <!-- Delete message box -->
      <v-row justify="center" class="no-gutters">
        <QuestionDialog
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

export default {
  name: 'App',
  components: {
    LoadingIcon,
    MessageDialog,
    QuestionDialog,
    AppBar,
  },
  data: () => ({
    isProcessing: false,
    messageDialog: {
      title: '',
      message: '',
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
