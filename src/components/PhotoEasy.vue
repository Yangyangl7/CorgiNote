<template>
  <div>
    <li v-for="imgUrlOne in note.imgUrls " :key="imgUrlOne">
    <img :src="imgUrlOne" width="200"/>
    <button class="btn btn-danger" @click="deleteImg(imgUrlOne,note)">delete</button>
    </li>
    <input type="file" accept="image/*" capture @change="onChange($event.target.files)">
    <p><img :src="imgUrl" id="imageTag" width="240" height="180"></p>
    <button class="btn btn-danger" @click="uploadImg(note)">Upload Image > 1 Mb</button>
    <br>
    <br>
  </div>
</template>

<script>
import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/storage"
import {storage} from '../firebase/init'

var uniqid = require('uniqid');
var storageRef = storage.ref();

  export default {
    name: "PhotoEasy",
    props: ["note"],
    data() {
      return {
        imgUrl: null,
        imgNames:[],
        imgUrls:[],
        file:null
      }
    },
    
    methods: {
      onChange(files) {
        this.imgUrl = URL.createObjectURL(files[0]);
        this.file = files[0];
      },
      deleteImg(imgUrl,note) {
        var desertRef =storage.refFromURL(imgUrl);
        desertRef.delete().then(function() {
            self.$toasted.show("Photo Success Delete", { 
              theme: "outline", 
              position: "top-center", 
              duration : 3000
            });
            // File deleted successfully
          });
          note.imgUrls = note.imgUrls.filter(function(e) { return e != imgUrl })
        
      },
      uploadImg(note){
        let self = this;
        var metadata = {
          contentType: 'image/jpeg'
        };

        var uploadTask = storageRef.child('images/' +uniqid()+this.file.name).put(this.file, metadata);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // eslint-disable-next-line
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
              // eslint-disable-next-line
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
              // eslint-disable-next-line
                console.log('Upload is running');
                break;
            }
          }, function(error) {

            // A full list of error codes is available at
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

              case 'storage/canceled':
                // User canceled the upload
                break;



              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              note.imgUrls.push(downloadURL);
              
              self.$toasted.show("Photo Success Stored", { 
                theme: "outline", 
                position: "bottom-center", 
                duration : 3000
              });
            });
          });
      }
    }
  }
</script>
