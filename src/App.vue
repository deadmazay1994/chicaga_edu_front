<template>
  <v-app>
    <v-app-bar app color="primary" dark />
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" lg="7" style="background-color: #eee;">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
