Module.register("uvx_magic_mirror", {
    
    defaults: {

      "updateInterval" : 5000,
      "fadeSpeed": 1000,
      "text": "Start Text"
    },

    getScripts: function() {
      return ["uvx_magic_mirror.js"];
    },

    start: async function () {
      Log.info(`Starting module: ${this.name}`);
  
      this.config.text = "Loading...";

      this.lastIndex = -1;
      this.numericalHour = 0;
      this.numericalMinute = 0;
      this.nextScheduleMinutes = 0;
      this.nextScheduleHours = 0;

      this.testText = "";
  
      // Schedule update timer.
      setInterval(() => {
        this.updateDom(this.config.fadeSpeed);
      }, this.config.updateInterval);
    },

    updateDisplay: function() {
      const stopTimes = [
        "4:34",
        "5:04",
        "5:34",
        "6:04",
        "6:34",
        "6:49",
        "7:04",
        "7:16",
        "7:22",
        "7:28",
        "7:34",
        "7:40",
        "7:46",
        "7:52",
        "7:58",
        "8:04",
        "8:10",
        "8:16",
        "8:22",
        "8:28",
        "8:34",
        "8:40",
        "8:46",
        "8:52",
        "8:58",
        "9:04",
        "9:10",
        "9:16",
        "9:22",
        "9:28",
        "9:34",
        "9:40",
        "9:46",
        "9:52",
        "9:58",
        "10:04",
        "10:10",
        "10:16",
        "10:22",
        "10:32",
        "10:42",
        "10:52",
        "11:02",
        "11:12",
        "11:22",
        "11:32",
        "11:42",
        "11:52",
        "12:02",
        "12:12",
        "12:22",
        "12:32",
        "12:42",
        "12:52",
        "13:02",
        "13:12",
        "13:22",
        "13:32",
        "13:42",
        "13:52",
        "14:02",
        "14:12",
        "14:22",
        "14:32",
        "14:42",
        "14:49",
        "14:55",
        "14:01",
        "15:07",
        "15:13",
        "15:19",
        "15:25",
        "15:31",
        "15:37",
        "15:43",
        "15:49",
        "15:55",
        "16:01",
        "16:07",
        "16:13",
        "16:19",
        "16:25",
        "16:31",
        "16:37",
        "16:43",
        "16:49",
        "16:55",
        "17:01",
        "17:07",
        "17:13",
        "17:19",
        "17:25",
        "17:31",
        "17:37",
        "17:43",
        "17:52",
        "18:02",
        "18:12",
        "18:22",
        "18:32",
        "18:42",
        "18:52",
        "19:02",
        "19:12",
        "19:22",
        "19:32",
        "19:42",
        "19:52",
        "20:02",
        "20:12",
        "20:22",
        "20:32",
        "20:42",
        "20:54",
        "21:09",
        "21:24",
        "21:39",
        "21:54",
        "22:09",
        "22:24",
        "22:39",
        "22:59",
        "23:19",
        "23:49",
        "23:19",
        "23:49"
    ];

      const hour = moment().hour();
      const minutes = moment().minute();

      for(let x = 0; x < stopTimes.length; x++) {
        let times = stopTimes[x].split(":");
        if (times[0] === hour) {
          if (times[1] > minutes) {
            return "Next Stop:\n" + stopTimes[x];
          }
          else if (x < stopTimes.length - 1 && stopTimes[x + 1].split(":")[0] !== hour) {
            return "Next Stop:\n" + stopTimes[x + 1];
          }
          else if (x >= stopTimes.length - 1) {
            return "Next Stop:\n" + stopTimes[0];
          }
        }
        else if (x >= stopTimes.length - 1) {
          return "Next Stop:\n" + stopTimes[0];
        }
      }

      return "Next Stop:\nError";
    },

    getDom: function() {
        const wrapper = document.createElement("div");

        const display = document.createElement("span");

        const parts = this.updateDisplay().split("\n");

        for (const part of parts) {
          if (part != "") {
            display.appendChild(document.createTextNode(part));
            display.appendChild(document.createElement("BR"));
          }
        }

        if (display.children.length > 0) {
          display.lastElementChild.remove();
          wrapper.appendChild(display);
        }

        return wrapper;
    }

  });