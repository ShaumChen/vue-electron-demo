<template>
    <div>
        <div class="drag-bar">
        </div>

        <div class="title-bar">

            <div class="control-bar is-flex flex-j-end flex-a-center">

                <div class="control-bar-lights">
                    <div class="logo">
                        <img src="src/renderer/assets/switch_128px.ico" style="width: 20px; height: 20px;">
                    </div>
                    <div class="control-bar-close" @click="winClose">
                        <svg x="0px" y="0px" viewBox="0 0 6.4 6.4">
                            <polygon fill="#4d0000"
                                     points="6.4,0.8 5.6,0 3.2,2.4 0.8,0 0,0.8 2.4,3.2 0,5.6 0.8,6.4 3.2,4 5.6,6.4 6.4,5.6 4,3.2"></polygon>
                        </svg>
                    </div>
                    <div class="control-bar-fullscreen" @click="winMaximize">
                        <svg class="fullscreen-svg" x="0px" y="0px" viewBox="0 0 6 5.9">
                            <path fill="#006400" d="M5.4,0h-4L6,4.5V0.6C5.7,0.6,5.3,0.3,5.4,0z"></path>
                            <path fill="#006400" d="M0.6,5.9h4L0,1.4l0,3.9C0.3,5.3,0.6,5.6,0.6,5.9z"></path>
                        </svg>
                        <svg class="maximize-svg" x="0px" y="0px" viewBox="0 0 7.9 7.9">
                            <polygon fill="#006400"
                                     points="7.9,4.5 7.9,3.4 4.5,3.4 4.5,0 3.4,0 3.4,3.4 0,3.4 0,4.5 3.4,4.5 3.4,7.9 4.5,7.9 4.5,4.5"></polygon>
                        </svg>
                    </div>
                    <div class="control-bar-minimize" @click="winMinimize">
                        <svg x="0px" y="0px" viewBox="0 0 8 1.1">
                            <rect fill="#995700" width="8" height="1.1"></rect>
                        </svg>
                    </div>

                </div>

            </div>
        </div>
        <div class="foot-bar"></div>
    </div>

</template>

<script>
    let electron = require('electron')
    let ipcRenderer = electron.ipcRenderer

export default{
      name: 'header-bar',
      methods: {
        winMinimize: function (e) {
          ipcRenderer.send('window-all-minimize')
        },
        winMaximize: function (e) {
          ipcRenderer.send('window-all-maximize')
        },
        winClose: function (e) {
          ipcRenderer.send('window-all-closed')
        }

      }
    }
</script>
<style scoped>
    .logo {
        margin-left: 15px;
        margin-top: 2px;
        float: left;
    }

    .drag-bar {
        position: fixed;
        z-index: 1024;
        width: 92%;
        top: 2px;
        left: 2px;
        height: 32px;
        -webkit-app-region: drag;
    }
     .title-bar {
        position: fixed;
        z-index: 1023;
        width: 100%;
        top: 0px;
        left: 0px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        height: 32px;
        background-color: #DADADA;
        background: -moz-linear-gradient(top, #f1f0f0 0%,  #cecece 50%, #dadada 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f1f0f0), color-stop(50%,#cecece), color-stop(100%,#dadada));
        background: -webkit-linear-gradient(top,  #f1f0f0 0%,  #cecece 50%, #dadada 100%);
        background: -o-linear-gradient(top,  #f1f0f0 0%,  #cecece 50%, #dadada 100%);
        background: -ms-linear-gradient(top,  #f1f0f0 0%,  #cecece 50%, #dadada 100%);
        background: linear-gradient(to bottom,  #f1f0f0 0%,  #cecece 50%, #dadada 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cecece', endColorstr='#dadada',GradientType=0 );
    }



    .title-bar .control-bar {
        height: 20px;
        padding-top: 5px;
        padding-right: 5px;
    }
    .control-bar-lights:after {
        content: ' ';
        display: table;
        clear: both;
    }

    .control-bar-lights:hover svg,
    .control-bar-lights:hover svg.fullscreen-svg,
    .control-bar-lights:hover svg.maximize-svg {
        opacity: 1;
    }

    .title-bar.alt svg.fullscreen-svg {
        display: none;
    }

    .title-bar.alt svg.maximize-svg {
        display: block;
    }

    .control-bar-close,
    .control-bar-minimize,
    .control-bar-fullscreen {
        float: right;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin: 2px 4px;
        line-height: 0;
    }

    .control-bar-close {
        border: 1px solid #e2463f;
        background-color: #ff5f57;
        margin-left: 6px;
    }

    .control-bar-close:active {
        border-color: #ad3934;
        background-color: #bf4943;
    }

    .control-bar-close svg {
        width: 10px;
        height: 10px;
        margin-top: 2px;
        margin-left: 2px;
        opacity: 0;
    }

    .control-bar-minimize {
        border: 1px solid #e1a116;
        background-color: #ffbd2e;
    }

    .control-bar-minimize:active {
        border-color: #ad7d15;
        background-color: #bf9123;
    }

    .control-bar-minimize svg {
        width: 10px;
        height: 10px;
        margin-top: 2px;
        margin-left: 2px;
        opacity: 0;
    }

    .control-bar-fullscreen,
    .title-bar-maximize {
        border: 1px solid #12ac28;
        background-color: #28c940;
    }

    .control-bar-fullscreen:active {
        border-color: #128622;
        background-color: #1f9a31;
    }

    .control-bar-fullscreen svg.fullscreen-svg {
        width: 10px;
        height: 10px;
        margin-top: 2px;
        margin-left: 2px;
        opacity: 0;
    }

    .control-bar-fullscreen svg.maximize-svg {
        width: 8px;
        height: 8px;
        margin-top:2px;
        margin-left: 2px;
        opacity: 0;
        display: none;
    }


    .foot-bar {
        position: fixed;
        z-index: 1023;
        width: 100%;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        bottom: 0px;
        left: 0px;
        height: 32px;
        background-color: #cbcbcb;
    }

</style>