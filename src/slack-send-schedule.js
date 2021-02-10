javascript:void((()=>{
  const timerId = 'mzTm';
  const layerId = 'mzLayer';
  const showSetTimerLayer = ()=>{
    if(erase(timerId)){
	  return;
	}
	if(erase(layerId)){
	  return;
	};
    const _layer = document.createElement('div');
	_layer.innerHTML = `<div id="${layerId}" style="position:fixed;height:100vh;width:100vw;z-index:1000;background-color:rgba(0,0,0,0.5);top:0;left:0;"></div>`;
	const layer = _layer.firstChild;
	layer.innerHTML = `<div style="background-color:white;border-radius:10%;padding:25px;width:200px;text-align:center;margin:auto;margin-top:20%">
	  メッセージタイマー<br>何時間後に送る？<br>
	  <input type="time"/></br>
	  <button style="border-radius:5%;padding:4px;background:#007a5a;color:white;box-shadow:0 3px 4px gray;">タイマーセット</button>
	</div>`;
	const timeinput = layer.querySelector('input');
	timeinput.valueAsNumber = 0;
	const btn = layer.querySelector('button');
	btn.addEventListener('click', ev=>{
	  const n = timeinput.valueAsNumber;
	  if(isNaN(n)){
	    return;
	  }
	  setTimer(n);
	  erase(layerId);
	});
	document.documentElement.appendChild(layer);
  };
  const setTimer = (after)=>{
  	  const targetTime = new Date(Date.now() + after);
	  const targetTimeMilli = targetTime.getTime();
	  const sendBtn = document.querySelector('.c-texty_input__button--send');
	  sendBtn.style.position = 'relative';
	  const _popTimer = document.createElement('div');
	  _popTimer.innerHTML = `<div id="${timerId}" style="position:absolute;bottom:20px;left:-200px;width:180px;background-color:gray;border-radius:5%;padding:2px;text-align:center;"></div>`;
	  const popTimer = _popTimer.firstChild;
	  popTimer.innerHTML = `自動送信予定<br>${targetTime.toLocaleDateString()} ${targetTime.toLocaleTimeString()}<div class="remind"></div>`;
	  const remind = popTimer.querySelector('.remind');
	  const count = ()=>{
	    const n = (targetTimeMilli - Date.now()) / 1000;
	    remind.textContent = `あと${parseInt(n,10)}秒`;
		return n <= 0;
	  };
	  const countDown = ()=>{
	    if(count()){
		  return;
		}
		setTimeout(countDown , 1000);
	  };
	  countDown();
	  sendBtn.appendChild(popTimer);
	  const send = ()=>sendBtn.click();
	  setTimeout(()=>{
	    send();
		erase(timerId);
	  },after);
  };
  const erase = (id)=>{
    const tm = document.querySelector(`#${id}`);
	if(!tm){
	  return false;
	}
	tm.parentNode.removeChild(tm);
	return true;
  };
  showSetTimerLayer();
})())
