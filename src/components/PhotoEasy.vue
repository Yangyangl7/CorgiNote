<template>
  <div style="margin-top:5px;display:inline-block;" class="photo-easy">
    <label v-if="!file" class="custom-file-upload btn">
      <input type="file" accept="image/*" capture @change="onChange($event.target.files)">Choose File
    </label>
    <button v-if="file" class="btn btn-upload" @click="uploadImg(note)">Upload Image > 1 Mb</button>

    <div class="lightbox-overlay" v-if="overlayActive" @click.self="closeOverlay">
      <div @click.self="closeOverlay" class="overlay-img">
        <img :src="currentImage" width="100%">
      </div>
    </div>

    <li v-for="imgUrlOne in note.imgUrls " :key="imgUrlOne" class="photo-thumbnail">
      <div class="image-frame" @click="clickImage(imgUrlOne)">
        <img :src="imgUrlOne" width="50px" class="upload-image">
      </div>
      <!-- <button class="btn btn-danger" @click="deleteImg(imgUrlOne,note)">delete</button> -->
      <span class="dot"></span>
      <span class="remove" @click="deleteImg(imgUrlOne,note)">&times;</span>
    </li>

    <!-- <p>
      <img :src="imgUrl" id="imageTag" width="20">
    </p>-->
    <br>
    <br>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { storage } from "../firebase/init";

var uniqid = require("uniqid");
var storageRef = storage.ref();

export default {
  name: "PhotoEasy",
  props: ["note"],
  data() {
    return {
      currentImage: "",
      overlayActive: false,
      imgUrl: null,
      imgNames: [],
      imgUrls: [],
      file: null
    };
  },

  methods: {
    closeOverlay() {
      this.overlayActive = false;
    },
    clickImage(src) {
      this.currentImage = src;
      this.overlayActive = true;
    },
    onChange(files) {
      this.imgUrl = URL.createObjectURL(files[0]);
      this.file = files[0];
    },
    deleteImg(imgUrl, note) {
      let self = this;
      var desertRef = storage.refFromURL(imgUrl);
      desertRef.delete().then(function() {
        self.$toasted.show("Photo Has Been Removed Successfully.", {
          theme: "toasted-primary",
          position: "top-center",
          duration: 3000
        });
        // File deleted successfully
      });
      note.imgUrls = note.imgUrls.filter(function(e) {
        return e != imgUrl;
      });
    },
    uploadImg(note) {
      let self = this;
      var metadata = {
        contentType: "image/jpeg"
      };

      var uploadTask = storageRef
        .child("images/" + uniqid() + this.file.name)
        .put(this.file, metadata);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // eslint-disable-next-line
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              // eslint-disable-next-line
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              // eslint-disable-next-line
              console.log("Upload is running");
              break;
          }
        },
        function(error) {
          // A full list of error codes is available at
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            note.imgUrls.push(downloadURL);

            self.$toasted.show("Photo Has Been Saved Successfully.", {
              theme: "toasted-primary",
              position: "top-center",
              duration: 3000
            });
          });
        }
      );
      this.file = "";
    }
  }
};
</script>

<style scoped>
img.upload-image {
  transition: all linear 0.2s;
}

.image-frame {
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  width: 35px;
  height: 35px;
  overflow: hidden;
  margin-left: 10px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.image-frame:hover,
.image-frame:focus {
  border: 1px solid rgba(241, 211, 159, 0.8);
}

.image-frame:hover img.upload-image,
.image-frame:focus img.upload-image {
  transform: scale(1.5);
}

.remove {
  position: absolute;
  top: -0.9rem;
  right: -0.1rem;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all linear 0.2s;
}

.remove:focus,
.remove:hover {
  color: #eb8d21;
}

.dot {
  height: 0.8rem;
  width: 0.8rem;
  /* background-color: rgba(241, 211, 159, 0.8); */
  background-color: #ddd;
  border-radius: 50%;
  display: block;
  position: absolute;
  right: -0.2rem;
  top: -0.3rem;
  transition: all linear 0.2s;
  cursor: pointer;
}

.image-frame:hover ~ .dot,
.image-frame:focus ~ .dot {
  background-color: rgba(241, 211, 159, 1);
}

.image-frame:hover ~ .remove,
.image-frame:focus ~ .remove {
  color: #eb8d21;
}

.photo-easy input {
  font-family: "Raleway", sans-serif;
}

.photo-easy input[type="file"] {
  color: transparent;
  display: none;
}

.custom-file-upload {
  text-transform: unset;
  background-color: rgba(0, 0, 0, 0.9);
  display: inline-block;
  cursor: pointer;
  color: #fff;
  transition: all linear 200ms;
  font-size: 0.8rem;
}

.custom-file-upload:hover,
.custom-file-upload:focus {
  background-color: #e0903e;
}

button.btn-upload {
  background-color: #e0903e;
  text-transform: unset;
  font-size: 0.8rem;
}

li.photo-thumbnail {
  list-style-type: none;
  display: inline-block;
  position: relative;
  top: 0.9rem;
}
.lightbox-overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  z-index: 3;
}

.overlay-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
