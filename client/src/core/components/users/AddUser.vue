<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form @submit.prevent="addNewUser">
          <b-form-group
            id="usernameLabel"
            :label="$t('users.username')"
            label-for="username"
          >
            <b-form-input
              id="username"
              v-model="$v.form.name.$model"
              :state="$v.form.name.$dirty ? !$v.form.name.$error : null"
              aria-describedby="username-error"
              type="text"
              required
              :placeholder="$t('users.username')"
            ></b-form-input>
            <b-form-invalid-feedback id="username-error">
              {{
                !$v.form.name.required
                  ? $t("users.errors.username.required")
                  : $t("users.errors.username.minLength", {
                      chars: $v.form.name.$params.minLength.min
                    })
              }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            id="emailLabel"
            :label="$t('users.email')"
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="$v.form.email.$model"
              :state="$v.form.email.$dirty ? !$v.form.email.$error : null"
              aria-describedby="email-error"
              type="text"
              required
              :placeholder="$t('users.email')"
            ></b-form-input>

            <b-form-invalid-feedback id="email-error">
              {{
                !$v.form.email.required
                  ? $t("users.errors.email.required")
                  : $t("users.errors.email.isEmail")
              }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            id="passwordLabel"
            :label="$t('users.password')"
            label-for="password"
          >
            <b-form-input
              id="password"
              v-model="$v.form.password.$model"
              :state="$v.form.password.$dirty ? !$v.form.password.$error : null"
              aria-describedby="password-error"
              type="text"
              required
              :placeholder="$t('users.password')"
            ></b-form-input>
            <b-form-invalid-feedback id="password-error">
              {{
                !$v.form.password.required
                  ? $t("users.errors.password.required")
                  : $t("users.errors.password.minLength", {
                      chars: $v.form.password.$params.minLength.min
                    })
              }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            id="roleIdLabel"
            :label="$t('users.roles')"
            label-for="roleId"
          >
            <b-form-select
              v-model="$v.form.roleId.$model"
              :state="$v.form.roleId.$dirty ? !$v.form.roleId.$error : null"
              aria-describedby="roleId-error"
            >
              <option :value="null" disabled selected>
                {{ $t("general.select_option") }}
              </option>
              <option
                v-for="role in roles"
                v-bind:key="role.id"
                :value="role.id"
              >
                {{ role.name }}
              </option>
            </b-form-select>
            <b-form-invalid-feedback id="roleId-error">
              {{ $t("users.errors.roleId.required") }}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            id="isActiveLabel"
            :label="$t('users.status')"
            label-for="isActive"
          >
            <b-form-select
              v-model="$v.form.isActive.$model"
              :state="$v.form.isActive.$dirty ? !$v.form.isActive.$error : null"
            >
              aria-describedby="isActive-error"
              <option :value="null" disabled selected>
                {{ $t("general.select_option") }}
              </option>
              <option :value="1">
                {{ $t("users.active") }}
              </option>
              <option :value="0">
                {{ $t("users.not_active") }}
              </option>
            </b-form-select>
            <b-form-invalid-feedback id="isActive-error">
              {{ $t("users.errors.isActive.required") }}
            </b-form-invalid-feedback>
          </b-form-group>
          <div class="modal-footer">
            <button class="btn btn-primary" :disabled="$v.$invalid">
              {{ $t("buttons.submit") }}
            </button>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import UserService from "@/core/services/UserService";
import {
  between,
  email,
  minLength,
  numeric,
  required
} from "vuelidate/lib/validators";
import NotifyService from "@/core/services/NotifyService";

@Component({
  components: {},
  props: [],
  validations: {
    form: {
      name: { required, minLength: minLength(3) },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      roleId: { required },
      isActive: { required }
    }
  }
})
export default class AddUser extends Vue {
  userService: UserService;
  roles: any[] = [];
  form = {
    name: "",
    email: "",
    password: "",
    roleId: 1,
    isActive: 1
  };

  constructor() {
    super();
    this.userService = new UserService();
  }

  /**
   * Created lifecycle hook
   * */
  created() {
    this.getAllRoles();
  }

  /**
   * Add a new user operation
   * including frontend validation process
   * */
  addNewUser() {
    this.userService.addUpdateUser(this.form).then(res => {
      if (res.success) {
        NotifyService.success(this.$tc("users.success"));
        this.$store.dispatch("setUserSaved", true);
      } else {
        if (res.errorType !== null) {
          if (res.errorValidationKey === 'not_unique') {
            NotifyService.alert(this.$tc("users.errors.duplicate_" + res.errorField))
          }
        } else {
          NotifyService.alert(this.$tc("users.error"));
        }
        this.$store.dispatch("setUserSaved", false);
      }
    });
  }

  /**
   * Get all roles from database
   * For select dropdown menu
   */
  getAllRoles() {
    const me = this;
    this.userService.getRoles().then(res => {
      if (res.success) {
        me.roles = res.data;
      }
    });
  }
}
</script>

<style scoped lang="scss"></style>
