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
          <v-main>
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

export default {
  name: 'App',
  components: {
    LoadingIcon,
    MessageDialog,
    QuestionDialog,
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
