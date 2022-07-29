<template>
  <span class="sidebar-logo" @click="click()">
    <svg
      class="sidebar-logo__icon"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.95431 0 0 8.9543 0 20C0 31.0457 8.95431 40 20 40Z"
        fill="#FEFEFE"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M38.6679 24.3038C38.1662 26.3999 37.3543 28.382 36.2446 30.1246L31.8945 21.6354L38.6679 24.3038Z"
        fill="#C32B23"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.2812 0.896606C21.4595 0.907472 21.6396 0.919995 21.822 0.934543L21.8694 2.04594L21.2812 0.896606Z"
        fill="#E84145"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.1112 12.5216L6.78823 14.1092L5.88672 11.2691L14.9356 1.52469C16.3179 1.14237 17.6945 0.924513 19.075 0.868896L13.1112 12.5216Z"
        fill="#E84145"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.91016 8.20244C7.57155 4.83896 11.1199 2.54876 14.9383 1.52612L5.88817 11.2709L4.91016 8.20244Z"
        fill="#A52621"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.25393 23.9158L4.43153 21.5796L3.37092 20.9446L8.18672 18.5123L7.28355 15.6666L0.852212 19.7384C0.840045 21.3662 0.9997 22.6803 1.25393 23.9158Z"
        fill="#E94D51"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.67896 20.069L9.36035 19.8497L12.1231 14.4514L7.66406 17.1521L8.67896 20.069Z"
        fill="#E94A45"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.1194 14.4576L7.74067 17.1137L7.28125 15.6664L12.1581 12.7274L13.1256 12.4913L12.1194 14.4576Z"
        fill="#932B1F"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.1585 12.7274L7.28162 15.6664L6.55469 13.376L12.1585 12.7274Z"
        fill="#E63C28"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.44992 23.5875L5.64062 22.4314L7.96999 22.5714L7.44992 23.5875Z"
        fill="#E94A45"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.89799 20.7555L8.72266 20.2031L9.24071 20.0859L8.89799 20.7555Z"
        fill="#A92C21"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M36.6468 25.753L21.8205 0.934466L21.2812 0.899292L34.0182 25.7858L36.6468 25.753L36.6814 25.3591L36.6468 25.753Z"
        fill="#E63B26"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.8203 0.934814L30.4413 15.3659L37.6865 12.6138C35.0253 6.33436 29.0919 1.62707 21.8203 0.934814Z"
        fill="#E94D51"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M30.4414 15.3667L36.6467 25.7542L37.6867 12.6146L30.4414 15.3667Z"
        fill="#E94A45"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M34.5345 22.2213L34.1094 23.0898L36.6451 25.7546L36.9808 21.5131L34.5345 22.2213Z"
        fill="#A92C21"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M30.4414 15.3667L31.9185 17.8389L37.3714 16.5987L37.6867 12.6146L30.4414 15.3667Z"
        fill="#BD2922"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M36.6481 25.7531L36.7586 24.3592L38.7784 23.868L35.325 28.3365L34.0195 25.7859L36.6481 25.7531Z"
        fill="#E74036"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.9688 8.10254L25.7462 7.50439L27.0179 9.63291L26.1466 10.4036L24.9688 8.10254Z"
        fill="#E53524"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M37.6872 12.6146L36.8867 22.7299L38.9698 22.6697C39.4344 19.0445 38.9877 15.7787 37.6872 12.6146Z"
        fill="#E94A45"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.35903 15.6212L0.851562 19.7388C0.923462 15.2715 2.4269 11.3319 4.90928 8.20142L7.35903 15.6212Z"
        fill="#A52621"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.25391 23.9161C1.51348 25.1661 1.85455 26.2041 2.34623 27.4166L5.99209 26.4344L7.49609 23.4956L4.4315 21.5798L1.25391 23.9161Z"
        fill="#CA2E23"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.04688 26.6545C2.16947 26.995 2.24506 27.1582 2.34719 27.417L5.99305 26.4348L7.14235 24.189L6.93014 24.1172L2.04688 26.6545Z"
        fill="#EA524D"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.8203 0.934814L25.7447 7.50414L30.4033 3.92022C27.9104 2.30256 24.9876 1.24181 21.8203 0.934814Z"
        fill="#E73B34"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.95968 30.4085C3.35351 29.4785 2.81795 28.4808 2.34766 27.4171L5.99351 26.4349L3.95968 30.4085Z"
        fill="#E53524"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M36.7578 24.3599L36.8869 22.7295L38.9699 22.6693C38.9034 23.2271 38.7959 23.7477 38.6681 24.3048L36.7578 24.3599Z"
        fill="#C32B23"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.63609 22.4318L3.36719 20.9453L8.18301 18.5129L8.89482 20.756L7.96547 22.5718L5.63609 22.4318Z"
        fill="#CA2E23"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.26463 20.0659L2.12474 20.2893L0.851562 19.739L3.05686 18.3429L3.26463 20.0659Z"
        fill="#CA2E23"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.4901 14.5853L16.4844 19.3767L20.1655 11.8608L21.4901 14.5853Z"
        fill="#E84145"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.4297 23.7176L22.5351 19.649L23.7012 19.1282L25.9329 23.7176H22.4297Z"
        fill="#CC2D23"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.4854 19.3771L21.4911 14.5857L22.4661 16.5912L22.7067 23.7178H14.3594L16.4854 19.3771Z"
        fill="#A92F21"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.6442 21.4394L18.2734 22.9755L22.6078 20.7983L22.6442 21.4394Z"
        fill="#E94D51"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.5716 19.6366L23.7029 19.1292L22.4688 16.5909L22.5716 19.6366Z"
        fill="#E94D51"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.72209 20.2032L8.67969 20.0696L9.36108 19.8507L9.24014 20.0863L8.72209 20.2032Z"
        fill="#E42925"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.8125 22.4419L7.51006 23.4736L7.14559 24.1855L6.93154 24.1172L5.8125 22.4419Z"
        fill="#A92C21"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.95231 30.4259C3.34614 29.4957 2.79012 28.4671 2.34766 27.4171L5.99351 26.4349L3.95231 30.4259Z"
        fill="#CB2F23"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.43767 9.84847L5.03042 8.56506L3.93866 10.0846L5.22012 9.16303L3.50781 11.3613L5.43767 9.84847Z"
        fill="#E84145"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M31.2812 16.7713L32.4414 18.7131L37.2244 18.4641L37.4871 15.1433L36.9624 16.4669L35.9632 15.7521L31.2812 16.7713Z"
        fill="#E63B26"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M32.4414 18.7135L34.5368 22.2214L32.4742 20.1597L32.4414 18.7135Z"
        fill="#932B1F"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M36.6466 25.7534L21.8203 0.934814L22.2775 2.82999L22.276 2.84344L24.9708 8.1091L25.4583 7.72457L36.6812 25.3594L36.6466 25.7534Z"
        fill="#C32B23"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.098 39.135L13.2891 30.0312H22.2817L22.0317 39.0479L19.098 39.135Z"
        fill="#BC2F22"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M31.5373 35.2588C28.8851 37.2744 25.6624 38.6169 22.0312 39.0479L22.2648 30.0312H28.9436L31.5373 35.2588Z"
        fill="#CC2D23"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.0931 39.1285C15.1913 38.8849 11.6159 37.6066 8.67188 35.4174L11.2973 30.0312H13.3432L19.0931 39.1285Z"
        fill="#E52C33"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.0314 39.0479C20.996 39.1495 20.089 39.1666 19.0977 39.135L20.6734 30.7754L21.8192 30.0312H22.6797L22.0314 39.0479Z"
        fill="#A22B21"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.5352 31.5183L13.9147 31.0773L17.1141 31.6541L13.5352 31.5183Z"
        fill="#EA5452"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.8792 39.1108L19.0974 39.1342L15.6016 35.1149L16.7625 33.3142L19.8792 39.1108Z"
        fill="#A22B21"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.0039 31.4204L29.5974 31.3489L28.9627 30.0694L28.7977 30.0312H26.2745L26.0039 31.4204Z"
        fill="#A22B21"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M37.2243 18.4635L36.9336 22.1388L37.7593 21.2487L37.2243 18.4635Z"
        fill="#E63B26"
      />
    </svg>
  </span>
</template>

<script>
export default {
  name: "SidebarLogo",
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="sass" scoped>
.sidebar-logo
  display: flex
  align-items: center
  justify-content: center
  &__icon
    width: 100%
    height: 100%
</style>
