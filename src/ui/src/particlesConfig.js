const particlesOptions = {
  autoPlay: true,
  background: {
    color: {
      value: "#000"
    },
    image: "",
    position: "",
    repeat: "",
    size: "",
    opacity: .2
  },
  backgroundMask: {
    composite: "destination-out",
    cover: {
      color: {
        value: "#fff"
      },
      opacity: .2
    },
    enable: false
  },
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  detectRetina: true,
  duration: 0,
  fpsLimit: 120,
  manualParticles: [],
  motion: {
    disable: false,
    reduce: {
      factor: 4,
      value: true
    }
  },
  particles: {
    bounce: {
      horizontal: {
        random: {
          enable: false,
          minimumValue: 0.1
        },
        value: 1
      },
      vertical: {
        random: {
          enable: false,
          minimumValue: 0.1
        },
        value: 1
      }
    },
    collisions: {
      bounce: {
        horizontal: {
          random: {
            enable: false,
            minimumValue: 0.1
          },
          value: 1
        },
        vertical: {
          random: {
            enable: false,
            minimumValue: 0.1
          },
          value: 1
        }
      },
      enable: true,
      mode: "bounce",
      overlap: {
        enable: true,
        retries: 0
      }
    },
    color: {
      value: "#ffffff",
      animation: {
        h: {
          count: 0,
          enable: true,
          offset: 0,
          speed: 50,
          sync: false
        },
        s: {
          count: 0,
          enable: false,
          offset: 0,
          speed: 1,
          sync: true
        },
        l: {
          count: 0,
          enable: false,
          offset: 0,
          speed: 1,
          sync: true
        }
      }
    },
    destroy: {
      mode: "none",
      split: {
        count: 1,
        factor: {
          random: {
            enable: false,
            minimumValue: 0
          },
          value: 3
        },
        rate: {
          random: {
            enable: false,
            minimumValue: 0
          },
          value: {
            min: 4,
            max: 9
          }
        },
        sizeOffset: true
      }
    },
    gradient: [],
    groups: {},
    life: {
      count: 0,
      delay: {
        random: {
          enable: false,
          minimumValue: 0
        },
        value: 0,
        sync: false
      },
      duration: {
        random: {
          enable: false,
          minimumValue: 0.0001
        },
        value: 0,
        sync: false
      }
    },
    links: {
      blink: false,
      color: {
        value: "random"
      },
      consent: false,
      distance: 100,
      enable: true,
      frequency: 1,
      opacity: .2,
      shadow: {
        blur: 5,
        color: {
          value: "#000"
        },
        enable: false
      },
      triangles: {
        enable: false,
        frequency: 1
      },
      width: 1,
      warp: false
    },
    move: {
      angle: {
        offset: 0,
        value: 90
      },
      attract: {
        distance: 200,
        enable: false,
        rotate: {
          x: 3000,
          y: 3000
        }
      },
      center: {
        x: 50,
        y: 50,
        radius: 0
      },
      decay: 0,
      distance: {},
      direction: "none",
      drift: 0,
      enable: true,
      gravity: {
        acceleration: 9.81,
        enable: false,
        inverse: false,
        maxSpeed: 50
      },
      path: {
        clamp: true,
        delay: {
          random: {
            enable: false,
            minimumValue: 0
          },
          value: 0
        },
        enable: false,
        options: {}
      },
      outModes: {
        default: "out",
        bottom: "out",
        left: "out",
        right: "out",
        top: "out"
      },
      random: false,
      size: false,
      speed: .5,
      spin: {
        acceleration: 0,
        enable: false
      },
      straight: false,
      trail: {
        enable: false,
        length: 10,
        fillColor: {
          value: "#000000"
        }
      },
      vibrate: false,
      warp: false
    },
    number: {
      density: {
        enable: true,
        area: 800,
        factor: 1000
      },
      limit: 0,
      value: 100
    },
    opacity: {
      random: {
        enable: true,
        minimumValue: 0.1
      },
      value: {
        min: 0.1,
        max: 0.5
      },
      animation: {
        count: 0,
        enable: true,
        speed: 0.5,
        sync: false,
        destroy: "none",
        startValue: "random",
        minimumValue: 0.1
      }
    },
    orbit: {
      animation: {
        count: 0,
        enable: false,
        speed: 1,
        sync: false
      },
      enable: false,
      opacity: .5,
      rotation: {
        random: {
          enable: false,
          minimumValue: 0
        },
        value: 45
      },
      width: 1
    },
    reduceDuplicates: false,
    repulse: {
      random: {
        enable: false,
        minimumValue: 0
      },
      value: 0,
      enabled: false,
      distance: 1,
      duration: 1,
      factor: 1,
      speed: 1
    },
    roll: {
      darken: {
        enable: false,
        value: 0
      },
      enable: false,
      enlighten: {
        enable: false,
        value: 0
      },
      mode: "vertical",
      speed: 25
    },
    rotate: {
      random: {
        enable: false,
        minimumValue: 0
      },
      value: 0,
      animation: {
        enable: false,
        speed: 0,
        sync: false
      },
      direction: "clockwise",
      path: false
    },
    shadow: {
      blur: 0,
      color: {
        value: "#000"
      },
      enable: false,
      offset: {
        x: 0,
        y: 0
      }
    },
    shape: {
      options: {},
      type: "circle"
    },
    size: {
      random: {
        enable: true,
        minimumValue: 1
      },
      value: {
        min: 1,
        max: 3
      },
      animation: {
        count: 0,
        enable: true,
        speed: 3,
        sync: false,
        destroy: "none",
        startValue: "random",
        minimumValue: 1
      }
    },
    stroke: {
      width: 0
    },
    tilt: {
      random: {
        enable: false,
        minimumValue: 0
      },
      value: 0,
      animation: {
        enable: false,
        speed: 0,
        sync: false
      },
      direction: "clockwise",
      enable: false
    },
    twinkle: {
      lines: {
        enable: false,
        frequency: 0.05,
        opacity: .2
      },
      particles: {
        enable: false,
        frequency: 0.05,
        opacity: .2
      }
    },
    wobble: {
      distance: 5,
      enable: false,
      speed: 50
    },
    zIndex: {
      random: {
        enable: false,
        minimumValue: 0
      },
      value: 0,
      opacityRate: 1,
      sizeRate: 1,
      velocityRate: 1
    }
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  responsive: [],
  style: {},
  themes: [],
  zLayers: 100,
  emitters: []
};

export default particlesOptions;