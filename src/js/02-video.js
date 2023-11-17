import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCAL_KEY = 'videoplayer-current-time';

const updateCurrentTime = throttle(({ seconds }) => {
  localStorage.setItem(LOCAL_KEY, seconds);
}, 1000);

player.on('timeupdate', updateCurrentTime);

player.on('loaded', () => {
  const savedTime = localStorage.getItem(LOCAL_KEY);
  if (savedTime !== null) {
    player.setCurrentTime(parseFloat(savedTime)).catch(error => {
      console.error('Error setting current time:', error);
    });
  }
});