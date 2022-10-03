<template>
  <div class="mainContainer">
    <div class="mainWorkspace">
      <v-form
        class="mainForm"
        ref="form"
        lazy-validation>
        <v-card
          flat
          :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-3 mt-0'">
          <v-row class="no-gutters">
            <!-- Content column -->
            <v-col cols="12" class="pa-0">
              <!-- Title -->
              <v-row class="no-gutters">
                <v-col>
                  <h3 class="primary--text text--darken-1" >
                    Rejestracja
                  </h3>
                </v-col>
              </v-row>
              <v-row class="no-gutters mt-2">
                <v-col cols="12">
                  <v-text-field
                    :rules="[rules.required]"
                    @keydown="errorMessage.userName = ''"
                    ref="firstControl"
                    type="text"
                    label="Imię"
                    hide-details="auto"
                    validate-on-blur
                    v-model.lazy="input.firstName"/>
                </v-col>
              </v-row>
              <v-row class="no-gutters mt-2">
                <v-col cols="12">
                  <v-text-field
                    @keydown="errorMessage.userName = ''"
                    type="text"
                    label="Nazwisko"
                    hide-details="auto"
                    validate-on-blur
                    :rules="[rules.required]"
                    v-model.lazy="input.lastName"/>
                </v-col>
              </v-row>
              <v-row class="no-gutters mt-2">
                <v-col cols="12">
                  <v-text-field
                    :rules="[rules.required]"
                    :error-messages="errorMessage.userName"
                    @keydown="errorMessage.userName = ''"
                    type="text"
                    label="Użytkownik"
                    autocomplete="off"
                    hide-details="auto"
                    validate-on-blur
                    v-model.lazy="input.userName"/>
                </v-col>
              </v-row>
              <v-row class="no-gutters mt-2">
                <v-col cols="12">
                  <v-text-field
                    :append-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :rules="[rules.required, rules.password]"
                    :error-messages="errorMessage.password"
                    @click:append="isPasswordVisible = !isPasswordVisible"
                    @keydown="errorMessage.password = ''"
                    label="Hasło"
                    autocomplete="new-password"
                    class="mt-2"
                    hide-details="auto"
                    validate-on-blur
                    v-model.lazy="input.password"/>
                </v-col>
              </v-row>
              <v-row class="no-gutters mt-2">
                <v-col cols="12">
                  <v-text-field
                    :append-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :rules="[rules.required, rules.password]"
                    :error-messages="errorMessage.passwordConfirm"
                    @blur="verifyPasswordsMatch"
                    @click:append="isPasswordVisible = !isPasswordVisible"
                    @keydown="errorMessage.passwordConfirm = ''"
                    label="Powtórz hasło"
                    autocomplete="new-password"
                    class="mt-2"
                    hide-details="auto"
                    validate-on-blur
                    v-model.lazy="input.passwordConfirm"/>
                </v-col>
              </v-row>
              <v-row class="no-gutters mt-2">
                <v-col cols="12">
                  <v-select
                  :items="userTypeItems"
                  v-model="input.isAccountManager"
                  item-value="id"
                  hide-details="auto"
                  label="Typ użytkownika"/>
                </v-col>
              </v-row>
              <v-row class="no-gutters mt-2">
                <v-col cols="12">
                  <v-text-field
                    :append-icon="isAdminPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="isAdminPasswordVisible ? 'text' : 'password'"
                    :error-messages="errorMessage.adminPassword"
                    @blur="verifyAdminPassword"
                    @click:append="isAdminPasswordVisible = !isAdminPasswordVisible"
                    @keydown="errorMessage.adminPassword = ''"
                    label="Hasło administratora"
                    autocomplete="new-password"
                    class="mt-2"
                    hide-details="auto"
                    validate-on-blur
                    v-model.lazy="input.adminPassword"/>
                </v-col>
              </v-row>
              <v-row class="no-gutters mt-8" justify="end">
                <v-col cols="12" md="6">
                  <v-btn
                    id="submit"
                    depressed
                    block
                    color="primary"
                    class="save-btn"
                    @click="login">
                    Dodaj
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-form>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'; // debounce - opoznienie
import userType from '@/enums/userType';
import usersService from '@/services/users';

