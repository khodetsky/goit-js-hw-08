import trottle from 'lodash.throttle';
import Player from '@vimeo/player';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const getCurrentTime = function () {
    player.getCurrentTime().then(function (seconds) {
        localStorage.setItem("videoplayer-current-time", `${seconds}`)
    });
};
const setCurrentTime = function () {
    const currentTime = localStorage.getItem("videoplayer-current-time");
    player.setCurrentTime(currentTime);
};

player.on('timeupdate', trottle(getCurrentTime, 1000));
player.on('loaded', setCurrentTime);

