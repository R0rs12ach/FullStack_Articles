var refreshButton = document.querySelector('.refresh');
var closeButton1 = document.querySelector('.close1');
var closeButton2 = document.querySelector('.close2');
var closeButton3 = document.querySelector('.close3');
//通过dom元素及其事件构建点击流（一切皆可以是流的mantra[咒语]）
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');
var close1ClickStream = Rx.Observable.fromEvent(closeButton1, 'click');
var close2ClickStream = Rx.Observable.fromEvent(closeButton2, 'click');
var close3ClickStream = Rx.Observable.fromEvent(closeButton3, 'click');

//构建一个请求流
var requestStream = refreshClickStream.startWith('startup click')
  .map(function() {
    var randomOffset = Math.floor(Math.random() * 500);
    return 'https://api.github.com/users?since=' + randomOffset;
  });

//根据请求流衍生一个响应流（注意使用了$.getJSON这个高级方法，该方法会返回的是一个promise）
//requestUrl其实就是上面requestStream返回的url
var responseStream = requestStream
  .flatMap(function(requestUrl) {
    return Rx.Observable.fromPromise($.getJSON(requestUrl));
  });

//这个地方将两个流联合起来进行一次筛选
function createSuggestionStream(closeClickStream) {
  return closeClickStream.startWith('startup click')
    .combineLatest(responseStream,
      function(click, listUsers) {
        return listUsers[Math.floor(Math.random() * listUsers.length)];
      }
    )
    .merge(
      refreshClickStream.map(function() {
        return null;
      })
    )
    .startWith(null);
}

var suggestion1Stream = createSuggestionStream(close1ClickStream);
var suggestion2Stream = createSuggestionStream(close2ClickStream);
var suggestion3Stream = createSuggestionStream(close3ClickStream);


//渲染响应返回的内容
function renderSuggestion(suggestedUser, selector) {
  var suggestionEl = document.querySelector(selector);
  if (suggestedUser === null) {
    suggestionEl.style.visibility = 'hidden';
  } else {
    suggestionEl.style.visibility = 'visible';
    var usernameEl = suggestionEl.querySelector('.username');
    usernameEl.href = suggestedUser.html_url;
    usernameEl.textContent = suggestedUser.login;
    var imgEl = suggestionEl.querySelector('img');
    imgEl.src = "";
    imgEl.src = suggestedUser.avatar_url;
  }
}

//下面可以通过underscore改写
suggestion1Stream.subscribe(function(suggestedUser) {
  renderSuggestion(suggestedUser, '.suggestion1');
});

suggestion2Stream.subscribe(function(suggestedUser) {
  renderSuggestion(suggestedUser, '.suggestion2');
});

suggestion3Stream.subscribe(function(suggestedUser) {
  renderSuggestion(suggestedUser, '.suggestion3');
});