export default {
  name: 'RegisterView',
  computed: {
    size() {
      const size = { xs: 'small' }[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {};
    },
    userNameDot() {
      return this.input.firstName === '' || this.input.lastName === '' ? '' : '.';
    },
  },
  data: () => ({
    isPasswordVisible: false,
    isAdminPasswordVisible: false,
    userTypeItems: userType.items,
    input: {
      firstName: '',
      lastName: '',
      userName: null,
      userNameAuto: null,
      password: null,
      passwordConfirm: null,
      isAccountManager: userType.mechanic,
      adminPassword: null,
    },
    errorMessage: {
      userName: '',
      password: '',
      passwordConfirm: '',
      adminPassword: '',
    },
    rules: {
      required: (value) => !!value || 'Pole wymagane',
      password:
        // eslint-disable-next-line
        (v) => !v || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(v) || 'Hasło musi mieć minimum 8 znaków, wielką literę, cyfrę, oraz znak specjalny',
    },
  }),
  mounted() {
    // focus on first control
    this.$refs.firstControl.focus();
  },
  methods: {
    async login() {
      // validate input
      if (this.$refs.form.validate() === false
      || this.verifyAdminPassword() === false
      || this.verifyPasswordsMatch() === false
      || await this.verifyUserName() === false) return;

      // set loading icon
      this.$emit('isProcessing', true);

      // request login
      await usersService.create({
        firstName: this.input.firstName,
        lastName: this.input.lastName,
        userName: this.input.userName,
        password: this.input.password,
        isAccountManager: Boolean(this.input.isAccountManager),
      })
      .then((response) => {
        this.$emit('isProcessing', false);

        console.log(response.data);

        if (response.data.result) {
          this.$emit('showMessage', 'Rejestracja', `Użytkownik ${this.input.userName} został dodany`);
        }
        else {
          this.$emit('showMessage', 'Rejestracja', 'Operacja zakończona niepowodzem');
        }
      })
      .catch((error) => {
        this.processError(error);
      });
    },
    async verifyUserName() {
      // check users
      const response = await usersService.isUniqueUserName({ userName: this.input.userName })
        .catch((error) => {
          console.log(error);
          return false;
        });

      if (response.data === undefined) {
        return false;
      }

      this.errorMessage.userName = response.data.result === true ? '' : 'Nazwa użytkownika jest zajęta';

      return response.data.result;
    },
    verifyPasswordsMatch() {
      if (!this.input.password || !this.input.passwordConfirm) {
        this.errorMessage.passwordConfirm = '';
        return true;
      }

      if (this.input.password === this.input.passwordConfirm) {
        this.errorMessage.passwordConfirm = '';
        return true;
      }

      this.errorMessage.passwordConfirm = 'Hasła muszą się zgadzać';
      return false;
    },
    verifyAdminPassword() {
      if (this.input.adminPassword !== process.env.VUE_APP_ADMIN_PASSWORD) {
        this.errorMessage.adminPassword = 'Nieprawidłowe hasło';
        return false;
      }

      this.errorMessage.adminPassword = '';
      return true;
    },
    processError(error) {
      console.log(error);
      this.$emit('isProcessing', false);

      if (error.response === undefined) {
        this.$emit('showMessage', 'Rejestracja', 'Brak odpowiedzi z serwera');
        return;
      }

      console.log(error.response.data);
      this.$emit('showMessage', 'Rejestracja', error.response.data.message);
    },
    removePolishChars(text) {
      return text
        .replace(/ą/g, 'a')
        .replace(/Ą/g, 'A')
        .replace(/ć/g, 'c')
        .replace(/Ć/g, 'C')
        .replace(/ę/g, 'e')
        .replace(/Ę/g, 'E')
        .replace(/ł/g, 'l')
        .replace(/Ł/g, 'L')
        .replace(/ń/g, 'n')
        .replace(/Ń/g, 'N')
        .replace(/ó/g, 'o')
        .replace(/Ó/g, 'O')
        .replace(/ś/g, 's')
        .replace(/Ś/g, 'S')
        .replace(/ż/g, 'z')
        .replace(/Ż/g, 'Z')
        .replace(/ź/g, 'z')
        .replace(/Ź/g, 'Z')
        .toLowerCase();
    },
  },
  watch: {
    'input.firstName': function firstName(val) {
      if (this.input.userName === this.input.userNameAuto) {
        this.input.userName = this.removePolishChars(`${val}${this.userNameDot}${this.input.lastName}`);
        this.input.userNameAuto = this.input.userName;
      }
    },
    'input.lastName': function lastName(val) {
      if (this.input.userName === this.input.userNameAuto) {
        this.input.userName = this.removePolishChars(`${this.input.firstName}${this.userNameDot}${val}`);
        this.input.userNameAuto = this.input.userName;
      }
    },
    'input.userName': debounce(async function userName(val) {
      // check if input changed by user
      if (val !== this.input.userNameAuto) {
        this.input.userNameAuto = ''; // reset auto, updating first or last name will not change username anymore
      }

      // verify if unique username
      await this.verifyUserName();
    }, 1000, { maxWait: 5000 }),
  },
};
</script>

<style lang="scss" scoped>
  // @import url('https://fonts.googleapis.com/css?family=Montserrat:330,400,600,800');

  $font-family: 'Montserrat';

  .mainContainer {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;

    @media (min-width: 768px) {
      padding: 20px;
    }

    .logo {
      @media (max-width: 500px) {
        width: auto;
        height: 25px;
      }
    }
  }

  .mainWorkspace {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75%;
  }

  .mainForm {
    display: flex;
    flex-direction: column;
    width: 400px;
    text-align: center;
  }

  [class*='text-h']{
    font-family: $font-family, sans-serif !important;
    font-weight: 600;
  }

</style>
