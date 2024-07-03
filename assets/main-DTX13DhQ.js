var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link2 of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link2);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link2) {
    const fetchOpts = {};
    if (link2.integrity) fetchOpts.integrity = link2.integrity;
    if (link2.referrerPolicy) fetchOpts.referrerPolicy = link2.referrerPolicy;
    if (link2.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link2.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link2) {
    if (link2.ep)
      return;
    link2.ep = true;
    const fetchOpts = getFetchOpts(link2);
    fetch(link2.href, fetchOpts);
  }
})();
class BaseComponent {
  constructor(props, ...child) {
    __publicField(this, "element");
    __publicField(this, "child", []);
    this.element = document.createElement(props.tag);
    Object.assign(this.element, props);
    if (child) {
      this.appendChild(child);
    }
  }
  append(child) {
    this.child.push(child);
    this.element.append(child.getElement());
  }
  appendChild(child) {
    child.forEach((el) => {
      this.append(el);
    });
  }
  getElement() {
    return this.element;
  }
  getChildren() {
    return this.child;
  }
  destroy() {
    this.destroyChild();
    this.element.remove();
  }
  clear() {
    this.element.innerHTML = "";
  }
  destroyChild() {
    this.child.forEach((child) => child.destroy());
    this.child = [];
  }
  clearChild() {
    this.child = [];
  }
  getValue() {
    let value = "";
    if (this.element instanceof HTMLInputElement) {
      value = this.element.value.trim();
    }
    return value;
  }
  setElementSrc(src) {
    if (this.element instanceof HTMLImageElement) {
      this.element.src = src;
    }
  }
  addClass(classNameClassName) {
    this.element.classList.add(classNameClassName);
  }
  toggleClass(classSurname) {
    this.element.classList.toggle(classSurname);
  }
  removeClass(className) {
    this.element.classList.remove(className);
  }
}
const div = (props, ...children) => new BaseComponent({ ...props, tag: "div" }, ...children);
const h1 = (className, textContent) => new BaseComponent({ tag: "h1", className, textContent });
const h2 = (className, textContent) => new BaseComponent({ tag: "h2", className, textContent });
const p = (className, textContent) => new BaseComponent({ tag: "p", className, textContent });
const img = ({ src = "", alt = "", className = "", width = 0, height = 0 }) => new BaseComponent({
  tag: "img",
  className,
  src,
  alt,
  width,
  height
});
const a = (props, ...children) => new BaseComponent({ ...props, tag: "a" }, ...children);
const span = (props, ...children) => new BaseComponent({ ...props, tag: "span" }, ...children);
const button = "_button_jv81h_1";
const styles = {
  button
};
const Button = ({ textContent, onClick, className }) => new BaseComponent({
  tag: "button",
  className: `${styles.button} ${className || ""}`,
  textContent,
  onclick: (PreventDefault) => {
    PreventDefault.preventDefault();
    onClick == null ? void 0 : onClick();
  }
});
const header = "_header_12uiy_1";
const wrapper$3 = "_wrapper_12uiy_7";
const logoWrapper = "_logoWrapper_12uiy_14";
const logoutWrapper = "_logoutWrapper_12uiy_20";
const linksWrapper = "_linksWrapper_12uiy_28";
const link = "_link_12uiy_28";
const linkText = "_linkText_12uiy_43";
const logoGit = "_logoGit_12uiy_54";
const logoRs = "_logoRs_12uiy_59";
const logoutLink = "_logoutLink_12uiy_64";
const logoutTittle = "_logoutTittle_12uiy_71";
const logo = "_logo_12uiy_14";
const user$1 = "_user_12uiy_81";
const logoutIcon = "_logoutIcon_12uiy_86";
const tittle$3 = "_tittle_12uiy_92";
const classes$f = {
  header,
  wrapper: wrapper$3,
  logoWrapper,
  logoutWrapper,
  linksWrapper,
  link,
  linkText,
  logoGit,
  logoRs,
  logoutLink,
  logoutTittle,
  logo,
  user: user$1,
  logoutIcon,
  tittle: tittle$3
};
class Header extends BaseComponent {
  constructor(logoutCallback) {
    super({ tag: "header", className: classes$f.header });
    __publicField(this, "logoutBtn");
    __publicField(this, "header");
    __publicField(this, "logoutCallback");
    this.logoutCallback = logoutCallback;
    this.logoutBtn = a(
      { className: classes$f.logoutLink, onclick: this.logoutCallback },
      p(classes$f.logoutTittle, "Logout"),
      img({ src: "img/logout.png", alt: "Logout", className: classes$f.logoutIcon })
    );
    this.header = div(
      { className: classes$f.wrapper },
      div(
        { className: classes$f.logoWrapper },
        img({ src: "img/Logo.png", alt: "Logo", className: classes$f.logo }),
        h1(classes$f.tittle, `English 
 puzzle`)
      ),
      div(
        { className: classes$f.logoutWrapper },
        img({ src: "img/User.png", alt: "User", className: classes$f.user }),
        this.logoutBtn
      ),
      div(
        { className: classes$f.linksWrapper },
        a(
          { className: classes$f.link, href: "https://github.com/YulikK", target: "_blank" },
          img({ src: "img/git.png", alt: "GitHub", className: classes$f.logoGit, width: 24, height: 24 }),
          span({ className: classes$f.linkText, textContent: "GitHub/YulikK" })
        ),
        a(
          { className: classes$f.link, href: "https://rs.school/js/", target: "_blank" },
          img({ src: "img/RS.png", alt: "RS School", className: classes$f.logoRs, width: 24, height: 24 }),
          span({ className: classes$f.linkText, textContent: "RS School" })
        )
      )
    );
    this.appendChild([this.header]);
  }
}
const WELCOME_DESCRIPTION = "Welcome to the world of English and art! Improve your English skills by collecting sentences and uncovering pictures of art. Ready for a challenge? Immerse yourself in the world of words and art with us!";
const CONFIRM_LOGOUT = "Information about the user and his progress will be deleted. Continue?";
const STORE_PREFIX = `RSS_Puzzle_Yulik`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const STORE_USER = `user`;
const STORE_OPTIONS = `options`;
const STORE_LAST_LESSON = `last_lesson`;
const STORE_HISTORY = `history`;
const MIN_LENGTH_FIRST_NAME = 3;
const MIN_LENGTH_LAST_NAME = 4;
const URL = "https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/";
const TAIL = 14 * 100 / 280 / 100;
const pageWrapper = "_pageWrapper_1vp8h_1";
const welcomePage = "_welcomePage_1vp8h_5";
const wrapper$2 = "_wrapper_1vp8h_16";
const tittle$2 = "_tittle_1vp8h_25";
const description$1 = "_description_1vp8h_35";
const start = "_start_1vp8h_45";
const classes$e = {
  pageWrapper,
  welcomePage,
  wrapper: wrapper$2,
  tittle: tittle$2,
  description: description$1,
  start
};
class Welcome extends BaseComponent {
  constructor(user2, logoutCallback, startCallback) {
    super({ tag: "div", className: classes$e.pageWrapper });
    __publicField(this, "startBtn");
    __publicField(this, "modal");
    __publicField(this, "header");
    __publicField(this, "startCallback");
    this.header = new Header(logoutCallback);
    this.startCallback = startCallback;
    const userName = user2.getFullName();
    this.startBtn = Button({
      textContent: "Start",
      onClick: () => {
        this.startCallback();
      },
      className: classes$e.start
    });
    this.modal = div(
      { className: classes$e.welcomePage },
      div(
        { className: classes$e.wrapper },
        h2(classes$e.tittle, `Dear, ${userName}!`),
        p(classes$e.description, WELCOME_DESCRIPTION),
        this.startBtn
      )
    );
    this.appendChild([this.header, this.modal]);
  }
}
var HintName = /* @__PURE__ */ ((HintName2) => {
  HintName2["onSound"] = "onSound";
  HintName2["onTranslate"] = "onTranslate";
  HintName2["onPicture"] = "onPicture";
  return HintName2;
})(HintName || {});
var FieldName = /* @__PURE__ */ ((FieldName2) => {
  FieldName2["firstName"] = "firstName";
  FieldName2["lastName"] = "lastName";
  return FieldName2;
})(FieldName || {});
function getValidationConstant(field) {
  const regexAll = /^[a-zA-Z-]*$/;
  const regexFirst = /^[A-Z][a-zA-Z-]*$/;
  let message = "";
  let minLength = 0;
  if (field === FieldName.firstName) {
    message = "First name";
    minLength = MIN_LENGTH_FIRST_NAME;
  } else if (field === FieldName.lastName) {
    message = "Last name";
    minLength = MIN_LENGTH_LAST_NAME;
  }
  return { message, minLength, regexAll, regexFirst };
}
function validateField(value, field) {
  const validation = {
    isValid: false,
    error: ""
  };
  const { message, minLength, regexAll, regexFirst } = getValidationConstant(field);
  if (value.length < minLength) {
    validation.error = `${message} must be at least ${minLength} characters long`;
  } else if (!regexAll.test(value)) {
    validation.error = `${message} must contain only letters and hyphens`;
  } else if (!regexFirst.test(value)) {
    validation.error = `${message} must start with a capital letter`;
  } else {
    validation.isValid = true;
  }
  return validation;
}
function isOptionsType(entity) {
  return Boolean(
    typeof entity === "object" && entity && "onSound" in entity && typeof entity.onSound === "boolean" && "onTranslate" in entity && typeof entity.onTranslate === "boolean" && "onPicture" in entity && typeof entity.onPicture === "boolean"
  );
}
function isUserType(entity) {
  return Boolean(
    typeof entity === "object" && entity && "firstName" in entity && typeof entity.firstName === "string" && "lastName" in entity && typeof entity.lastName === "string"
  );
}
function isLessonType(entity) {
  return Boolean(
    typeof entity === "object" && Array.isArray(entity) && entity && entity.length > 0 && "levelData" in entity[0] && "words" in entity[0]
  );
}
const input$1 = "_input_14dbk_1";
const success$1 = "_success_14dbk_9";
const error$1 = "_error_14dbk_12";
const errorMessage = "_errorMessage_14dbk_26";
const classes$d = {
  input: input$1,
  success: success$1,
  error: error$1,
  errorMessage
};
class Input extends BaseComponent {
  constructor({ id, type, placeholder, className, errorContainer: errorContainer2 }) {
    super({ tag: "input", id, type, placeholder, className: `${classes$d.input} ${className || ""}` });
    __publicField(this, "errorContainer");
    __publicField(this, "id");
    __publicField(this, "onChange", (event) => {
      event.preventDefault();
      this.validate();
    });
    __publicField(this, "validate", () => {
      const value = this.getValue();
      const validationResult = validateField(value, this.id);
      if (validationResult.isValid) {
        this.setSuccess();
      } else {
        this.setError(validationResult.error);
      }
      return validationResult.isValid;
    });
    this.id = id;
    this.errorContainer = errorContainer2;
    this.element.addEventListener("change", this.onChange);
  }
  isValid() {
    return this.validate();
  }
  setError(error2) {
    this.errorContainer.getElement().innerHTML = "";
    this.errorContainer.append(p(classes$d.errorMessage, error2));
    this.addClass(classes$d.error);
    this.removeClass(classes$d.success);
  }
  setSuccess() {
    this.errorContainer.getElement().innerHTML = "";
    this.addClass(classes$d.success);
    this.removeClass(classes$d.error);
  }
}
const authPage = "_authPage_1c83x_1";
const wrapper$1 = "_wrapper_1c83x_12";
const tittle$1 = "_tittle_1c83x_21";
const errorContainer = "_errorContainer_1c83x_31";
const inputWrapper = "_inputWrapper_1c83x_40";
const login = "_login_1c83x_45";
const classes$c = {
  authPage,
  wrapper: wrapper$1,
  tittle: tittle$1,
  errorContainer,
  inputWrapper,
  login
};
class Auth extends BaseComponent {
  constructor(user2, loginCallback) {
    super({ tag: "form", className: classes$c.authPage, id: "auth" });
    __publicField(this, "loginBtn");
    __publicField(this, "modal");
    __publicField(this, "user");
    __publicField(this, "firstName");
    __publicField(this, "lastName");
    __publicField(this, "errorsContainer");
    __publicField(this, "loginCallback");
    __publicField(this, "login", () => {
      if (this.validateForm()) {
        this.updateUser();
        this.loginCallback();
      }
    });
    __publicField(this, "validateForm", () => this.firstName.isValid() && this.lastName.isValid());
    this.user = user2;
    this.loginCallback = loginCallback;
    this.loginBtn = Button({
      textContent: "Login",
      onClick: this.login,
      className: classes$c.login
    });
    this.errorsContainer = {
      firstName: div({ className: classes$c.errorContainer }),
      lastName: div({ className: classes$c.errorContainer })
    };
    this.firstName = new Input({ id: FieldName.firstName, type: "text", placeholder: "First name", errorContainer: this.errorsContainer.firstName });
    this.lastName = new Input({ id: FieldName.lastName, type: "text", placeholder: "Last name", errorContainer: this.errorsContainer.lastName });
    this.modal = div(
      { className: classes$c.wrapper },
      h2(classes$c.tittle, "User Login"),
      div(
        { className: classes$c.inputWrapper },
        this.firstName,
        this.errorsContainer.firstName
      ),
      div(
        { className: classes$c.inputWrapper },
        this.lastName,
        this.errorsContainer.lastName
      ),
      this.loginBtn
    );
    this.appendChild([this.modal]);
  }
  updateUser() {
    const firstName = this.firstName.getValue();
    const lastName = this.lastName.getValue();
    this.user.setName(firstName, lastName);
  }
}
const startPage$1 = "_startPage_1vn9e_1";
const classes$b = {
  startPage: startPage$1
};
class StartPage extends BaseComponent {
  constructor(container2, user2, startGameCallback, logoutCallback) {
    super({ tag: "div", className: classes$b.startPage });
    __publicField(this, "container");
    __publicField(this, "welcomeComponent", null);
    __publicField(this, "authComponent", null);
    __publicField(this, "user");
    __publicField(this, "startGameCallback");
    __publicField(this, "logoutCallback");
    __publicField(this, "logoutClick", () => {
      this.logoutCallback();
    });
    __publicField(this, "login", () => {
      this.clearContainer();
      this.showWelcome();
    });
    this.container = container2;
    this.startGameCallback = startGameCallback;
    this.logoutCallback = logoutCallback;
    this.user = user2;
  }
  initApp() {
    if (!this.user.isEmpty()) {
      this.showWelcome();
    } else {
      this.showAuth();
    }
  }
  logout() {
    this.clearContainer();
    this.showAuth();
  }
  showAuth() {
    this.authComponent = new Auth(this.user, this.login);
    this.appendChild([this.authComponent]);
    this.container.append(this.element);
  }
  clearContainer() {
    this.destroyChild();
  }
  showWelcome() {
    this.welcomeComponent = new Welcome(this.user, this.logoutClick, this.startGameCallback);
    this.appendChild([this.welcomeComponent]);
    this.container.append(this.element);
  }
}
const background$1 = "_background_qpqeh_1";
const chose = "_chose_qpqeh_11";
const close = "_close_qpqeh_25";
const buttonWrap = "_buttonWrap_qpqeh_34";
const level$1 = "_level_qpqeh_39";
const lessonsContainer = "_lessonsContainer_qpqeh_48";
const lesson = "_lesson_qpqeh_48";
const image = "_image_qpqeh_67";
const noImage = "_noImage_qpqeh_72";
const lessonName = "_lessonName_qpqeh_77";
const levelTittle = "_levelTittle_qpqeh_86";
const lessonsWrap = "_lessonsWrap_qpqeh_94";
const classes$a = {
  background: background$1,
  chose,
  close,
  buttonWrap,
  level: level$1,
  lessonsContainer,
  lesson,
  image,
  noImage,
  lessonName,
  levelTittle,
  lessonsWrap
};
class Chose extends BaseComponent {
  constructor(lessons, callback) {
    super({ tag: "div", className: classes$a.background });
    __publicField(this, "container");
    __publicField(this, "lessons");
    __publicField(this, "closeButton");
    __publicField(this, "callback", null);
    __publicField(this, "onCloseClick", () => {
      this.destroy();
    });
    __publicField(this, "onLessonClick", (evt) => {
      const target = evt.currentTarget;
      if (target instanceof HTMLElement && target.classList.contains(classes$a.lesson)) {
        const lessonId = target.dataset.lvlId;
        if (lessonId) {
          this.lessons.setLesson(lessonId);
          this.destroy();
          if (this.callback) {
            this.callback();
          }
        }
      }
    });
    this.container = document.body;
    this.lessons = lessons;
    this.callback = callback;
    this.closeButton = Button({ textContent: "X", onClick: this.onCloseClick, className: classes$a.close });
    const lessonList = this.makeLessonList();
    const modal2 = div({ className: classes$a.chose });
    modal2.appendChild([div(
      { className: classes$a.buttonWrap },
      this.closeButton
    )]);
    modal2.appendChild(lessonList);
    this.appendChild([modal2]);
  }
  init() {
    this.container.append(this.getElement());
  }
  makeLessonList() {
    const elements = [];
    const lessons = this.lessons.getLessons();
    const history = this.lessons.getHistory();
    let currentLevel = "";
    let lessonsContainer2 = null;
    lessons.forEach((lesson2) => {
      const levelId = lesson2.levelData.id.split("_")[0];
      const lessonNumber = lesson2.levelData.id.split("_")[1];
      if (levelId && levelId !== currentLevel) {
        currentLevel = levelId;
        const level2 = div({ className: classes$a.level }, p(classes$a.levelTittle, `Level ${levelId}`));
        lessonsContainer2 = div({ className: classes$a.lessonsContainer });
        elements.push(level2);
        elements.push(lessonsContainer2);
      }
      if (lessonsContainer2) {
        const isDone = history.find((historyLesson) => historyLesson.levelData.id === lesson2.levelData.id);
        const lessonItem = a(
          { className: classes$a.lesson },
          isDone ? img({ src: `${URL}images/${lesson2.levelData.cutSrc}`, alt: `lesson ${lesson2.levelData.id}`, className: classes$a.image, width: 90, height: 60 }) : img({ src: `img/no-img.png`, alt: `lesson ${lesson2.levelData.id}`, className: classes$a.noImage, width: 50, height: 50 }),
          p(classes$a.lessonName, `Lesson ${lessonNumber}`)
        );
        lessonItem.getElement().dataset.lvlId = lesson2.levelData.id;
        lessonItem.getElement().addEventListener("click", this.onLessonClick);
        lessonsContainer2.appendChild([lessonItem]);
      }
    });
    return elements;
  }
}
const hide$2 = "_hide_1v6hh_1";
const progressWrapper = "_progressWrapper_1v6hh_6";
const progressBar = "_progressBar_1v6hh_12";
const progressCircle = "_progressCircle_1v6hh_18";
const progressInformation = "_progressInformation_1v6hh_36";
const level = "_level_1v6hh_47";
const round = "_round_1v6hh_57";
const classes$9 = {
  hide: hide$2,
  progressWrapper,
  progressBar,
  progressCircle,
  progressInformation,
  level,
  round
};
const LVL_TXT = "Lvl";
class ProgressBar extends BaseComponent {
  constructor(container2, lesson2) {
    var _a, _b;
    super({ tag: "div", className: classes$9.progressWrapper });
    __publicField(this, "container");
    __publicField(this, "progressLine");
    __publicField(this, "progressCircle");
    __publicField(this, "level");
    __publicField(this, "round");
    __publicField(this, "lessons");
    __publicField(this, "chooseLessonCallback", null);
    __publicField(this, "onChooseCallback", () => {
      this.updateInfo();
      if (this.chooseLessonCallback) {
        this.chooseLessonCallback();
      }
    });
    __publicField(this, "onClick", () => {
      const choseModal = new Chose(this.lessons, this.onChooseCallback);
      choseModal.init();
    });
    this.container = container2;
    this.lessons = lesson2;
    const levelNumber = ((_a = this.lessons.getCurrentLesson()) == null ? void 0 : _a.levelData.id.split("_")[0]) || "";
    const lessonNumber = ((_b = this.lessons.getCurrentLesson()) == null ? void 0 : _b.levelData.id.split("_")[1]) || "";
    const lessonCount = this.lessons.getCountLessonsInLevel(levelNumber);
    this.level = p(classes$9.level, `${LVL_TXT} ${levelNumber}`);
    this.round = p(classes$9.round, `${lessonNumber} / ${lessonCount}`);
    this.progressCircle = div(
      { className: classes$9.progressCircle },
      div(
        { className: classes$9.progressInformation },
        this.level,
        this.round
      )
    );
    this.progressLine = div(
      { className: classes$9.progressBar },
      this.progressCircle
    );
    this.appendChild([this.progressLine]);
    this.container.append(this);
    this.progressCircle.getElement().addEventListener("click", this.onClick);
  }
  setChooseLessonCallback(callback) {
    this.chooseLessonCallback = callback;
  }
  updateInfo() {
    var _a, _b;
    const levelNumber = ((_a = this.lessons.getCurrentLesson()) == null ? void 0 : _a.levelData.id.split("_")[0]) || "";
    const lessonNumber = ((_b = this.lessons.getCurrentLesson()) == null ? void 0 : _b.levelData.id.split("_")[1]) || "";
    const lessonCount = this.lessons.getCountLessonsInLevel(levelNumber);
    this.level.getElement().textContent = `${LVL_TXT} ${levelNumber}`;
    this.round.getElement().textContent = `${lessonNumber} / ${lessonCount}`;
  }
  hide() {
    this.addClass(classes$9.hide);
  }
  show() {
    this.removeClass(classes$9.hide);
  }
}
const input = "_input_1nnox_1";
const optionWrap = "_optionWrap_1nnox_6";
const label = "_label_1nnox_10";
const onSound = "_onSound_1nnox_20";
const onTranslate = "_onTranslate_1nnox_28";
const onPicture = "_onPicture_1nnox_36";
const classes$8 = {
  input,
  optionWrap,
  label,
  onSound,
  onTranslate,
  onPicture
};
class Checkbox extends BaseComponent {
  constructor(id, options2, changeCallback) {
    super({ tag: "div", className: classes$8.optionWrap });
    __publicField(this, "options");
    __publicField(this, "id");
    __publicField(this, "input");
    __publicField(this, "label");
    __publicField(this, "changeCallback");
    __publicField(this, "onChange", (evt) => {
      if (evt.target instanceof HTMLInputElement) {
        this.options.setOption(this.id, evt.target.checked);
        this.changeCallback(this.id);
      }
    });
    this.options = options2;
    this.changeCallback = changeCallback;
    this.id = id;
    this.input = new BaseComponent({ tag: "input", id, type: "checkbox", className: classes$8.input, onchange: this.onChange, checked: this.options.getOptions(this.id) });
    this.label = new BaseComponent({ tag: "label", className: `${classes$8.label} ${classes$8[this.id]}`, htmlFor: this.id });
    this.appendChild([this.input, this.label]);
  }
}
const sound = "_sound_ztmso_1";
const soundImg = "_soundImg_ztmso_10";
const disable = "_disable_ztmso_15";
const classes$7 = {
  sound,
  soundImg,
  disable
};
class Play extends BaseComponent {
  constructor() {
    super({ tag: "a", className: classes$7.sound });
    __publicField(this, "audio");
    __publicField(this, "src", "");
    __publicField(this, "image");
    __publicField(this, "onClick", async () => {
      try {
        await this.audio.play();
      } catch (error2) {
        this.image.addClass(classes$7.disable);
      }
    });
    __publicField(this, "onLoad", () => {
      this.image.removeClass(classes$7.disable);
    });
    this.image = img({ src: "img/hint-sound.png", alt: "play sound hint", className: `${classes$7.soundImg} ${classes$7.disable}`, width: 24, height: 24 });
    this.append(this.image);
    this.element.onclick = this.onClick;
    this.audio = new Audio();
    this.audio.onplay = () => this.image.setElementSrc("img/hint-sound-play.png");
    this.audio.onended = () => this.image.setElementSrc("img/hint-sound.png");
    this.audio.addEventListener("canplaythrough", this.onLoad);
  }
  setFile(src) {
    this.src = src;
    this.audio.src = `${URL}${this.src}`;
    this.audio.load();
  }
}
const hide$1 = "_hide_11zal_1";
const text$2 = "_text_11zal_6";
const hintOptions = "_hintOptions_11zal_18";
const hint = "_hint_11zal_18";
const hintContainer$1 = "_hintContainer_11zal_34";
const hintOptionsContainer = "_hintOptionsContainer_11zal_41";
const classes$6 = {
  hide: hide$1,
  text: text$2,
  hintOptions,
  hint,
  hintContainer: hintContainer$1,
  hintOptionsContainer
};
class Hint extends BaseComponent {
  constructor(container2, options2, lessons) {
    super({ tag: "div", className: classes$6.hint });
    __publicField(this, "container");
    __publicField(this, "options");
    __publicField(this, "soundComponent");
    __publicField(this, "translateComponent");
    __publicField(this, "pictureComponent");
    __publicField(this, "hintSound");
    __publicField(this, "hintTranslate");
    __publicField(this, "lessons");
    __publicField(this, "onChangePictureOption", null);
    __publicField(this, "changeOptionsHandler", (id) => {
      if (id === HintName.onSound) {
        this.updateSoundHint();
      } else if (id === HintName.onTranslate) {
        this.updateTranslateHint();
      } else if (id === HintName.onPicture) {
        if (this.onChangePictureOption) {
          this.onChangePictureOption(this.options.getOptions(HintName.onPicture));
        }
      }
    });
    this.container = container2;
    this.options = options2;
    this.lessons = lessons;
    this.soundComponent = new Checkbox(HintName.onSound, this.options, this.changeOptionsHandler);
    this.translateComponent = new Checkbox(HintName.onTranslate, this.options, this.changeOptionsHandler);
    this.pictureComponent = new Checkbox(HintName.onPicture, this.options, this.changeOptionsHandler);
    this.hintSound = new Play();
    this.hintTranslate = p(classes$6.text, "");
    this.updatesTextTranslate();
    this.updatePlayFile();
    this.updateTranslateHint();
    this.updateSoundHint();
    this.appendChild([
      div(
        { className: classes$6.hintContainer },
        this.hintSound,
        this.hintTranslate
      ),
      div(
        { className: classes$6.hintOptionsContainer },
        this.translateComponent,
        this.pictureComponent,
        this.soundComponent
      )
    ]);
    this.container.appendChild([this]);
  }
  updatesTextTranslate() {
    this.hintTranslate.getElement().textContent = this.lessons.getTranslate();
  }
  updatePlayFile() {
    this.hintSound.setFile(this.lessons.getAudioFile());
  }
  getOptions() {
    return [
      this.translateComponent,
      this.pictureComponent,
      this.soundComponent
    ];
  }
  getHint() {
    const hintArr = [];
    if (this.hintSound) {
      hintArr.push(this.hintSound);
    }
    if (this.hintTranslate) {
      hintArr.push(this.hintTranslate);
    }
    return hintArr;
  }
  setOnPictureCallback(callback) {
    this.onChangePictureOption = callback;
  }
  showAllHints() {
    this.hintSound.removeClass(classes$6.hide);
    this.hintTranslate.removeClass(classes$6.hide);
  }
  startNewLesson() {
    this.updatesTextTranslate();
    this.updatePlayFile();
    this.updateSoundHint();
    this.updateTranslateHint();
  }
  updateSoundHint() {
    if (this.options.items.onSound) {
      this.hintSound.removeClass(classes$6.hide);
    } else {
      this.hintSound.addClass(classes$6.hide);
    }
  }
  updateTranslateHint() {
    if (this.options.items.onTranslate) {
      this.hintTranslate.removeClass(classes$6.hide);
    } else {
      this.hintTranslate.addClass(classes$6.hide);
    }
  }
  hide() {
    this.addClass(classes$6.hide);
  }
  show() {
    this.removeClass(classes$6.hide);
  }
}
const showPicture = "_showPicture_kzwah_9";
const ShowPictureAnimation = "_ShowPictureAnimation_kzwah_1";
const line = "_line_kzwah_14";
const pictureLine = "_pictureLine_kzwah_23";
const container = "_container_kzwah_32";
const choose = "_choose_kzwah_44";
const success = "_success_kzwah_49";
const error = "_error_kzwah_53";
const classes$5 = {
  showPicture,
  ShowPictureAnimation,
  line,
  pictureLine,
  container,
  choose,
  success,
  error
};
class Box {
  constructor(answerContainer, sourcesContainer) {
    __publicField(this, "answerContainer");
    __publicField(this, "sourcesContainer");
    __publicField(this, "answerLine", null);
    __publicField(this, "sourceLine", null);
    __publicField(this, "overElement", null);
    __publicField(this, "answer", []);
    __publicField(this, "fixAnswer", []);
    __publicField(this, "source", []);
    __publicField(this, "onDragOver", (event) => {
      event.preventDefault();
      if (event.target && event.target instanceof HTMLElement) {
        const { target } = event;
        this.overElement = target.closest(`.${classes$5.container}`);
        if (this.overElement) {
          this.overElement.classList.add(classes$5.choose);
        }
      }
    });
    __publicField(this, "onDragLeave", () => {
      if (this.overElement) {
        this.overElement.classList.remove(classes$5.choose);
        this.overElement = null;
      }
    });
    this.answerContainer = answerContainer;
    this.sourcesContainer = sourcesContainer;
    this.makeSourceLine();
  }
  renderRound(width, height, lineId, wordCount) {
    this.makeAnswerLine(height);
    if (this.sourceLine) {
      this.sourceLine.getElement().style.height = `${height}px`;
    }
    for (let word = 0; word < wordCount; word += 1) {
      const widthElement = Math.round(width / wordCount) + wordCount * 0.1;
      this.fillLines(lineId, word, widthElement, height);
    }
  }
  makeAnswerLine(height) {
    this.answerLine = div({ className: `${classes$5.pictureLine}`, height });
    this.answerContainer.appendChild([this.answerLine]);
  }
  makeSourceLine() {
    this.sourceLine = div({ className: classes$5.line });
    this.sourcesContainer.appendChild([this.sourceLine]);
  }
  createEmptyBlock(line2, word, width, height) {
    const newBlock = div({
      id: `sources-${line2}-${word}`,
      className: classes$5.container,
      ondragover: this.onDragOver,
      ondragleave: this.onDragLeave
    });
    if (width) {
      const margin = word === 0 ? 0 : width * 0.05;
      newBlock.getElement().style.width = `${width}px`;
      newBlock.getElement().style.height = `${height}px`;
      newBlock.getElement().style.marginLeft = `-${margin}px`;
    }
    return newBlock;
  }
  fillLines(line2, word, width, height) {
    var _a, _b;
    const emptyBlockSource = this.createEmptyBlock(line2, word, width, height);
    this.source.push(emptyBlockSource);
    (_a = this.sourceLine) == null ? void 0 : _a.append(emptyBlockSource);
    const emptyBlockPict = this.createEmptyBlock(line2, word, width, height);
    this.answer.push(emptyBlockPict);
    (_b = this.answerLine) == null ? void 0 : _b.append(emptyBlockPict);
  }
  fixLine() {
    var _a;
    this.fixAnswer.push(this.answer);
    this.answer.forEach((block2) => {
      const blockElement = block2.getElement();
      blockElement.ondragover = null;
      blockElement.ondragleave = null;
    });
    this.source.forEach((block2) => {
      block2.destroy();
    });
    (_a = this.sourceLine) == null ? void 0 : _a.destroyChild();
    this.source = [];
    this.answer = [];
  }
  showAnswer(puzzles) {
    puzzles.forEach((puzzle, index) => {
      const answerBlock = this.answer[index];
      if (answerBlock) {
        answerBlock.clear();
        answerBlock.clearChild();
        answerBlock.appendChild([puzzle]);
      }
      const sourcesBlock = this.source[index];
      if (sourcesBlock) {
        sourcesBlock.clear();
        sourcesBlock.clearChild();
      }
    });
  }
  movePuzzleToFirstEmpty(puzzle) {
    const startArea = this.findStartArea(puzzle);
    const puzzleContainer2 = findPuzzleContainer(startArea, puzzle);
    const emptyContainer = this.findEmptyContainer(startArea === this.source ? "answer" : "source");
    if (puzzleContainer2 && emptyContainer) {
      puzzleContainer2.clearChild();
      emptyContainer.append(puzzle);
    }
  }
  movePuzzleToOverContainer(puzzle) {
    if (this.overElement) {
      const startArea = this.findStartArea(puzzle);
      const formContainer = findPuzzleContainer(startArea, puzzle);
      const toContainer = this.findContainer(this.overElement);
      if (formContainer && toContainer) {
        const puzzleForSwap = toContainer.getElement().firstChild;
        if (puzzleForSwap && puzzleForSwap instanceof HTMLElement) {
          toContainer.clearChild();
          formContainer.clearChild();
          toContainer.append(puzzle);
          formContainer.getElement().append(puzzleForSwap);
        } else {
          formContainer.clearChild();
          toContainer.append(puzzle);
        }
        this.overElement = null;
      }
    }
    this.setDefaultStyles();
  }
  setDefaultStyles() {
    this.answer.forEach((block2) => {
      block2.removeClass(classes$5.choose);
    });
    this.source.forEach((block2) => {
      block2.removeClass(classes$5.choose);
    });
  }
  findStartArea(puzzle) {
    const isSource = this.findPuzzleInArea("source", puzzle);
    return isSource ? this.source : this.answer;
  }
  findPuzzleInArea(area, puzzle) {
    const block2 = this[area].find((element) => {
      const child = element.getElement().firstChild;
      if (child) {
        return child === puzzle.getElement();
      }
      return false;
    });
    return !!block2;
  }
  findEmptyContainer(area) {
    return this[area].find((block2) => {
      const child = block2.getElement().firstChild;
      return !child;
    });
  }
  findContainer(container2) {
    return this.source.find((block2) => block2.getElement() === container2) || this.answer.find((block2) => block2.getElement() === container2);
  }
  isCorrectAnswer() {
    let isWin = true;
    this.answer.forEach((block2, index) => {
      const childBlock = block2.getElement().firstChild;
      if (childBlock && childBlock instanceof HTMLElement) {
        const idStr = childBlock.id.split("-")[2];
        const id = idStr ? parseInt(idStr, 10) : null;
        if (index !== id) {
          isWin = false;
          block2.addClass(classes$5.error);
        } else {
          block2.addClass(classes$5.success);
        }
      }
    });
    return isWin;
  }
  hideMark() {
    this.fixAnswer.forEach((line2) => {
      line2.forEach((block2) => {
        block2.removeClass(classes$5.error);
        block2.removeClass(classes$5.success);
      });
    });
    this.answer.forEach((block2) => {
      block2.removeClass(classes$5.error);
      block2.removeClass(classes$5.success);
    });
  }
  isComplete() {
    let complete = true;
    this.source.forEach((block2) => {
      if (block2.getElement().firstChild) {
        complete = false;
      }
    });
    return complete;
  }
  showPicture() {
    const line2 = this.answerContainer.getElement().querySelectorAll(`.${classes$5.pictureLine}`);
    line2.forEach((block2) => {
      block2.classList.add(classes$5.showPicture);
    });
    const blockPicture = this.answerContainer.getElement().querySelectorAll(`.${classes$5.container}`);
    blockPicture.forEach((block2) => {
      block2.classList.add(classes$5.showPicture);
    });
  }
  clearFixElements() {
    this.fixAnswer = [];
  }
  resize(width, height) {
    if (this.answerLine && this.sourceLine) {
      this.answerLine.getElement().style.height = `${height}px`;
      this.sourceLine.getElement().style.height = `${height}px`;
    }
    this.fixAnswer.forEach((line2) => {
      const countElement2 = line2.length;
      const widthElement2 = Math.round(width / countElement2) + countElement2 * 0.1;
      line2.forEach((block2, index) => {
        const blockElement = block2.getElement();
        blockElement.style.width = `${widthElement2}px`;
        blockElement.style.height = `${height}px`;
        const margin = index === 0 ? 0 : widthElement2 * TAIL;
        blockElement.style.marginLeft = `-${margin}px`;
      });
    });
    const countElement = this.answer.length;
    const widthElement = Math.round(width / countElement) + countElement * 0.1;
    this.answer.forEach((block2, index) => {
      const blockElement = block2.getElement();
      blockElement.style.width = `${widthElement}px`;
      blockElement.style.height = `${height}px`;
      const margin = index === 0 ? 0 : widthElement * TAIL;
      blockElement.style.marginLeft = `-${margin}px`;
    });
    this.source.forEach((block2, index) => {
      const blockElement = block2.getElement();
      blockElement.style.width = `${widthElement}px`;
      blockElement.style.height = `${height}px`;
      const margin = index === 0 ? 0 : widthElement * TAIL;
      blockElement.style.marginLeft = `-${margin}px`;
    });
  }
}
function findPuzzleContainer(group, puzzle) {
  return group.find((block2) => {
    const child = block2.getElement().firstChild;
    if (child) {
      return child === puzzle.getElement();
    }
    return false;
  });
}
const text$1 = "_text_1f3xk_1";
const block = "_block_1f3xk_14";
const dragging = "_dragging_1f3xk_14";
const puzzleFirst = "_puzzleFirst_1f3xk_27";
const puzzleInside = "_puzzleInside_1f3xk_31";
const puzzleLast = "_puzzleLast_1f3xk_35";
const classes$4 = {
  text: text$1,
  block,
  dragging,
  puzzleFirst,
  puzzleInside,
  puzzleLast
};
class Puzzle {
  constructor(image2, showOption, puzzleClickCallback, dragStartCallback, dargEndCallback) {
    __publicField(this, "elements", []);
    __publicField(this, "fixElements", []);
    __publicField(this, "image");
    __publicField(this, "showOption");
    __publicField(this, "dragging", null);
    __publicField(this, "puzzleClickCallback");
    __publicField(this, "dragStartCallback");
    __publicField(this, "dargEndCallback");
    __publicField(this, "backgroundToggle", (value) => {
      this.showOption = value;
      this.elements.forEach((puzzle) => {
        const puzzleElement = puzzle.getElement();
        puzzleElement.style.backgroundImage = value ? `url(${this.image.src})` : "none";
      });
    });
    __publicField(this, "onPuzzleClick", (event) => {
      if (event.currentTarget && event.currentTarget instanceof HTMLElement) {
        const idEl = event.currentTarget.id.split("-")[2];
        const currentPuzzle = this.elements[parseInt(idEl, 10)];
        this.puzzleClickCallback(currentPuzzle);
      }
    });
    __publicField(this, "dragStart", (event) => {
      if (event.dataTransfer && event.target && event.target instanceof HTMLElement) {
        const idEl = event.target.id.split("-")[2];
        const currentBlock = this.elements[parseInt(idEl, 10)];
        if (currentBlock) {
          this.dragging = currentBlock;
          setTimeout(() => currentBlock == null ? void 0 : currentBlock.addClass(classes$4.dragging), 0);
        }
      }
      this.dragStartCallback();
    });
    __publicField(this, "dragEnd", () => {
      if (this.dragging) {
        this.dargEndCallback(this.dragging);
        this.dragging.removeClass(classes$4.dragging);
        this.dragging = null;
      }
    });
    this.image = image2;
    this.showOption = showOption;
    this.puzzleClickCallback = puzzleClickCallback;
    this.dragStartCallback = dragStartCallback;
    this.dargEndCallback = dargEndCallback;
  }
  createPuzzle(width, height, line2, wordCount, sentence2) {
    for (let word = 0; word < wordCount; word += 1) {
      const widthElement = Math.round(width / wordCount) + wordCount * 0.1;
      this.makeElement(line2, word, wordCount, widthElement, height, sentence2[word]);
    }
  }
  makeElement(line2, word, wordCount, width, height, text2) {
    let puzzleForm = classes$4.puzzleInside;
    if (word === 0) {
      puzzleForm = classes$4.puzzleFirst;
    }
    if (word === wordCount - 1) {
      puzzleForm = classes$4.puzzleLast;
    }
    const block2 = div(
      {
        id: `bl-${line2}-${word}`,
        className: `${classes$4.block} ${puzzleForm}`,
        draggable: true,
        ondragstart: this.dragStart,
        ondragend: this.dragEnd,
        onclick: this.onPuzzleClick
      },
      span({ className: classes$4.text, textContent: text2 })
    );
    const element = block2.getElement();
    element.style.backgroundImage = this.showOption ? `url(${this.image.src})` : "none";
    element.style.backgroundPosition = `-${word * width}px -${line2 * height}px`;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.maskSize = `${width}px ${height}px`;
    this.elements.push(block2);
  }
  fixLine() {
    this.fixElements.push(this.elements);
    this.elements.forEach((block2) => {
      const blockElement = block2.getElement();
      blockElement.ondragstart = null;
      blockElement.ondragend = null;
      blockElement.onclick = null;
      blockElement.draggable = false;
    });
    this.elements = [];
  }
  showBackground() {
    this.elements.forEach((puzzle) => {
      const blockElement = puzzle.getElement();
      blockElement.style.backgroundImage = `url(${this.image.src})`;
    });
  }
  getElements() {
    return this.elements;
  }
  clearFixElements() {
    this.fixElements = [];
  }
  resize(width, height) {
    this.fixElements.forEach((line2) => {
      const countElement = line2.length;
      const widthElement2 = Math.round(width / countElement) + countElement * 0.1;
      line2.forEach((block2) => {
        const blockElement = block2.getElement();
        blockElement.style.width = `${widthElement2}px`;
        blockElement.style.height = `${height}px`;
        blockElement.style.maskSize = `${widthElement2}px ${height}px`;
      });
    });
    const elementCount = this.elements.length;
    const widthElement = Math.round(width / elementCount) + elementCount * 0.1;
    this.elements.forEach((block2) => {
      const blockElement = block2.getElement();
      blockElement.style.width = `${widthElement}px`;
      blockElement.style.height = `${height}px`;
      blockElement.style.maskSize = `${widthElement}px ${height}px`;
    });
  }
}
const statistic = "_statistic_181lv_1";
const pictureWrap = "_pictureWrap_181lv_10";
const text = "_text_181lv_18";
const author = "_author_181lv_27";
const infoWrap$1 = "_infoWrap_181lv_38";
const resultWrap = "_resultWrap_181lv_45";
const wrap$1 = "_wrap_181lv_53";
const tittleWrap = "_tittleWrap_181lv_59";
const count = "_count_181lv_63";
const sentence = "_sentence_181lv_73";
const miss = "_miss_181lv_78";
const done = "_done_181lv_82";
const classes$3 = {
  statistic,
  pictureWrap,
  text,
  author,
  infoWrap: infoWrap$1,
  resultWrap,
  wrap: wrap$1,
  tittleWrap,
  count,
  sentence,
  miss,
  done,
  "continue": "_continue_181lv_86"
};
class Statistic extends BaseComponent {
  constructor(container2, lesson2, missRounds, continueClickCallback) {
    var _a, _b;
    super({ tag: "div", className: classes$3.statistic });
    __publicField(this, "container");
    __publicField(this, "lesson");
    __publicField(this, "continueClickCallback");
    __publicField(this, "onContinueClick", () => {
      this.destroy();
      this.continueClickCallback();
    });
    this.container = container2;
    this.lesson = lesson2;
    this.continueClickCallback = continueClickCallback;
    const pictureInformation = getPictureInformation((_a = this.lesson.getCurrentLesson()) == null ? void 0 : _a.levelData);
    const resultInformation = this.getResultInformation((_b = this.lesson.getCurrentLesson()) == null ? void 0 : _b.words, missRounds);
    this.appendChild([pictureInformation, resultInformation]);
  }
  init() {
    this.container.append(this);
  }
  getResultInformation(words, missRounds) {
    const done2 = div({ className: classes$3.wrap });
    const miss2 = div({ className: classes$3.wrap });
    const elements = [];
    if (missRounds.length) {
      const missElements = fillMissRounds(missRounds);
      if (missElements.length) {
        miss2.appendChild(missElements);
        elements.push(miss2);
      }
    }
    if (words && words.length) {
      const doneRounds = words.filter((word) => !missRounds.includes(word));
      if (doneRounds.length) {
        const doneElements = fillDoneRounds(doneRounds);
        done2.appendChild(doneElements);
        elements.push(done2);
      }
    }
    const continueButton = Button({ textContent: "Continue", onClick: this.onContinueClick, className: classes$3.continue });
    elements.push(continueButton);
    const result = div({ className: classes$3.resultWrap });
    result.appendChild(elements);
    return result;
  }
}
function getPictureInformation(tittle2) {
  return div(
    { className: classes$3.pictureWrap },
    img({ src: `${URL}images/${tittle2 == null ? void 0 : tittle2.cutSrc}`, alt: tittle2 == null ? void 0 : tittle2.name, className: classes$3.picture, width: 100, height: 60 }),
    div(
      { className: classes$3.infoWrap },
      p(classes$3.text, (tittle2 == null ? void 0 : tittle2.name) || ""),
      p(classes$3.author, `${tittle2 == null ? void 0 : tittle2.author}, ${tittle2 == null ? void 0 : tittle2.year}` || "")
    )
  );
}
function fillMissRounds(missRounds) {
  const tittle2 = div(
    { className: classes$3.tittleWrap },
    p(classes$3.text, `I don't know`),
    span({ className: `${classes$3.count} ${classes$3.miss}`, textContent: `${missRounds.length}` })
  );
  const list = missRounds.map((round2) => {
    const playButton = new Play();
    playButton.setFile(round2.audioExample);
    const sentence2 = p(classes$3.text, round2.textExample);
    return div({ className: classes$3.sentence }, playButton, sentence2);
  });
  return [tittle2, ...list];
}
function fillDoneRounds(doneRounds) {
  const tittle2 = div(
    { className: classes$3.tittleWrap },
    p(classes$3.text, `I know`),
    span({ className: `${classes$3.count} ${classes$3.done}`, textContent: `${doneRounds.length}` })
  );
  const list = doneRounds.map((round2) => {
    const playButton = new Play();
    playButton.setFile(round2.audioExample);
    const sentence2 = p(classes$3.text, round2.textExample);
    return div({ className: classes$3.sentence }, playButton, sentence2);
  });
  return [tittle2, ...list];
}
const gameWrapper$1 = "_gameWrapper_15dv5_1";
const game = "_game_15dv5_1";
const puzzleContainer = "_puzzleContainer_15dv5_15";
const separator = "_separator_15dv5_23";
const picture = "_picture_15dv5_29";
const buttonsContainer = "_buttonsContainer_15dv5_33";
const hide = "_hide_15dv5_42";
const infoWrap = "_infoWrap_15dv5_47";
const infoText = "_infoText_15dv5_53";
const classes$2 = {
  gameWrapper: gameWrapper$1,
  game,
  puzzleContainer,
  separator,
  picture,
  buttonsContainer,
  hide,
  infoWrap,
  infoText
};
class PuzzleGame extends BaseComponent {
  constructor(container2, hint2, progressBar2, lessons) {
    super({ tag: "div", className: `${classes$2.gameWrapper} ${classes$2.game}` });
    __publicField(this, "container");
    __publicField(this, "puzzle");
    __publicField(this, "progressBar");
    __publicField(this, "submitButton");
    __publicField(this, "showAnswerButton");
    __publicField(this, "showStatisticButton");
    __publicField(this, "missRounds", []);
    __publicField(this, "box");
    __publicField(this, "wrap");
    __publicField(this, "isMarked", false);
    __publicField(this, "isWin", false);
    __publicField(this, "isLessonEnd", false);
    __publicField(this, "image");
    __publicField(this, "lessons");
    __publicField(this, "hint");
    __publicField(this, "sentence", []);
    __publicField(this, "backgroundToggle", (value) => {
      this.puzzle.backgroundToggle(value);
    });
    __publicField(this, "onLoadImage", () => {
      this.hint.updatePlayFile();
      this.hint.updatesTextTranslate();
      this.renderRound();
    });
    __publicField(this, "puzzleClickCallback", (currentPuzzle) => {
      if (this.isMarked) {
        this.hideMark();
      }
      if (currentPuzzle) {
        this.box.movePuzzleToFirstEmpty(currentPuzzle);
      }
      this.isComplete();
    });
    __publicField(this, "dragStartCallback", () => {
      if (this.isMarked) {
        this.hideMark();
      }
    });
    __publicField(this, "dragEndCallback", (currentBlock) => {
      this.box.movePuzzleToOverContainer(currentBlock);
      this.isComplete();
    });
    __publicField(this, "onSubmit", () => {
      if (this.isLessonEnd) {
        this.startNextLesson();
      } else if (!this.isWin) {
        this.checkAnswer();
      } else {
        this.startNewRound();
      }
    });
    __publicField(this, "showAnswer", () => {
      this.showAnswerButton.addClass(classes$2.hide);
      const round2 = this.lessons.getCurrentRound();
      if (round2) {
        this.missRounds.push(round2);
      }
      this.box.showAnswer(this.puzzle.getElements());
      this.isWin = true;
      this.hint.showAllHints();
      this.puzzle.showBackground();
      this.fixLine();
      this.submitButton.getElement().textContent = "Continue";
      this.showCheck();
    });
    __publicField(this, "showStatistic", () => {
      this.removeClass(classes$2.game);
      this.hint.hide();
      this.progressBar.hide();
      this.clear();
      this.clearChild();
      const statisticModal = new Statistic(this.container, this.lessons, this.missRounds, this.continueClickCallback);
      statisticModal.init();
    });
    __publicField(this, "continueClickCallback", () => {
      this.showStatisticButton.addClass(classes$2.hide);
      this.addClass(classes$2.game);
      this.hint.show();
      this.progressBar.show();
      this.appendChild([
        this.wrap.picture,
        this.wrap.separator,
        this.wrap.puzzle,
        this.wrap.buttons
      ]);
      this.startNextLesson();
      this.container.getElement().append(this.element);
    });
    __publicField(this, "chooseLessonCallback", () => {
      this.startNewLesson();
    });
    __publicField(this, "resizeWindow", () => {
      const size = this.getActualSize();
      this.box.resize(size.width, size.height);
      this.puzzle.resize(size.width, size.height);
    });
    this.container = container2;
    this.lessons = lessons;
    this.hint = hint2;
    this.progressBar = progressBar2;
    this.progressBar.setChooseLessonCallback(this.chooseLessonCallback);
    this.wrap = {
      picture: new BaseComponent({ tag: "div", className: `${classes$2.puzzleContainer}`, id: "picture" }),
      puzzle: new BaseComponent({ tag: "div", className: `${classes$2.puzzleContainer}`, id: "puzzle" }),
      buttons: new BaseComponent({ tag: "div", className: `${classes$2.buttonsContainer}` }),
      separator: div({ className: classes$2.separator })
    };
    this.box = new Box(this.wrap.picture, this.wrap.puzzle);
    this.submitButton = Button({ textContent: "Check", onClick: this.onSubmit, className: classes$2.hide });
    this.showAnswerButton = Button({ textContent: "Show answer", onClick: this.showAnswer });
    this.showStatisticButton = Button({ textContent: "Statistic", onClick: this.showStatistic, className: classes$2.hide });
    this.wrap.buttons.appendChild([this.showAnswerButton, this.showStatisticButton, this.submitButton]);
    this.appendChild([
      this.wrap.picture,
      this.wrap.separator,
      this.wrap.puzzle,
      this.wrap.buttons
    ]);
    this.image = new Image();
    this.puzzle = new Puzzle(
      this.image,
      this.hint.options.getOptions(HintName.onPicture),
      this.puzzleClickCallback,
      this.dragStartCallback,
      this.dragEndCallback
    );
    const currentLesson = this.lessons.getCurrentLesson();
    if (currentLesson) {
      this.image.onload = this.onLoadImage;
      this.image.src = `${URL}images/${currentLesson.levelData.imageSrc}`;
      this.sentence = this.lessons.getSentence().split(" ");
    }
    this.container.getElement().append(this.element);
    window.addEventListener("resize", this.resizeWindow);
  }
  renderRound() {
    if (this.lessons.getCountRound() > 0) {
      this.fixLine();
    }
    this.hideCheck();
    const line2 = this.lessons.getCountRound();
    const wordCount = this.sentence.length;
    const size = this.getActualSize();
    this.box.renderRound(size.width, size.height, line2, wordCount);
    this.puzzle.createPuzzle(size.width, size.height, line2, wordCount, this.sentence);
    this.shufflePuzzle();
  }
  fixLine() {
    this.puzzle.fixLine();
    this.box.fixLine();
  }
  shufflePuzzle() {
    var _a;
    const blocks = [...this.puzzle.getElements()];
    for (let i = this.box.source.length - 1; i >= 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * blocks.length);
      const block2 = blocks[randomIndex];
      blocks.splice(randomIndex, 1);
      if (block2 && this.box.source[i]) {
        (_a = this.box.source[i]) == null ? void 0 : _a.appendChild([block2]);
      }
    }
  }
  isComplete() {
    if (this.box.isComplete()) {
      this.showCheck();
    } else {
      this.hideCheck();
    }
  }
  showCheck() {
    this.submitButton.removeClass(classes$2.hide);
  }
  hideCheck() {
    this.submitButton.addClass(classes$2.hide);
  }
  markAnswer() {
    this.isMarked = true;
    this.isWin = this.box.isCorrectAnswer();
  }
  startNextLesson() {
    this.lessons.setNextLevel();
    this.startNewLesson();
  }
  startNewLesson() {
    var _a;
    this.fixLine();
    this.progressBar.updateInfo();
    this.hint.startNewLesson();
    this.puzzle.clearFixElements();
    this.box.clearFixElements();
    this.sentence = this.lessons.getSentence().split(" ");
    this.image.src = `${URL}images/${(_a = this.lessons.getCurrentLesson()) == null ? void 0 : _a.levelData.imageSrc}`;
    this.submitButton.getElement().textContent = "Check";
    this.showAnswerButton.removeClass(classes$2.hide);
    this.showStatisticButton.addClass(classes$2.hide);
    this.wrap.picture.destroyChild();
    this.wrap.picture.clear();
    this.wrap.picture.clearChild();
    this.wrap.separator.destroyChild();
    this.isLessonEnd = false;
    this.isWin = false;
    this.missRounds = [];
  }
  checkAnswer() {
    this.markAnswer();
    if (this.isWin) {
      this.puzzle.showBackground();
      this.fixLine();
      this.hint.showAllHints();
      this.showAnswerButton.addClass(classes$2.hide);
      this.submitButton.getElement().textContent = "Continue";
    }
  }
  startNewRound() {
    this.hideMark();
    this.fixLine();
    this.lessons.setNextRound();
    this.hint.startNewLesson();
    this.showAnswerButton.removeClass(classes$2.hide);
    this.sentence = this.lessons.getSentence().split(" ");
    if (this.lessons.getCountRound() < this.lessons.getLessonLength()) {
      this.renderRound();
      this.submitButton.getElement().textContent = "Check";
      this.isWin = false;
    } else {
      this.showPictureInformation();
      this.lessons.addToHistory();
      this.submitButton.getElement().textContent = "Next lesson";
      this.showStatisticButton.removeClass(classes$2.hide);
      this.showAnswerButton.addClass(classes$2.hide);
      this.isLessonEnd = true;
    }
  }
  showPictureInformation() {
    var _a, _b, _c;
    this.wrap.picture.getElement().style.backgroundImage = `url(${this.image.src})`;
    this.wrap.separator.appendChild([
      div(
        { className: classes$2.infoWrap },
        span({ className: classes$2.infoText, textContent: `Author: ${(_a = this.lessons.getCurrentLesson()) == null ? void 0 : _a.levelData.author}` }),
        span({ className: classes$2.infoText, textContent: `Name: ${(_b = this.lessons.getCurrentLesson()) == null ? void 0 : _b.levelData.name}` }),
        span({ className: classes$2.infoText, textContent: `${(_c = this.lessons.getCurrentLesson()) == null ? void 0 : _c.levelData.year}` })
      )
    ]);
    this.box.showPicture();
  }
  hideMark() {
    this.isMarked = false;
    this.box.hideMark();
    if (this.isWin) {
      this.submitButton.getElement().textContent = "Check";
      this.isWin = false;
    }
  }
  getActualSize() {
    const windowWidth = window.innerWidth;
    const containerWidth = windowWidth - windowWidth * 0.02;
    const pictureWidth = Math.min(containerWidth - containerWidth * 0.03, this.image.width);
    this.wrap.picture.getElement().style.width = `${pictureWidth}px`;
    this.wrap.puzzle.getElement().style.width = `${pictureWidth}px`;
    const pictureHeight = this.image.height / this.image.width * pictureWidth;
    const partWidth = pictureWidth;
    const partHeight = Math.round(pictureHeight / this.lessons.getLessonLength());
    return { height: partHeight, width: partWidth };
  }
}
const gamePage = "_gamePage_1dhgm_1";
const menuWrapper = "_menuWrapper_1dhgm_11";
const menu = "_menu_1dhgm_11";
const main = "_main_1dhgm_27";
const wrap = "_wrap_1dhgm_32";
const progressBarContainer = "_progressBarContainer_1dhgm_38";
const hintContainer = "_hintContainer_1dhgm_42";
const gameWrapper = "_gameWrapper_1dhgm_46";
const puzzleGameContainer = "_puzzleGameContainer_1dhgm_58";
const classes$1 = {
  gamePage,
  menuWrapper,
  menu,
  main,
  wrap,
  progressBarContainer,
  hintContainer,
  gameWrapper,
  puzzleGameContainer
};
class Game extends BaseComponent {
  constructor(container2, options2, logoutCallback, lessons) {
    super({ tag: "div", className: classes$1.gamePage });
    __publicField(this, "container");
    __publicField(this, "options");
    __publicField(this, "header");
    __publicField(this, "progressBar");
    __publicField(this, "progressBarContainer");
    __publicField(this, "hintContainer");
    __publicField(this, "puzzleGameContainer");
    __publicField(this, "hint");
    __publicField(this, "puzzleGame");
    __publicField(this, "lessons");
    this.container = container2;
    this.options = options2;
    this.lessons = lessons;
    this.header = new Header(logoutCallback);
    this.puzzleGameContainer = div({ className: classes$1.gameWrapper });
    this.progressBarContainer = div({ className: classes$1.progressBarContainer });
    this.hintContainer = div({ className: classes$1.hintContainer });
    this.progressBar = new ProgressBar(this.progressBarContainer, this.lessons);
    this.puzzleGameContainer.append(div({ className: classes$1.wrap }, this.progressBarContainer, this.hintContainer));
    this.hint = new Hint(this.hintContainer, this.options, this.lessons);
    this.puzzleGame = new PuzzleGame(this.puzzleGameContainer, this.hint, this.progressBar, this.lessons);
    this.hint.setOnPictureCallback(this.puzzleGame.backgroundToggle);
  }
  showGame() {
    this.container.append(this.element);
    this.appendChild([
      this.header,
      div(
        { className: classes$1.main },
        this.puzzleGameContainer
      )
    ]);
  }
}
class Store {
  constructor() {
    __publicField(this, "storage");
    __publicField(this, "storeKey");
    this.storage = window.localStorage;
    this.storeKey = STORE_NAME;
  }
  getUser() {
    const data = this.get(STORE_USER);
    if (isUserType(data)) {
      return data;
    }
    return null;
  }
  setUser(user2) {
    const data = {
      firstName: user2.firstName,
      lastName: user2.lastName
    };
    this.set(STORE_USER, data);
  }
  getOptions() {
    const data = this.get(STORE_OPTIONS);
    if (isOptionsType(data)) {
      return data;
    }
    return null;
  }
  setOptions(options2) {
    this.set(STORE_OPTIONS, options2);
  }
  getLastLesson() {
    const data = this.get(STORE_LAST_LESSON);
    if (typeof data === "string") {
      return data;
    }
    return null;
  }
  setLastLesson(value) {
    this.set(STORE_LAST_LESSON, value);
  }
  getHistory() {
    const data = this.get(STORE_HISTORY);
    if (Array.isArray(data) && isLessonType(data)) {
      return data;
    }
    return [];
  }
  setHistory(value) {
    this.set(STORE_HISTORY, value);
  }
  removeUser() {
    this.storage.removeItem(`${this.storeKey}-${STORE_USER}`);
    this.storage.removeItem(`${this.storeKey}-${STORE_OPTIONS}`);
    this.storage.removeItem(`${this.storeKey}-${STORE_LAST_LESSON}`);
    this.storage.removeItem(`${this.storeKey}-${STORE_HISTORY}`);
  }
  set(key, value) {
    this.storage.setItem(
      `${this.storeKey}-${key}`,
      JSON.stringify(value)
    );
  }
  get(key) {
    try {
      const storedDataString = this.storage.getItem(
        `${this.storeKey}-${key}`
      );
      if (storedDataString) {
        return JSON.parse(storedDataString);
      }
      return null;
    } catch (err) {
      return null;
    }
  }
}
class User {
  constructor(store2) {
    __publicField(this, "firstName", "");
    __publicField(this, "lastName", "");
    __publicField(this, "store");
    this.store = store2;
    const savedUser = this.store.getUser();
    if (savedUser) {
      this.setName(savedUser.firstName, savedUser.lastName, false);
    }
  }
  setName(firstName, lastName, toStore = true) {
    this.firstName = firstName;
    this.lastName = lastName;
    if (toStore) {
      this.store.setUser(this);
    }
  }
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  isEmpty() {
    return this.firstName === "" && this.lastName === "";
  }
  clear() {
    this.firstName = "";
    this.lastName = "";
  }
}
class Options {
  constructor(store2) {
    __publicField(this, "items", {
      onSound: true,
      onTranslate: true,
      onPicture: true
    });
    __publicField(this, "store");
    this.store = store2;
    const savedOptions = this.store.getOptions();
    if (savedOptions) {
      this.items.onSound = savedOptions.onSound;
      this.items.onTranslate = savedOptions.onTranslate;
      this.items.onPicture = savedOptions.onPicture;
    }
  }
  setOption(option, value) {
    this.items[option] = value;
    this.store.setOptions(this.items);
  }
  getFullOptions() {
    return this.items;
  }
  getOptions(option) {
    return this.items[option];
  }
}
const mockData = [
  {
    levelData: {
      id: "1_01",
      name: "Stag Hunt",
      imageSrc: "level1/deerhunt.jpg",
      cutSrc: "level1/cut/deerhunt.jpg",
      author: "Niccolò dell'",
      year: "1550-52"
    },
    words: [
      {
        audioExample: "files/01_0001_example.mp3",
        textExample: "The students agree they have too much homework",
        textExampleTranslate: "Студенты согласны, что у них слишком много домашней работы",
        id: 1,
        word: "agree",
        wordTranslate: "согласна"
      },
      {
        audioExample: "files/01_0003_example.mp3",
        textExample: "They arrived at school at 7 a.m",
        textExampleTranslate: "Они прибыли в школу в 7 часов утра",
        id: 3,
        word: "arrive",
        wordTranslate: "прибыть"
      },
      {
        audioExample: "files/01_0004_example.mp3",
        textExample: "Is your birthday in August?",
        textExampleTranslate: "У тебя день рождения в августе?",
        id: 4,
        word: "August",
        wordTranslate: "август"
      },
      {
        audioExample: "files/01_0005_example.mp3",
        textExample: "There is a small boat on the lake",
        textExampleTranslate: "На озере есть маленькая лодка",
        id: 5,
        word: "boat",
        wordTranslate: "лодка"
      },
      {
        audioExample: "files/01_0006_example.mp3",
        textExample: "I ate eggs for breakfast",
        textExampleTranslate: "Я ел яйца на завтрак",
        id: 6,
        word: "breakfast",
        wordTranslate: "завтрак"
      },
      {
        audioExample: "files/01_0007_example.mp3",
        textExample: "I brought my camera on my vacation",
        textExampleTranslate: "Я принес свою камеру в отпуск",
        id: 7,
        word: "camera",
        wordTranslate: "камера"
      },
      {
        audioExample: "files/01_0008_example.mp3",
        textExample: "The capital of the United States is Washington, D.C",
        textExampleTranslate: "Столица Соединенных Штатов - Вашингтон, округ Колумбия",
        id: 8,
        word: "capital",
        wordTranslate: "столица"
      },
      {
        audioExample: "files/01_0009_example.mp3",
        textExample: "Did you catch the ball during the baseball game?",
        textExampleTranslate: "Вы поймали мяч во время игры в бейсбол?",
        id: 9,
        word: "catch",
        wordTranslate: "поймать"
      },
      {
        audioExample: "files/01_0010_example.mp3",
        textExample: "People feed ducks at the lake",
        textExampleTranslate: "Люди кормят уток у озера",
        id: 10,
        word: "duck",
        wordTranslate: "утка"
      },
      {
        audioExample: "files/01_0011_example.mp3",
        textExample: "The woman enjoys riding her bicycle",
        textExampleTranslate: "Женщина любит кататься на велосипеде",
        id: 11,
        word: "enjoy",
        wordTranslate: "наслаждаться"
      }
    ]
  },
  {
    levelData: {
      id: "1_02",
      name: "Deer beside a Lake",
      imageSrc: "level1/deerlake.jpg",
      cutSrc: "level1/cut/deerlake.jpg",
      author: "Carl Frederik",
      year: "1888"
    },
    words: [
      {
        audioExample: "files/01_0012_example.mp3",
        textExample: "I will invite my friends to my birthday party",
        textExampleTranslate: "Я приглашаю своих друзей на мой день рождения",
        id: 12,
        word: "invite",
        wordTranslate: "пригласить"
      },
      {
        audioExample: "files/01_0013_example.mp3",
        textExample: "I love my family very much",
        textExampleTranslate: "Я очень люблю свою семью",
        id: 13,
        word: "love",
        wordTranslate: "любовь"
      },
      {
        audioExample: "files/01_0014_example.mp3",
        textExample: "January is the first month of the year",
        textExampleTranslate: "январь - первый месяц года",
        id: 14,
        word: "month",
        wordTranslate: "месяц"
      },
      {
        audioExample: "files/01_0015_example.mp3",
        textExample: "They will travel to Argentina this summer",
        textExampleTranslate: "Этим летом они отправятся в Аргентину",
        id: 15,
        word: "travel",
        wordTranslate: "путешествовать"
      },
      {
        audioExample: "files/01_0016_example.mp3",
        textExample: "My typical breakfast is toast and eggs",
        textExampleTranslate: "Мой типичный завтрак - тост и яйца",
        id: 16,
        word: "typical",
        wordTranslate: "типичный"
      },
      {
        audioExample: "files/01_0017_example.mp3",
        textExample: "She wants to visit her grandmother",
        textExampleTranslate: "Она хочет навестить свою бабушку",
        id: 17,
        word: "visit",
        wordTranslate: "посещение"
      },
      {
        audioExample: "files/01_0018_example.mp3",
        textExample: "Today’s weather is rainy and cloudy",
        textExampleTranslate: "Сегодня погода дождливая и облачная",
        id: 18,
        word: "weather",
        wordTranslate: "погода"
      },
      {
        audioExample: "files/01_0019_example.mp3",
        textExample: "What are you doing next week?",
        textExampleTranslate: "Что ты делаешь на следующей неделе?",
        id: 19,
        word: "week",
        wordTranslate: "неделя"
      },
      {
        audioExample: "files/01_0020_example.mp3",
        textExample: "The store carried both red and white wine",
        textExampleTranslate: "В магазине было красное и белое вино",
        id: 20,
        word: "wine",
        wordTranslate: "вино"
      },
      {
        audioExample: "files/02_0021_example.mp3",
        textExample: "Riding in the rough water was an adventure",
        textExampleTranslate: "Езда в бурной воде была приключением",
        id: 21,
        word: "adventure",
        wordTranslate: "приключение"
      }
    ]
  },
  {
    levelData: {
      id: "1_03",
      name: "Country Road with Cypresses",
      imageSrc: "level1/abbati2.jpg",
      cutSrc: "level1/cut/abbati2.jpg",
      author: "ABBATI, Giuseppe",
      year: "1860"
    },
    words: [
      {
        audioExample: "files/02_0022_example.mp3",
        textExample: "The boy approached his school",
        textExampleTranslate: "Мальчик приблизился к своей школе",
        id: 22,
        word: "approach",
        wordTranslate: "подходить"
      },
      {
        audioExample: "files/02_0023_example.mp3",
        textExample: "The baby carefully climbed down the stairs",
        textExampleTranslate: "Малыш осторожно спускался по лестнице",
        id: 23,
        word: "carefully",
        wordTranslate: "внимательно"
      },
      {
        audioExample: "files/02_0024_example.mp3",
        textExample: "The scientist mixed the chemicals",
        textExampleTranslate: "Ученый смешал химикаты",
        id: 24,
        word: "chemical",
        wordTranslate: "химический"
      },
      {
        audioExample: "files/02_0025_example.mp3",
        textExample: "She created an igloo from blocks of snow",
        textExampleTranslate: "Она создала иглу из снежных глыб",
        id: 25,
        word: "create",
        wordTranslate: "создайте"
      },
      {
        audioExample: "files/02_0027_example.mp3",
        textExample: "The student did an experiment in science class",
        textExampleTranslate: "Студент сделал эксперимент в классе науки",
        id: 27,
        word: "experiment",
        wordTranslate: "эксперимент"
      },
      {
        audioExample: "files/02_0028_example.mp3",
        textExample: "I killed the fly",
        textExampleTranslate: "Я убил муху",
        id: 28,
        word: "kill",
        wordTranslate: "убийство"
      },
      {
        audioExample: "files/02_0029_example.mp3",
        textExample: "My mother works in a laboratory",
        textExampleTranslate: "Моя мама работает в лаборатории",
        id: 29,
        word: "laboratory",
        wordTranslate: "лаборатория"
      },
      {
        audioExample: "files/02_0030_example.mp3",
        textExample: "The sound of her laugh filled the room",
        textExampleTranslate: "Звук ее смеха заполнил комнату",
        id: 30,
        word: "laugh",
        wordTranslate: "смех"
      },
      {
        audioExample: "files/02_0032_example.mp3",
        textExample: "The boy became nervous when he heard the news",
        textExampleTranslate: "Мальчик стал нервным, когда услышал новости",
        id: 32,
        word: "nervous",
        wordTranslate: "нервная"
      },
      {
        audioExample: "files/02_0033_example.mp3",
        textExample: "The crying baby made a loud noise",
        textExampleTranslate: "Плачущий ребенок издал громкий шум",
        id: 33,
        word: "noise",
        wordTranslate: "шум"
      }
    ]
  },
  {
    levelData: {
      id: "1_04",
      name: "Fireworks in Naples",
      imageSrc: "level1/firework.jpg",
      cutSrc: "level1/cut/firework.jpg",
      author: "ACHENBACH, Oswald",
      year: "1875"
    },
    words: [
      {
        audioExample: "files/02_0034_example.mp3",
        textExample: "His afternoon work project was to paint the room green",
        textExampleTranslate: "Его дневной рабочий проект должен был покрасить комнату в зеленый цвет",
        id: 34,
        word: "project",
        wordTranslate: "проект"
      },
      {
        audioExample: "files/02_0036_example.mp3",
        textExample: "The two boys were sharing a secret",
        textExampleTranslate: "Два мальчика делились секретом",
        id: 36,
        word: "secret",
        wordTranslate: "секрет"
      },
      {
        audioExample: "files/02_0038_example.mp3",
        textExample: "The two friends smelled the flower",
        textExampleTranslate: "Два друга понюхали цветок",
        id: 38,
        word: "smell",
        wordTranslate: "запах"
      },
      {
        audioExample: "files/02_0039_example.mp3",
        textExample: "The way he treated his classmate was terrible",
        textExampleTranslate: "То, как он относился к своему однокласснику, было ужасно",
        id: 39,
        word: "terrible",
        wordTranslate: "ужасный"
      },
      {
        audioExample: "files/02_0040_example.mp3",
        textExample: "Business was worse this month than last month",
        textExampleTranslate: "Бизнес был хуже в этом месяце, чем в прошлом месяце",
        id: 40,
        word: "worse",
        wordTranslate: "хуже"
      },
      {
        audioExample: "files/03_0041_example.mp3",
        textExample: "The alien came in peace",
        textExampleTranslate: "пришелец пришел с миром",
        id: 41,
        word: "alien",
        wordTranslate: "инопланетянин"
      },
      {
        audioExample: "files/03_0042_example.mp3",
        textExample: "There was a red apple among the green ones",
        textExampleTranslate: "Среди зеленых было красное яблоко",
        id: 42,
        word: "among",
        wordTranslate: "среди"
      },
      {
        audioExample: "files/03_0043_example.mp3",
        textExample: "We used a chart to see how we had improved",
        textExampleTranslate: "Мы использовали график, чтобы увидеть, как мы улучшили",
        id: 43,
        word: "chart",
        wordTranslate: "диаграмма"
      },
      {
        audioExample: "files/03_0044_example.mp3",
        textExample: "The sky was filled with white clouds",
        textExampleTranslate: "Небо было наполнено белыми облаками",
        id: 44,
        word: "cloud",
        wordTranslate: "облако"
      },
      {
        audioExample: "files/03_0047_example.mp3",
        textExample: "Since he failed to get the job, he was sad",
        textExampleTranslate: "Так как он не смог получить работу, ему было грустно",
        id: 47,
        word: "fail",
        wordTranslate: "потерпеть поражение"
      }
    ]
  },
  {
    levelData: {
      id: "1_05",
      name: "The Ninth Wave",
      imageSrc: "level1/9th_wave.jpg",
      cutSrc: "level1/cut/9th_wave.jpg",
      author: "AIVAZOVSKY, Ivan Konstantinovich",
      year: "1850"
    },
    words: [
      {
        audioExample: "files/03_0048_example.mp3",
        textExample: "I managed to get good grades on my report card",
        textExampleTranslate: "Мне удалось получить хорошие оценки на моем табеле",
        id: 48,
        word: "grade",
        wordTranslate: "класс"
      },
      {
        audioExample: "files/03_0049_example.mp3",
        textExample: "He ate the carrot instead of the ice cream",
        textExampleTranslate: "Он съел морковку вместо мороженого",
        id: 49,
        word: "instead",
        wordTranslate: "вместо"
      },
      {
        audioExample: "files/03_0050_example.mp3",
        textExample: "The library at school is full of books",
        textExampleTranslate: "Библиотека в школе полна книг",
        id: 50,
        word: "library",
        wordTranslate: "библиотека"
      },
      {
        audioExample: "files/03_0051_example.mp3",
        textExample: "I took this photograph with my cell phone",
        textExampleTranslate: "Я сделал эту фотографию на свой мобильный",
        id: 51,
        word: "photograph",
        wordTranslate: "фотография"
      },
      {
        audioExample: "files/03_0052_example.mp3",
        textExample: "Saturn is the planet with the ring around it",
        textExampleTranslate: "Сатурн - планета с кольцом вокруг него",
        id: 52,
        word: "planet",
        wordTranslate: "планета"
      },
      {
        audioExample: "files/03_0053_example.mp3",
        textExample: "Karen had trouble writing her report",
        textExampleTranslate: "Карен не могла написать свой отчет",
        id: 53,
        word: "report",
        wordTranslate: "отчет"
      },
      {
        audioExample: "files/03_0054_example.mp3",
        textExample: "He had to read several books for class",
        textExampleTranslate: "Он должен был прочитать несколько книг для класса",
        id: 54,
        word: "several",
        wordTranslate: "несколько"
      },
      {
        audioExample: "files/03_0056_example.mp3",
        textExample: "All the students could easily solve the math problem",
        textExampleTranslate: "Все ученики могли легко решить математическую задачу",
        id: 56,
        word: "solve",
        wordTranslate: "решать"
      },
      {
        audioExample: "files/03_0057_example.mp3",
        textExample: "I was surprised when my friends suddenly shouted, “Happy birthday!”",
        textExampleTranslate: "Я был удивлен, когда мои друзья вдруг закричали: 'С днем рождения!'",
        id: 57,
        word: "suddenly",
        wordTranslate: "вдруг, внезапно"
      },
      {
        audioExample: "files/03_0058_example.mp3",
        textExample: "I suppose I should go home now",
        textExampleTranslate: "Полагаю, мне пора домой",
        id: 58,
        word: "suppose",
        wordTranslate: "предположим"
      }
    ]
  },
  {
    levelData: {
      id: "1_06",
      name: "View of Campo Santi Giovanni e Paolo",
      imageSrc: "level1/campo.jpg",
      cutSrc: "level1/cut/campo.jpg",
      author: "ALBOTTO, Francesco",
      year: "1745"
    },
    words: [
      {
        audioExample: "files/03_0059_example.mp3",
        textExample: "Henry could not understand the message",
        textExampleTranslate: "Генри не мог понять сообщение",
        id: 59,
        word: "understand",
        wordTranslate: "понимаю"
      },
      {
        audioExample: "files/03_0060_example.mp3",
        textExample: "Michael likes to view himself in the mirror",
        textExampleTranslate: "Михаилу нравится видеть себя в зеркале",
        id: 60,
        word: "view",
        wordTranslate: "посмотреть"
      },
      {
        audioExample: "files/04_0062_example.mp3",
        textExample: "Avoid the broken bottle on the floor",
        textExampleTranslate: "Избегайте разбитой бутылки на полу",
        id: 62,
        word: "avoid",
        wordTranslate: "избегать"
      },
      {
        audioExample: "files/04_0063_example.mp3",
        textExample: "She always behaves well when her father is around",
        textExampleTranslate: "Она всегда ведет себя хорошо, когда ее отец рядом",
        id: 63,
        word: "behave",
        wordTranslate: "вести себя"
      },
      {
        audioExample: "files/04_0064_example.mp3",
        textExample: "A nice warm bath makes me feel so calm",
        textExampleTranslate: "Хорошая теплая ванна заставляет меня чувствовать себя так спокойно",
        id: 64,
        word: "calm",
        wordTranslate: "спокойный"
      },
      {
        audioExample: "files/04_0065_example.mp3",
        textExample: "I was filled with concern after reading the newspaper",
        textExampleTranslate: "Я был полон беспокойства после прочтения газеты",
        id: 65,
        word: "concern",
        wordTranslate: "беспокойство"
      },
      {
        audioExample: "files/04_0066_example.mp3",
        textExample: "The baby looked very content sitting on the floor",
        textExampleTranslate: "Ребенок выглядел очень довольным, сидя на полу",
        id: 66,
        word: "content",
        wordTranslate: "содержание"
      },
      {
        audioExample: "files/04_0067_example.mp3",
        textExample: "I expect the bus to be here very soon",
        textExampleTranslate: "Я ожидаю, что автобус будет здесь очень скоро",
        id: 67,
        word: "expect",
        wordTranslate: "ожидать"
      },
      {
        audioExample: "files/04_0069_example.mp3",
        textExample: "Smoking is a bad habit that can kill you",
        textExampleTranslate: "Курение - это вредная привычка, которая может тебя убить",
        id: 69,
        word: "habit",
        wordTranslate: "привычка"
      },
      {
        audioExample: "files/04_0070_example.mp3",
        textExample: "My teacher instructs us in several subjects",
        textExampleTranslate: "Мой учитель учит нас нескольким предметам",
        id: 70,
        word: "instruct",
        wordTranslate: "инструктирует"
      }
    ]
  },
  {
    levelData: {
      id: "1_07",
      name: "San Giuseppe di Castello",
      imageSrc: "level1/giuseppe.jpg",
      cutSrc: "level1/cut/giuseppe.jpg",
      author: "ALBOTTO, Francesco",
      year: "1745"
    },
    words: [
      {
        audioExample: "files/04_0072_example.mp3",
        textExample: "He spent all his money. There is none left",
        textExampleTranslate: "Он потратил все свои деньги. Там ничего не осталось",
        id: 72,
        word: "none",
        wordTranslate: "никто"
      },
      {
        audioExample: "files/04_0076_example.mp3",
        textExample: "My lawyer will represent me in court",
        textExampleTranslate: "Мой адвокат будет представлять меня в суде",
        id: 76,
        word: "represent",
        wordTranslate: "представлять"
      },
      {
        audioExample: "files/04_0077_example.mp3",
        textExample: "When people shake hands, it usually means they agree",
        textExampleTranslate: "Когда люди пожимают друг другу руки, это обычно означает, что они согласны",
        id: 77,
        word: "shake",
        wordTranslate: "трясти"
      },
      {
        audioExample: "files/04_0078_example.mp3",
        textExample: "I like to spread butter on my toast",
        textExampleTranslate: "Мне нравится разливать масло по моему тосту",
        id: 78,
        word: "spread",
        wordTranslate: "распространение"
      },
      {
        audioExample: "files/04_0079_example.mp3",
        textExample: "My dog and I strolled through the park today",
        textExampleTranslate: "Сегодня мы с собакой прогулялись по парку",
        id: 79,
        word: "stroll",
        wordTranslate: "прогулка"
      },
      {
        audioExample: "files/04_0080_example.mp3",
        textExample: "There are only a few houses in my village",
        textExampleTranslate: "В моей деревне всего несколько домов",
        id: 80,
        word: "village",
        wordTranslate: "деревня"
      },
      {
        audioExample: "files/05_0082_example.mp3",
        textExample: "My mom and dad are adults",
        textExampleTranslate: "Мои мама и папа взрослые",
        id: 82,
        word: "adult",
        wordTranslate: "взрослый"
      },
      {
        audioExample: "files/05_0083_example.mp3",
        textExample: "She died at the age of 80",
        textExampleTranslate: "Она умерла в возрасте 80 лет",
        id: 83,
        word: "age",
        wordTranslate: "возраст"
      },
      {
        audioExample: "files/05_0084_example.mp3",
        textExample: "She is unhappy because she had a bad day",
        textExampleTranslate: "Она несчастна, потому что у нее был плохой день",
        id: 84,
        word: "bad",
        wordTranslate: "плохой"
      },
      {
        audioExample: "files/05_0086_example.mp3",
        textExample: "He rides his bike to school every day",
        textExampleTranslate: "Он ездит на велосипеде в школу каждый день",
        id: 86,
        word: "bike",
        wordTranslate: "велосипед"
      }
    ]
  },
  {
    levelData: {
      id: "1_08",
      name: "View of St.Petersburg",
      imageSrc: "level1/view_stp.jpg",
      cutSrc: "level1/cut/view_stp.jpg",
      author: "ALEKSEYEV, Fyodor Yakovlevich",
      year: "1795"
    },
    words: [
      {
        audioExample: "files/05_0088_example.mp3",
        textExample: "You should go to the doctor when you are sick",
        textExampleTranslate: "Вы должны идти к врачу, когда вы больны",
        id: 88,
        word: "doctor",
        wordTranslate: "доктор"
      },
      {
        audioExample: "files/05_0089_example.mp3",
        textExample: "Did you sleep during the movie?",
        textExampleTranslate: "Ты спал во время фильма?",
        id: 89,
        word: "during",
        wordTranslate: "в течение"
      },
      {
        audioExample: "files/05_0090_example.mp3",
        textExample: "Football is a popular sport in the United States",
        textExampleTranslate: "Футбол - популярный вид спорта в Соединенных Штатах",
        id: 90,
        word: "football",
        wordTranslate: "футбол"
      },
      {
        audioExample: "files/05_0091_example.mp3",
        textExample: "We had a fun time at the birthday party",
        textExampleTranslate: "Мы весело провели время на вечеринке по случаю дня рождения",
        id: 91,
        word: "fun",
        wordTranslate: "веселье"
      },
      {
        audioExample: "files/05_0092_example.mp3",
        textExample: "Let’s play a board game tonight",
        textExampleTranslate: "Давай поиграем в настольную игру сегодня вечером",
        id: 92,
        word: "game",
        wordTranslate: "игра"
      },
      {
        audioExample: "files/05_0093_example.mp3",
        textExample: "My heart beats fast when I am nervous",
        textExampleTranslate: "Мое сердце бьется быстро, когда я нервничаю",
        id: 93,
        word: "heart",
        wordTranslate: "сердце"
      },
      {
        audioExample: "files/05_0094_example.mp3",
        textExample: "People play golf in nice weather",
        textExampleTranslate: "Люди играют в гольф в хорошую погоду",
        id: 94,
        word: "golf",
        wordTranslate: "гольф"
      },
      {
        audioExample: "files/05_0096_example.mp3",
        textExample: "My grandfather had a long life",
        textExampleTranslate: "У моего деда была долгая жизнь",
        id: 96,
        word: "life",
        wordTranslate: "жизнь"
      },
      {
        audioExample: "files/05_0097_example.mp3",
        textExample: "A marathon is 42.2 kilometers",
        textExampleTranslate: "Марафон 42,2 километра",
        id: 97,
        word: "kilometer",
        wordTranslate: "километр"
      },
      {
        audioExample: "files/05_0098_example.mp3",
        textExample: "He often goes to bed early during the week",
        textExampleTranslate: "Он часто ложится спать рано в течение недели",
        id: 98,
        word: "often",
        wordTranslate: "довольно часто"
      }
    ]
  },
  {
    levelData: {
      id: "1_09",
      name: "Landscape with the Finding of Moses",
      imageSrc: "level1/landmose.jpg",
      cutSrc: "level1/cut/landmose.jpg",
      author: "ALLEGRAIN, Etienne",
      year: "second half of XVII century"
    },
    words: [
      {
        audioExample: "files/05_0099_example.mp3",
        textExample: "We have plenty of fruit, so help yourself",
        textExampleTranslate: "У нас много фруктов, так что помогите себе",
        id: 99,
        word: "plenty",
        wordTranslate: "много"
      },
      {
        audioExample: "files/05_0100_example.mp3",
        textExample: "I gained weight because I ate a lot of pizza",
        textExampleTranslate: "Я набрал вес, потому что я ел много пиццы",
        id: 100,
        word: "weight",
        wordTranslate: "вес"
      },
      {
        audioExample: "files/06_0101_example.mp3",
        textExample: "They moved apart and then came back together",
        textExampleTranslate: "Они раздвинулись, а затем вернулись вместе",
        id: 101,
        word: "apart",
        wordTranslate: "отдельно"
      },
      {
        audioExample: "files/06_0104_example.mp3",
        textExample: "I was completely wrong",
        textExampleTranslate: "Я был совершенно неправ",
        id: 104,
        word: "completely",
        wordTranslate: "полностью"
      },
      {
        audioExample: "files/06_0107_example.mp3",
        textExample: "It is very fashionable to wear a hat",
        textExampleTranslate: "Очень модно носить шляпу",
        id: 107,
        word: "fashionable",
        wordTranslate: "модно"
      },
      {
        audioExample: "files/06_0108_example.mp3",
        textExample: "He has travelled widely in foreign countries",
        textExampleTranslate: "Он много путешествовал по зарубежным странам",
        id: 108,
        word: "foreign",
        wordTranslate: "иностранные"
      },
      {
        audioExample: "files/06_0110_example.mp3",
        textExample: "He used the mirror to shine light in their eyes",
        textExampleTranslate: "Он использовал зеркало, чтобы светить им в глаза",
        id: 110,
        word: "mirror",
        wordTranslate: "зеркало"
      },
      {
        audioExample: "files/06_0111_example.mp3",
        textExample: "We need to take care of the natural world",
        textExampleTranslate: "Нам нужно заботиться о мире природы",
        id: 111,
        word: "natural",
        wordTranslate: "естественный"
      },
      {
        audioExample: "files/06_0112_example.mp3",
        textExample: "Nowadays, not so many people smoke",
        textExampleTranslate: "В настоящее время не так много людей курят",
        id: 112,
        word: "nowadays",
        wordTranslate: "в наше время"
      },
      {
        audioExample: "files/06_0113_example.mp3",
        textExample: "There were thousands of participants in this year’s marathon",
        textExampleTranslate: "В этом году в марафоне приняли участие тысячи человек",
        id: 113,
        word: "participant",
        wordTranslate: "участник"
      }
    ]
  },
  {
    levelData: {
      id: "1_10",
      name: "River Landscape",
      imageSrc: "level1/riverla2.jpg",
      cutSrc: "level1/cut/riverla2.jpg",
      author: "ALLEGRAIN, Etienne",
      year: "second half of XVII century"
    },
    words: [
      {
        audioExample: "files/06_0115_example.mp3",
        textExample: "We cannot take back what has been spoken",
        textExampleTranslate: "Мы не можем забрать то, что было сказано",
        id: 115,
        word: "spoken",
        wordTranslate: "знание"
      },
      {
        audioExample: "files/06_0116_example.mp3",
        textExample: "She loves watching sport on TV",
        textExampleTranslate: "Она любит смотреть спорт по телевизору",
        id: 116,
        word: "sport",
        wordTranslate: "спорт"
      },
      {
        audioExample: "files/06_0119_example.mp3",
        textExample: "I am totally against that",
        textExampleTranslate: "Я полностью против этого",
        id: 119,
        word: "totally",
        wordTranslate: "полностью"
      },
      {
        audioExample: "files/07_0121_example.mp3",
        textExample: "Having a ticket will allow you to enter the show",
        textExampleTranslate: "Наличие билета позволит вам войти в шоу",
        id: 121,
        word: "allow",
        wordTranslate: "позволять"
      },
      {
        audioExample: "files/07_0122_example.mp3",
        textExample: "He announced to everyone his new idea for the company",
        textExampleTranslate: "Он объявил всем свою новую идею для компании",
        id: 122,
        word: "announce",
        wordTranslate: "объявить"
      },
      {
        audioExample: "files/07_0123_example.mp3",
        textExample: "The two brothers stood beside each other",
        textExampleTranslate: "Два брата стояли рядом друг с другом",
        id: 123,
        word: "beside",
        wordTranslate: "ряд"
      },
      {
        audioExample: "files/07_0125_example.mp3",
        textExample: "He claimed to know why the country’s laws were weak",
        textExampleTranslate: "Он утверждал, что знает, почему законы страны были слабыми",
        id: 125,
        word: "claim",
        wordTranslate: "запрос"
      },
      {
        audioExample: "files/07_0126_example.mp3",
        textExample: "The patient’s condition was very good",
        textExampleTranslate: "Состояние пациента было очень хорошим",
        id: 126,
        word: "condition",
        wordTranslate: "состояние"
      },
      {
        audioExample: "files/07_0127_example.mp3",
        textExample: "We decided to contribute money to the new hospital",
        textExampleTranslate: "Мы решили внести деньги в новую больницу",
        id: 127,
        word: "contribute",
        wordTranslate: "делать вклад"
      },
      {
        audioExample: "files/07_0129_example.mp3",
        textExample: "We divided the pizza",
        textExampleTranslate: "Мы разделили пиццу",
        id: 129,
        word: "divide",
        wordTranslate: "делить"
      }
    ]
  },
  {
    levelData: {
      id: "1_11",
      name: "Extensive Wooded Landscape with Cephalus and Procris",
      imageSrc: "level1/extensiv.jpg",
      cutSrc: "level1/cut/extensiv.jpg",
      author: "ALSLOOT, Denis van",
      year: "first half of XVII century"
    },
    words: [
      {
        audioExample: "files/07_0130_example.mp3",
        textExample: "The wizard was an expert at magic",
        textExampleTranslate: "Волшебник был экспертом в магии",
        id: 130,
        word: "expert",
        wordTranslate: "эксперт"
      },
      {
        audioExample: "files/07_0131_example.mp3",
        textExample: "The Eiffel Tower in Paris is very famous",
        textExampleTranslate: "Эйфелева башня в Париже очень известна",
        id: 131,
        word: "famous",
        wordTranslate: "известный"
      },
      {
        audioExample: "files/07_0134_example.mp3",
        textExample: "Don’t lay your socks on the floor",
        textExampleTranslate: "Не кладите носки на пол",
        id: 134,
        word: "lay",
        wordTranslate: "лежал"
      },
      {
        audioExample: "files/07_0135_example.mp3",
        textExample: "A white dove is a symbol of peace",
        textExampleTranslate: "Белый голубь - символ мира",
        id: 135,
        word: "peace",
        wordTranslate: "мир"
      },
      {
        audioExample: "files/07_0136_example.mp3",
        textExample: "The prince and the princess were married",
        textExampleTranslate: "Принц и принцесса были женаты",
        id: 136,
        word: "prince",
        wordTranslate: "принц"
      },
      {
        audioExample: "files/07_0137_example.mp3",
        textExample: "Firemen protect us from fires",
        textExampleTranslate: "Пожарные защищают нас от пожаров",
        id: 137,
        word: "protect",
        wordTranslate: "защита"
      },
      {
        audioExample: "files/07_0138_example.mp3",
        textExample: "I could sense that he was watching me",
        textExampleTranslate: "Я чувствовал, что он смотрит на меня",
        id: 138,
        word: "sense",
        wordTranslate: "смысл"
      },
      {
        audioExample: "files/07_0139_example.mp3",
        textExample: "He felt a sudden pain in his chest",
        textExampleTranslate: "Он почувствовал внезапную боль в груди",
        id: 139,
        word: "sudden",
        wordTranslate: "внезапное"
      },
      {
        audioExample: "files/07_0140_example.mp3",
        textExample: "He is fat. Therefore, he should go on a diet",
        textExampleTranslate: "Он толстый. Поэтому ему следует сесть на диету",
        id: 140,
        word: "therefore",
        wordTranslate: "следовательно"
      },
      {
        audioExample: "files/08_0141_example.mp3",
        textExample: "I accepted the girl’s very nice gift",
        textExampleTranslate: "Я принял очень хороший подарок девушки",
        id: 141,
        word: "accept",
        wordTranslate: "принять"
      }
    ]
  },
  {
    levelData: {
      id: "1_12",
      name: "Skating during Carnival",
      imageSrc: "level1/skating.jpg",
      cutSrc: "level1/cut/skating.jpg",
      author: "ALSLOOT, Denis van",
      year: "1620"
    },
    words: [
      {
        audioExample: "files/08_0142_example.mp3",
        textExample: "Please arrange the words in order from A to Z",
        textExampleTranslate: "Пожалуйста, расположите слова в порядке от А до Я",
        id: 142,
        word: "arrange",
        wordTranslate: "организовать"
      },
      {
        audioExample: "files/08_0143_example.mp3",
        textExample: "My sister and I attend the same school",
        textExampleTranslate: "Мы с сестрой учимся в одной школе",
        id: 143,
        word: "attend",
        wordTranslate: "присутствовать"
      },
      {
        audioExample: "files/08_0144_example.mp3",
        textExample: "I was chased by a dog",
        textExampleTranslate: "Меня преследовала собака",
        id: 144,
        word: "chase",
        wordTranslate: "гнаться"
      },
      {
        audioExample: "files/08_0145_example.mp3",
        textExample: "The contrast between my parents is very noticeable",
        textExampleTranslate: "Контраст между моими родителями очень заметен",
        id: 145,
        word: "contrast",
        wordTranslate: "контраст"
      },
      {
        audioExample: "files/08_0146_example.mp3",
        textExample: "My football coach will encourage us when we are losing",
        textExampleTranslate: "Мой футбольный тренер будет воодушевлять нас, когда мы проигрываем",
        id: 146,
        word: "encourage",
        wordTranslate: "поощрять"
      },
      {
        audioExample: "files/08_0147_example.mp3",
        textExample: "The two friends were very familiar with each other",
        textExampleTranslate: "Два друга были очень знакомы друг с другом",
        id: 147,
        word: "familiar",
        wordTranslate: "знакомые"
      },
      {
        audioExample: "files/08_0148_example.mp3",
        textExample: "I grabbed a pear from the tree",
        textExampleTranslate: "Я схватил грушу с дерева",
        id: 148,
        word: "grab",
        wordTranslate: "захват"
      },
      {
        audioExample: "files/08_0150_example.mp3",
        textExample: "At work, my father drives a huge truck",
        textExampleTranslate: "На работе мой отец водит огромный грузовик",
        id: 150,
        word: "huge",
        wordTranslate: "огромный"
      },
      {
        audioExample: "files/08_0151_example.mp3",
        textExample: "A passport is necessary if you travel to other countries",
        textExampleTranslate: "Паспорт необходим, если вы путешествуете в другие страны",
        id: 151,
        word: "necessary",
        wordTranslate: "нужно"
      },
      {
        audioExample: "files/08_0154_example.mp3",
        textExample: "The purpose of exercising is to get into shape",
        textExampleTranslate: "Цель упражнений - прийти в форму",
        id: 154,
        word: "purpose",
        wordTranslate: "цель"
      }
    ]
  },
  {
    levelData: {
      id: "1_13",
      name: "Winter Landscape",
      imageSrc: "level1/winter_l.jpg",
      cutSrc: "level1/cut/winter_l.jpg",
      author: "ALSLOOT, Denis van",
      year: "1610"
    },
    words: [
      {
        audioExample: "files/08_0155_example.mp3",
        textExample: "She released the bird from her hands",
        textExampleTranslate: "Она выпустила птицу из рук",
        id: 155,
        word: "release",
        wordTranslate: "релиз"
      },
      {
        audioExample: "files/08_0156_example.mp3",
        textExample: "We require teachers to have a university degree",
        textExampleTranslate: "Мы требуем, чтобы преподаватели имели высшее образование",
        id: 156,
        word: "require",
        wordTranslate: "требуют"
      },
      {
        audioExample: "files/08_0157_example.mp3",
        textExample: "I am very satisfied with your work",
        textExampleTranslate: "Я очень доволен вашей работой",
        id: 157,
        word: "satisfied",
        wordTranslate: "доволен"
      },
      {
        audioExample: "files/08_0158_example.mp3",
        textExample: "I have a single key in my hand",
        textExampleTranslate: "У меня в руке один ключ",
        id: 158,
        word: "single",
        wordTranslate: "один"
      },
      {
        audioExample: "files/08_0159_example.mp3",
        textExample: "It is easy to tear paper",
        textExampleTranslate: "Бумагу легко порвать",
        id: 159,
        word: "tear",
        wordTranslate: "слеза"
      },
      {
        audioExample: "files/08_0160_example.mp3",
        textExample: "We talked about Einstein’s theory of relativity in class",
        textExampleTranslate: "Мы говорили о теории относительности Эйнштейна в классе",
        id: 160,
        word: "theory",
        wordTranslate: "теория"
      },
      {
        audioExample: "files/09_0161_example.mp3",
        textExample: "My favorite animal is the panda",
        textExampleTranslate: "Мое любимое животное - панда",
        id: 161,
        word: "animal",
        wordTranslate: "животное"
      },
      {
        audioExample: "files/09_0162_example.mp3",
        textExample: "My father takes the bus to work",
        textExampleTranslate: "Мой отец садится на автобус на работу",
        id: 162,
        word: "bus",
        wordTranslate: "автобус"
      },
      {
        audioExample: "files/09_0163_example.mp3",
        textExample: "This cat is playing with a ball",
        textExampleTranslate: "Этот кот играет с мячом",
        id: 163,
        word: "cat",
        wordTranslate: "кошка"
      },
      {
        audioExample: "files/09_0164_example.mp3",
        textExample: "Joe gave the students a command to stand up",
        textExampleTranslate: "Джо дал студентам команду встать",
        id: 164,
        word: "command",
        wordTranslate: "команда"
      }
    ]
  },
  {
    levelData: {
      id: "1_14",
      name: "Winter Landscape in the Fôret de Soignes, with the Flight Into Egypt",
      imageSrc: "level1/winterla.jpg",
      cutSrc: "level1/cut/winterla.jpg",
      author: "ALSLOOT, Denis van",
      year: "1616"
    },
    words: [
      {
        audioExample: "files/09_0165_example.mp3",
        textExample: "My grandfather depends on a cane when he walks",
        textExampleTranslate: "Мой дедушка зависит от трости, когда он гуляет",
        id: 165,
        word: "depend",
        wordTranslate: "зависит"
      },
      {
        audioExample: "files/09_0166_example.mp3",
        textExample: "This woman’s best friend is her dog",
        textExampleTranslate: "Лучший друг этой женщины - ее собака",
        id: 166,
        word: "dog",
        wordTranslate: "собака"
      },
      {
        audioExample: "files/09_0167_example.mp3",
        textExample: "Can you close the door, please?",
        textExampleTranslate: "Можете ли вы закрыть дверь, пожалуйста?",
        id: 167,
        word: "door",
        wordTranslate: "дверь"
      },
      {
        audioExample: "files/09_0168_example.mp3",
        textExample: "Brian’s friend is very sad",
        textExampleTranslate: "Друг Брайана очень грустный",
        id: 168,
        word: "friend",
        wordTranslate: "друг"
      },
      {
        audioExample: "files/09_0169_example.mp3",
        textExample: "Michelle cannot hear what you are saying",
        textExampleTranslate: "Мишель не слышит, что ты говоришь",
        id: 169,
        word: "hear",
        wordTranslate: "слышать"
      },
      {
        audioExample: "files/09_0170_example.mp3",
        textExample: "Jane can help Nathan climb up the rock",
        textExampleTranslate: "Джейн может помочь Натану взобраться на скалу",
        id: 170,
        word: "help",
        wordTranslate: "помогите"
      },
      {
        audioExample: "files/09_0171_example.mp3",
        textExample: "I went to a farm and saw a horse",
        textExampleTranslate: "Я пошел на ферму и увидел лошадь",
        id: 171,
        word: "horse",
        wordTranslate: "лошадь"
      },
      {
        audioExample: "files/09_0172_example.mp3",
        textExample: "The doctor talks to a patient at the hospital",
        textExampleTranslate: "Доктор разговаривает с пациентом в больнице",
        id: 172,
        word: "hospital",
        wordTranslate: "больница"
      },
      {
        audioExample: "files/09_0173_example.mp3",
        textExample: "She hurt her leg",
        textExampleTranslate: "Она повредила ногу",
        id: 173,
        word: "leg",
        wordTranslate: "нога"
      },
      {
        audioExample: "files/09_0174_example.mp3",
        textExample: "Tyler is a medical student studying to become a doctor",
        textExampleTranslate: "Тайлер студент-медик учится на доктора",
        id: 174,
        word: "medical",
        wordTranslate: "медицинский"
      }
    ]
  },
  {
    levelData: {
      id: "1_15",
      name: "View of Vienna from the Prater",
      imageSrc: "level1/viewvien.jpg",
      cutSrc: "level1/cut/viewvien.jpg",
      author: "ALT, Rudolf von",
      year: "1834"
    },
    words: [
      {
        audioExample: "files/09_0176_example.mp3",
        textExample: "The children pull the rope",
        textExampleTranslate: "Дети тянут веревку",
        id: 176,
        word: "pull",
        wordTranslate: "вытащить"
      },
      {
        audioExample: "files/09_0177_example.mp3",
        textExample: "Look at the rabbit in the park",
        textExampleTranslate: "Посмотри на кролика в парке",
        id: 177,
        word: "rabbit",
        wordTranslate: "кролик"
      },
      {
        audioExample: "files/09_0178_example.mp3",
        textExample: "The students study at school",
        textExampleTranslate: "Ученики учатся в школе",
        id: 178,
        word: "school",
        wordTranslate: "школа"
      },
      {
        audioExample: "files/09_0179_example.mp3",
        textExample: "Steven does not want to see the scary picture",
        textExampleTranslate: "Стивен не хочет видеть страшную картину",
        id: 179,
        word: "see",
        wordTranslate: "видеть"
      },
      {
        audioExample: "files/09_0180_example.mp3",
        textExample: "This coffee shop has excellent service",
        textExampleTranslate: "В этой кофейне отличный сервис",
        id: 180,
        word: "service",
        wordTranslate: "служба"
      },
      {
        audioExample: "files/10_0181_example.mp3",
        textExample: "Being able to fly is a benefit to birds",
        textExampleTranslate: "Умение летать приносит пользу птицам",
        id: 181,
        word: "benefit",
        wordTranslate: "выгода"
      },
      {
        audioExample: "files/10_0182_example.mp3",
        textExample: "I am certain that zebras have stripes",
        textExampleTranslate: "Я уверен, что у зебр есть полоски",
        id: 182,
        word: "certain",
        wordTranslate: "определенный"
      },
      {
        audioExample: "files/10_0184_example.mp3",
        textExample: "The medicine had a good effect on the boy",
        textExampleTranslate: "Лекарство оказало хорошее влияние на мальчика",
        id: 184,
        word: "effect",
        wordTranslate: "эффект"
      },
      {
        audioExample: "files/10_0185_example.mp3",
        textExample: "It is essential to have oxygen when you scuba dive",
        textExampleTranslate: "Крайне важно иметь кислород, когда вы погружаетесь с аквалангом",
        id: 185,
        word: "essential",
        wordTranslate: "существенный"
      },
      {
        audioExample: "files/10_0189_example.mp3",
        textExample: "The grass looked so soft and green",
        textExampleTranslate: "Трава выглядела такой мягкой и зеленой",
        id: 189,
        word: "grass",
        wordTranslate: "трава"
      }
    ]
  },
  {
    levelData: {
      id: "1_16",
      name: "An English 3rd - Rate Ship of the Line in Three Positions",
      imageSrc: "level1/rateship.jpg",
      cutSrc: "level1/cut/rateship.jpg",
      author: "ANDERSON, William",
      year: "first half of XIX century"
    },
    words: [
      {
        audioExample: "files/10_0190_example.mp3",
        textExample: "The police officer will guard us from any harm",
        textExampleTranslate: "Полицейский будет охранять нас от любого вреда",
        id: 190,
        word: "guard",
        wordTranslate: "охранник"
      },
      {
        audioExample: "files/10_0191_example.mp3",
        textExample: "The image of her eye was very clear",
        textExampleTranslate: "Образ ее глаза был очень четким",
        id: 191,
        word: "image",
        wordTranslate: "образ"
      },
      {
        audioExample: "files/10_0192_example.mp3",
        textExample: "An immediate response came from the pizza place",
        textExampleTranslate: "Немедленный ответ пришел из пиццерии",
        id: 192,
        word: "immediate",
        wordTranslate: "немедленно"
      },
      {
        audioExample: "files/10_0193_example.mp3",
        textExample: "His primary thoughts are about money",
        textExampleTranslate: "Его главные мысли о деньгах",
        id: 193,
        word: "primary",
        wordTranslate: "первичный"
      },
      {
        audioExample: "files/10_0195_example.mp3",
        textExample: "My sister had to remain home since she was sick",
        textExampleTranslate: "Моя сестра должна была оставаться дома, так как она была больна",
        id: 195,
        word: "remain",
        wordTranslate: "остаются"
      },
      {
        audioExample: "files/10_0196_example.mp3",
        textExample: "I rested on the couch after work",
        textExampleTranslate: "Я отдыхал на диване после работы",
        id: 196,
        word: "rest",
        wordTranslate: "остаток"
      },
      {
        audioExample: "files/10_0198_example.mp3",
        textExample: "We found the perfect site for our picnic",
        textExampleTranslate: "Мы нашли идеальное место для нашего пикника",
        id: 198,
        word: "site",
        wordTranslate: "сайт"
      },
      {
        audioExample: "files/10_0199_example.mp3",
        textExample: "Our dog wags its tail when it’s happy",
        textExampleTranslate: "Наша собака виляет хвостом, когда она счастлива",
        id: 199,
        word: "tail",
        wordTranslate: "хвост"
      },
      {
        audioExample: "files/10_0200_example.mp3",
        textExample: "I have trouble working with my boss",
        textExampleTranslate: "У меня проблемы с работой с моим боссом",
        id: 200,
        word: "trouble",
        wordTranslate: "беда"
      },
      {
        audioExample: "files/11_0202_example.mp3",
        textExample: "The student became aware that the teacher was watching him",
        textExampleTranslate: "Ученик осознал, что учитель следит за ним",
        id: 202,
        word: "aware",
        wordTranslate: "знают"
      }
    ]
  },
  {
    levelData: {
      id: "1_17",
      name: "Shipping in a Calm Sea off the Coast",
      imageSrc: "level1/shipcalm.jpg",
      cutSrc: "level1/cut/shipcalm.jpg",
      author: "ANDERSON, William",
      year: "1803"
    },
    words: [
      {
        audioExample: "files/11_0203_example.mp3",
        textExample: "My brother needs a battery for his clock",
        textExampleTranslate: "Моему брату нужна батарея для его часов",
        id: 203,
        word: "battery",
        wordTranslate: "батарея"
      },
      {
        audioExample: "files/11_0205_example.mp3",
        textExample: "Tokyo is a very big city in Japan",
        textExampleTranslate: "Токио - очень большой город в Японии",
        id: 205,
        word: "city",
        wordTranslate: "город"
      },
      {
        audioExample: "files/11_0206_example.mp3",
        textExample: "I clean our kitchen every Saturday",
        textExampleTranslate: "Я убираю нашу кухню каждую субботу",
        id: 206,
        word: "clean",
        wordTranslate: "чистый"
      },
      {
        audioExample: "files/11_0207_example.mp3",
        textExample: "France is a country in Europe",
        textExampleTranslate: "Франция - это страна в Европе",
        id: 207,
        word: "country",
        wordTranslate: "страна"
      },
      {
        audioExample: "files/11_0208_example.mp3",
        textExample: "This practice will help you develop your math skills",
        textExampleTranslate: "Эта практика поможет вам развить свои математические навыки",
        id: 208,
        word: "develop",
        wordTranslate: "развивать"
      },
      {
        audioExample: "files/11_0209_example.mp3",
        textExample: "Some car companies make electric cars",
        textExampleTranslate: "Некоторые автомобильные компании производят электромобили",
        id: 209,
        word: "electric",
        wordTranslate: "электрический"
      },
      {
        audioExample: "files/11_0212_example.mp3",
        textExample: "Windows are made of glass",
        textExampleTranslate: "Окна сделаны из стекла",
        id: 212,
        word: "glass",
        wordTranslate: "стакан"
      },
      {
        audioExample: "files/11_0213_example.mp3",
        textExample: "History was my favorite subject in school",
        textExampleTranslate: "История была моим любимым предметом в школе",
        id: 213,
        word: "history",
        wordTranslate: "история"
      },
      {
        audioExample: "files/11_0215_example.mp3",
        textExample: "They never eat meat because they are vegetarians",
        textExampleTranslate: "Они никогда не едят мясо, потому что они вегетарианцы",
        id: 215,
        word: "never",
        wordTranslate: "никогда"
      },
      {
        audioExample: "files/11_0216_example.mp3",
        textExample: "How many people live in China?",
        textExampleTranslate: "Сколько людей живет в Китае?",
        id: 216,
        word: "people",
        wordTranslate: "люди"
      }
    ]
  },
  {
    levelData: {
      id: "1_18",
      name: "Shipping on the Thames off Deptford",
      imageSrc: "level1/shipping.jpg",
      cutSrc: "level1/cut/shipping.jpg",
      author: "ANDERSON, William",
      year: "1825"
    },
    words: [
      {
        audioExample: "files/11_0217_example.mp3",
        textExample: "Many drinks are sold in plastic bottles",
        textExampleTranslate: "Многие напитки продаются в пластиковых бутылках",
        id: 217,
        word: "plastic",
        wordTranslate: "пластик"
      },
      {
        audioExample: "files/11_0218_example.mp3",
        textExample: "My problem is that I lost my dog",
        textExampleTranslate: "Моя проблема в том, что я потерял свою собаку",
        id: 218,
        word: "problem",
        wordTranslate: "проблема"
      },
      {
        audioExample: "files/11_0219_example.mp3",
        textExample: "What is the name of the street you live on?",
        textExampleTranslate: "Как называется улица, на которой вы живете?",
        id: 219,
        word: "street",
        wordTranslate: "улица"
      },
      {
        audioExample: "files/11_0220_example.mp3",
        textExample: "I think summer is the best season",
        textExampleTranslate: "Я считаю лето лучшим сезоном",
        id: 220,
        word: "think",
        wordTranslate: "считать"
      },
      {
        audioExample: "files/12_0221_example.mp3",
        textExample: "The boy wanted to be alone to think",
        textExampleTranslate: "Мальчик хотел побыть один, чтобы думать",
        id: 221,
        word: "alone",
        wordTranslate: "один"
      },
      {
        audioExample: "files/12_0222_example.mp3",
        textExample: "She has a nice apartment in the city",
        textExampleTranslate: "У нее хорошая квартира в городе",
        id: 222,
        word: "apartment",
        wordTranslate: "квартира"
      },
      {
        audioExample: "files/12_0224_example.mp3",
        textExample: "He went to Paris to become an artist",
        textExampleTranslate: "Он отправился в Париж, чтобы стать художником",
        id: 224,
        word: "artist",
        wordTranslate: "художник"
      },
      {
        audioExample: "files/12_0225_example.mp3",
        textExample: "John has a bad attitude. He’s always angry",
        textExampleTranslate: "У Джона плохое отношение. Он всегда зол",
        id: 225,
        word: "attitude",
        wordTranslate: "отношение"
      },
      {
        audioExample: "files/12_0229_example.mp3",
        textExample: "She likes to read fashion magazines",
        textExampleTranslate: "Она любит читать журналы мод",
        id: 229,
        word: "magazine",
        wordTranslate: "журнал"
      },
      {
        audioExample: "files/12_0230_example.mp3",
        textExample: "Brick is a good material for building houses",
        textExampleTranslate: "Кирпич - хороший материал для строительства домов",
        id: 230,
        word: "material",
        wordTranslate: "материал"
      }
    ]
  },
  {
    levelData: {
      id: "1_19",
      name: "Italianate Coastal Landscape",
      imageSrc: "level1/landsca3.jpg",
      cutSrc: "level1/cut/landsca3.jpg",
      author: "ANESI, Paolo",
      year: "XVIII century"
    },
    words: [
      {
        audioExample: "files/12_0231_example.mp3",
        textExample: "Breakfast is my favorite meal because I enjoy cereal",
        textExampleTranslate: "Завтрак - моя любимая еда, потому что я наслаждаюсь хлопьями",
        id: 231,
        word: "meal",
        wordTranslate: "еда"
      },
      {
        audioExample: "files/12_0233_example.mp3",
        textExample: "I like my neighbor because he’s very friendly",
        textExampleTranslate: "Мне нравится мой сосед, потому что он очень дружелюбный",
        id: 233,
        word: "neighbor",
        wordTranslate: "сосед"
      },
      {
        audioExample: "files/12_0235_example.mp3",
        textExample: "I made a small profit from selling my old clothes",
        textExampleTranslate: "Я получил небольшую прибыль от продажи моей старой одежды",
        id: 235,
        word: "profit",
        wordTranslate: "прибыль"
      },
      {
        audioExample: "files/12_0236_example.mp3",
        textExample: "The quality of his car is very good",
        textExampleTranslate: "Качество его машины очень хорошее",
        id: 236,
        word: "quality",
        wordTranslate: "качественный"
      },
      {
        audioExample: "files/12_0238_example.mp3",
        textExample: "You can take the stairs to the second floor",
        textExampleTranslate: "Вы можете подняться по лестнице на второй этаж",
        id: 238,
        word: "stair",
        wordTranslate: "ступенька"
      },
      {
        audioExample: "files/12_0240_example.mp3",
        textExample: "The man was thin because he didn’t eat much",
        textExampleTranslate: "Человек был худым, потому что он мало ел",
        id: 240,
        word: "thin",
        wordTranslate: "тонкий"
      },
      {
        audioExample: "files/13_0241_example.mp3",
        textExample: "He works for an accounting firm",
        textExampleTranslate: "Он работает в бухгалтерской фирме",
        id: 241,
        word: "accounting",
        wordTranslate: "бухгалтерский учет"
      },
      {
        audioExample: "files/13_0243_example.mp3",
        textExample: "I assume you are both familiar with this plan",
        textExampleTranslate: "Я полагаю, вы оба знакомы с этим планом",
        id: 243,
        word: "assume",
        wordTranslate: "предполагать"
      },
      {
        audioExample: "files/13_0245_example.mp3",
        textExample: "She has many clients who enjoy coming to her salon",
        textExampleTranslate: "У нее много клиентов, которым нравится приходить в ее салон",
        id: 245,
        word: "client",
        wordTranslate: "клиент"
      },
      {
        audioExample: "files/13_0246_example.mp3",
        textExample: "The downtown area is filled with many tall buildings",
        textExampleTranslate: "Центр города заполнен множеством высоких зданий",
        id: 246,
        word: "downtown",
        wordTranslate: "центр города"
      }
    ]
  },
  {
    levelData: {
      id: "1_20",
      name: "Tiber Bridge in Rome",
      imageSrc: "level1/rome.jpg",
      cutSrc: "level1/cut/rome.jpg",
      author: "ANESI, Paolo",
      year: "XVIII century"
    },
    words: [
      {
        audioExample: "files/13_0247_example.mp3",
        textExample: "The movie was very dull. I fell asleep watching it",
        textExampleTranslate: "Фильм был очень скучным. Я заснул, смотря его",
        id: 247,
        word: "dull",
        wordTranslate: "тупой"
      },
      {
        audioExample: "files/13_0248_example.mp3",
        textExample: "He was embarrassed when he couldn’t remember her name",
        textExampleTranslate: "Он был смущен, когда не мог вспомнить ее имя",
        id: 248,
        word: "embarrass",
        wordTranslate: "смущать"
      },
      {
        audioExample: "files/13_0253_example.mp3",
        textExample: "I got a loan from the bank",
        textExampleTranslate: "Я получил кредит в банке",
        id: 253,
        word: "loan",
        wordTranslate: "кредит"
      },
      {
        audioExample: "files/13_0255_example.mp3",
        textExample: "He paid a quarter for the candy",
        textExampleTranslate: "Он заплатил четверть за конфету",
        id: 255,
        word: "quarter",
        wordTranslate: "квартал"
      },
      {
        audioExample: "files/13_0256_example.mp3",
        textExample: "He got a new job with a better salary",
        textExampleTranslate: "Он получил новую работу с лучшей зарплатой",
        id: 256,
        word: "salary",
        wordTranslate: "зарплата"
      },
      {
        audioExample: "files/13_0257_example.mp3",
        textExample: "I got a scholarship to help me pay for university",
        textExampleTranslate: "Я получил стипендию, чтобы помочь мне заплатить за университет",
        id: 257,
        word: "scholarship",
        wordTranslate: "стипендия"
      },
      {
        audioExample: "files/13_0259_example.mp3",
        textExample: "They became very rich when they found the buried treasure",
        textExampleTranslate: "Они стали очень богатыми, когда нашли клад",
        id: 259,
        word: "treasure",
        wordTranslate: "сокровище"
      },
      {
        audioExample: "files/13_0260_example.mp3",
        textExample: "He urged them to believe his story",
        textExampleTranslate: "Он призвал их поверить в его историю",
        id: 260,
        word: "urge",
        wordTranslate: "побуждение"
      },
      {
        audioExample: "files/14_0261_example.mp3",
        textExample: "My coach gets very excited during games",
        textExampleTranslate: "Мой тренер очень взволнован во время игр",
        id: 261,
        word: "coach",
        wordTranslate: "тренер"
      },
      {
        audioExample: "files/14_0262_example.mp3",
        textExample: "To control the TV, just push the buttons",
        textExampleTranslate: "Чтобы управлять телевизором, просто нажимайте кнопки",
        id: 262,
        word: "control",
        wordTranslate: "контроль"
      }
    ]
  },
  {
    levelData: {
      id: "1_21",
      name: "View of the Roman Campagna",
      imageSrc: "level1/rome1.jpg",
      cutSrc: "level1/cut/rome1.jpg",
      author: "ANESI, Paolo",
      year: "XVIII century"
    },
    words: [
      {
        audioExample: "files/14_0264_example.mp3",
        textExample: "The green path is a direct route to my house",
        textExampleTranslate: "Зеленая тропа - прямой путь к моему дому",
        id: 264,
        word: "direct",
        wordTranslate: "непосредственный"
      },
      {
        audioExample: "files/14_0266_example.mp3",
        textExample: "Cola is an example of a soft drink",
        textExampleTranslate: "Кола - пример безалкогольного напитка",
        id: 266,
        word: "example",
        wordTranslate: "пример"
      },
      {
        audioExample: "files/14_0269_example.mp3",
        textExample: "The fireworks made the night sky look so magical",
        textExampleTranslate: "Фейерверк заставил ночное небо выглядеть таким волшебным",
        id: 269,
        word: "magical",
        wordTranslate: "волшебный"
      },
      {
        audioExample: "files/14_0271_example.mp3",
        textExample: "He wrote a great novel about ancient China",
        textExampleTranslate: "Он написал великий роман о древнем Китае",
        id: 271,
        word: "novel",
        wordTranslate: "роман"
      },
      {
        audioExample: "files/14_0272_example.mp3",
        textExample: "Before I wrote my essay, I made an outline",
        textExampleTranslate: "Прежде чем я написал свое эссе, я сделал набросок",
        id: 272,
        word: "outline",
        wordTranslate: "контур"
      },
      {
        audioExample: "files/14_0273_example.mp3",
        textExample: "William Shakespeare was one of the greatest poets",
        textExampleTranslate: "Уильям Шекспир был одним из величайших поэтов",
        id: 273,
        word: "poet",
        wordTranslate: "поэт"
      },
      {
        audioExample: "files/14_0274_example.mp3",
        textExample: "Make sure that you print your name clearly",
        textExampleTranslate: "Убедитесь, что вы печатаете свое имя четко",
        id: 274,
        word: "print",
        wordTranslate: "распечатать"
      },
      {
        audioExample: "files/14_0277_example.mp3",
        textExample: "I made a silly mistake of dropping mom’s vase",
        textExampleTranslate: "Я сделал глупую ошибку, уронив мамину вазу",
        id: 277,
        word: "silly",
        wordTranslate: "глупый"
      },
      {
        audioExample: "files/14_0278_example.mp3",
        textExample: "I picked up a few things at the grocery store",
        textExampleTranslate: "Я взял несколько вещей в продуктовом магазине",
        id: 278,
        word: "store",
        wordTranslate: "хранить"
      },
      {
        audioExample: "files/14_0279_example.mp3",
        textExample: "Her headache made her suffer all day",
        textExampleTranslate: "Ее головная боль заставляла ее страдать весь день",
        id: 279,
        word: "suffer",
        wordTranslate: "страдать"
      }
    ]
  },
  {
    levelData: {
      id: "1_22",
      name: "Harbour Scene",
      imageSrc: "level1/scene.jpg",
      cutSrc: "level1/cut/scene.jpg",
      author: "ANESI, Paolo",
      year: "XVIII century"
    },
    words: [
      {
        audioExample: "files/14_0280_example.mp3",
        textExample: "He loves technology such as laptop computers",
        textExampleTranslate: "Он любит такие технологии, как ноутбуки",
        id: 280,
        word: "technology",
        wordTranslate: "технологии"
      },
      {
        audioExample: "files/15_0281_example.mp3",
        textExample: "He walked across the board to the other side",
        textExampleTranslate: "Он прошел через доску на другую сторону",
        id: 281,
        word: "across",
        wordTranslate: "через"
      },
      {
        audioExample: "files/15_0282_example.mp3",
        textExample: "We need strong healthy lungs to help us breathe well",
        textExampleTranslate: "Нам нужны крепкие здоровые легкие, чтобы мы могли хорошо дышать",
        id: 282,
        word: "breathe",
        wordTranslate: "дышать"
      },
      {
        audioExample: "files/15_0283_example.mp3",
        textExample: "One characteristic of tigers is their black stripes",
        textExampleTranslate: "Одна из характеристик тигров - их черные полосы",
        id: 283,
        word: "characteristic",
        wordTranslate: "характеристика"
      },
      {
        audioExample: "files/15_0284_example.mp3",
        textExample: "Jack consumed a whole plate of spaghetti",
        textExampleTranslate: "Джек съел целую тарелку спагетти",
        id: 284,
        word: "consume",
        wordTranslate: "потреблять"
      },
      {
        audioExample: "files/15_0286_example.mp3",
        textExample: "I was extremely worried about him",
        textExampleTranslate: "Я очень переживал за него",
        id: 286,
        word: "extremely",
        wordTranslate: "чрезвычайно"
      },
      {
        audioExample: "files/15_0287_example.mp3",
        textExample: "I have a great fear of skateboarding",
        textExampleTranslate: "Я очень боюсь кататься на скейтборде",
        id: 287,
        word: "fear",
        wordTranslate: "страх"
      },
      {
        audioExample: "files/15_0288_example.mp3",
        textExample: "I was fortunate to get a seat",
        textExampleTranslate: "Мне повезло получить место",
        id: 288,
        word: "fortunate",
        wordTranslate: "повезло"
      },
      {
        audioExample: "files/15_0289_example.mp3",
        textExample: "I happened to meet some new friends at school today",
        textExampleTranslate: "Я случайно встретил в школе новых друзей",
        id: 289,
        word: "happen",
        wordTranslate: "случиться"
      },
      {
        audioExample: "files/15_0290_example.mp3",
        textExample: "The length of the floor is three meters",
        textExampleTranslate: "Длина пола три метра",
        id: 290,
        word: "length",
        wordTranslate: "длина"
      }
    ]
  },
  {
    levelData: {
      id: "1_23",
      name: "View of Tivoli and the Roman Campagna",
      imageSrc: "level1/tivoli.jpg",
      cutSrc: "level1/cut/tivoli.jpg",
      author: "ANESI, Paolo",
      year: "XVIII century"
    },
    words: [
      {
        audioExample: "files/15_0292_example.mp3",
        textExample: "Brian observed the sun rising over the mountains",
        textExampleTranslate: "Брайан наблюдал, как солнце поднимается над горами",
        id: 292,
        word: "observe",
        wordTranslate: "наблюдать"
      },
      {
        audioExample: "files/15_0293_example.mp3",
        textExample: "I had an opportunity to take pictures in the jungle",
        textExampleTranslate: "У меня была возможность фотографироваться в джунглях",
        id: 293,
        word: "opportunity",
        wordTranslate: "возможность"
      },
      {
        audioExample: "files/15_0297_example.mp3",
        textExample: "When the teacher asked the question, we all responded",
        textExampleTranslate: "Когда учитель задал вопрос, мы все ответили",
        id: 297,
        word: "respond",
        wordTranslate: "отвечать"
      },
      {
        audioExample: "files/15_0298_example.mp3",
        textExample: "I took a risk and climbed the snowy mountain",
        textExampleTranslate: "Я рискнул и поднялся на снежную гору",
        id: 298,
        word: "risk",
        wordTranslate: "риск"
      },
      {
        audioExample: "files/15_0300_example.mp3",
        textExample: "We can’t go out yet; we’re still eating",
        textExampleTranslate: "Мы еще не можем выйти; мы все еще едим",
        id: 300,
        word: "yet",
        wordTranslate: "еще"
      },
      {
        audioExample: "files/16_0302_example.mp3",
        textExample: "The man smiles as he reads his favorite book",
        textExampleTranslate: "Человек улыбается, читая свою любимую книгу",
        id: 302,
        word: "book",
        wordTranslate: "книга"
      },
      {
        audioExample: "files/16_0303_example.mp3",
        textExample: "I bought warm clothes for the cold winter",
        textExampleTranslate: "Я купил теплую одежду для холодной зимы",
        id: 303,
        word: "clothes",
        wordTranslate: "одежда"
      },
      {
        audioExample: "files/16_0304_example.mp3",
        textExample: "The community got together to plant trees",
        textExampleTranslate: "Община собралась сажать деревья",
        id: 304,
        word: "community",
        wordTranslate: "сообщество"
      },
      {
        audioExample: "files/16_0305_example.mp3",
        textExample: "The last day of the year is December 31st",
        textExampleTranslate: "Последний день года - 31 декабря",
        id: 305,
        word: "December",
        wordTranslate: "декабрь"
      },
      {
        audioExample: "files/16_0306_example.mp3",
        textExample: "I had a hamburger for dinner",
        textExampleTranslate: "У меня был гамбургер на ужин",
        id: 306,
        word: "dinner",
        wordTranslate: "обед"
      }
    ]
  },
  {
    levelData: {
      id: "1_24",
      name: "The Western Railway Leaving Paris",
      imageSrc: "level1/railway.jpg",
      cutSrc: "level1/cut/railway.jpg",
      author: "ANGRAND, Charles",
      year: "1886"
    },
    words: [
      {
        audioExample: "files/16_0308_example.mp3",
        textExample: "The men exchange business cards",
        textExampleTranslate: "Мужчины обмениваются визитками",
        id: 308,
        word: "exchange",
        wordTranslate: "обмен"
      },
      {
        audioExample: "files/16_0309_example.mp3",
        textExample: "There are four people in my family",
        textExampleTranslate: "В моей семье четыре человека",
        id: 309,
        word: "family",
        wordTranslate: "семья"
      },
      {
        audioExample: "files/16_0310_example.mp3",
        textExample: "Chris studies from 10 o’clock to noon every morning",
        textExampleTranslate: "Крис учится с 10 до 12 часов каждое утро",
        id: 310,
        word: "from",
        wordTranslate: "от"
      },
      {
        audioExample: "files/16_0311_example.mp3",
        textExample: "I don’t like green apples",
        textExampleTranslate: "Я не люблю зеленые яблоки",
        id: 311,
        word: "green",
        wordTranslate: "зеленый"
      },
      {
        audioExample: "files/16_0312_example.mp3",
        textExample: "The family likes to stay at home on the weekends",
        textExampleTranslate: "Семья любит сидеть дома по выходным",
        id: 312,
        word: "home",
        wordTranslate: "дом"
      },
      {
        audioExample: "files/16_0313_example.mp3",
        textExample: "My birthday is in January",
        textExampleTranslate: "Мой день рождения в январе",
        id: 313,
        word: "January",
        wordTranslate: "январь"
      },
      {
        audioExample: "files/16_0314_example.mp3",
        textExample: "Jack is wearing a red shirt",
        textExampleTranslate: "Джек одет в красную рубашку",
        id: 314,
        word: "red",
        wordTranslate: "красный"
      },
      {
        audioExample: "files/16_0315_example.mp3",
        textExample: "I have seven colored pencils on my desk",
        textExampleTranslate: "У меня на столе семь цветных карандашей",
        id: 315,
        word: "seven",
        wordTranslate: "семь"
      },
      {
        audioExample: "files/16_0317_example.mp3",
        textExample: "Let’s work together to finish the project",
        textExampleTranslate: "Давайте работать вместе, чтобы закончить проект",
        id: 317,
        word: "together",
        wordTranslate: "все вместе"
      },
      {
        audioExample: "files/16_0318_example.mp3",
        textExample: "My dream is to go to a good university",
        textExampleTranslate: "Моя мечта - поступить в хороший университет",
        id: 318,
        word: "university",
        wordTranslate: "университет"
      }
    ]
  },
  {
    levelData: {
      id: "1_25",
      name: "Landscape with a Musician",
      imageSrc: "level1/landscap.jpg",
      cutSrc: "level1/cut/landscap.jpg",
      author: "APSHOVEN, Thomas van",
      year: "XVII century"
    },
    words: [
      {
        audioExample: "files/16_0319_example.mp3",
        textExample: "The man has to wear a suit to work",
        textExampleTranslate: "Человек должен носить костюм, чтобы работать",
        id: 319,
        word: "wear",
        wordTranslate: "износ"
      },
      {
        audioExample: "files/16_0320_example.mp3",
        textExample: "You become one year older every birthday",
        textExampleTranslate: "Вы становитесь на год старше с каждым днем рождения",
        id: 320,
        word: "year",
        wordTranslate: "год"
      },
      {
        audioExample: "files/17_0321_example.mp3",
        textExample: "I can appreciate the lovely scenery",
        textExampleTranslate: "Я могу оценить прекрасные пейзажи",
        id: 321,
        word: "appreciate",
        wordTranslate: "оценить"
      },
      {
        audioExample: "files/17_0322_example.mp3",
        textExample: "There were many seats available in the room",
        textExampleTranslate: "В комнате было много свободных мест",
        id: 322,
        word: "available",
        wordTranslate: "доступный"
      },
      {
        audioExample: "files/17_0323_example.mp3",
        textExample: "I managed to beat everyone in the race",
        textExampleTranslate: "Мне удалось победить всех в гонке",
        id: 323,
        word: "beat",
        wordTranslate: "бить"
      },
      {
        audioExample: "files/17_0324_example.mp3",
        textExample: "The bright light from the explosion hurt my eyes",
        textExampleTranslate: "Яркий свет от взрыва повредил мне глаза",
        id: 324,
        word: "bright",
        wordTranslate: "яркий"
      },
      {
        audioExample: "files/17_0325_example.mp3",
        textExample: "We all celebrated when we heard the great news",
        textExampleTranslate: "Мы все праздновали, когда услышали великие новости",
        id: 325,
        word: "celebrate",
        wordTranslate: "праздновать"
      },
      {
        audioExample: "files/17_0326_example.mp3",
        textExample: "He tried to decide which one to eat first",
        textExampleTranslate: "Он пытался решить, какой из них съесть первым",
        id: 326,
        word: "decide",
        wordTranslate: "принять решение"
      },
      {
        audioExample: "files/17_0327_example.mp3",
        textExample: "The top of the building is disappearing in the clouds",
        textExampleTranslate: "Верхняя часть здания исчезает в облаках",
        id: 327,
        word: "disappear",
        wordTranslate: "исчезают"
      },
      {
        audioExample: "files/17_0329_example.mp3",
        textExample: "He sold me his car for a fair price",
        textExampleTranslate: "Он продал мне свою машину по справедливой цене",
        id: 329,
        word: "fair",
        wordTranslate: "справедливая"
      }
    ]
  },
  {
    levelData: {
      id: "1_26",
      name: "Edge of a Wood",
      imageSrc: "level1/edgewood.jpg",
      cutSrc: "level1/cut/edgewood.jpg",
      author: "ARTHOIS, Jacques d'",
      year: "XVII century"
    },
    words: [
      {
        audioExample: "files/17_0330_example.mp3",
        textExample: "The water flowed over the rocks and into the lake",
        textExampleTranslate: "Вода текла по скалам и в озеро",
        id: 330,
        word: "flow",
        wordTranslate: "течь"
      },
      {
        audioExample: "files/17_0332_example.mp3",
        textExample: "The sun was rising above the green hills",
        textExampleTranslate: "Солнце поднималось над зелеными холмами",
        id: 332,
        word: "hill",
        wordTranslate: "холм"
      },
      {
        audioExample: "files/17_0333_example.mp3",
        textExample: "Please check the level of the temperature",
        textExampleTranslate: "Пожалуйста, проверьте уровень температуры",
        id: 333,
        word: "level",
        wordTranslate: "уровень"
      },
      {
        audioExample: "files/17_0334_example.mp3",
        textExample: "A lone man walked along the street",
        textExampleTranslate: "Одинокий человек шел по улице",
        id: 334,
        word: "lone",
        wordTranslate: "одинокий"
      },
      {
        audioExample: "files/17_0335_example.mp3",
        textExample: "When the ice melted, it formed a puddle",
        textExampleTranslate: "Когда лед растаял, образовалась лужа",
        id: 335,
        word: "puddle",
        wordTranslate: "лужа"
      },
      {
        audioExample: "files/17_0336_example.mp3",
        textExample: "He asked if I was sad. My response was “No.”",
        textExampleTranslate: "Он спросил, грустно ли мне. Мой ответ был 'Нет'",
        id: 336,
        word: "response",
        wordTranslate: "ответ"
      },
      {
        audioExample: "files/17_0337_example.mp3",
        textExample: "Fall is a warm season, while winter is very cold",
        textExampleTranslate: "Осень - теплое время года, а зима очень холодная",
        id: 337,
        word: "season",
        wordTranslate: "время года"
      },
      {
        audioExample: "files/17_0338_example.mp3",
        textExample: "There are many problems. We need solutions!",
        textExampleTranslate: "Есть много проблем. Нам нужны решения!",
        id: 338,
        word: "solution",
        wordTranslate: "решение"
      },
      {
        audioExample: "files/17_0339_example.mp3",
        textExample: "Turn off the water so you don’t waste it",
        textExampleTranslate: "Выключи воду, чтобы не тратить ее впустую",
        id: 339,
        word: "waste",
        wordTranslate: "отходы"
      },
      {
        audioExample: "files/17_0340_example.mp3",
        textExample: "I could not decide whether to go left or right",
        textExampleTranslate: "Я не мог решить, идти ли налево или направо",
        id: 340,
        word: "whether",
        wordTranslate: "будь то"
      }
    ]
  },
  {
    levelData: {
      id: "1_27",
      name: "An Extensive Wooded Landscape with Travellers on a Path",
      imageSrc: "level1/extensiv_1.jpg",
      cutSrc: "level1/cut/extensiv_1.jpg",
      author: "ARTHOIS, Jacques d'",
      year: "XVII century"
    },
    words: [
      {
        audioExample: "files/18_0341_example.mp3",
        textExample: "They always brush their teeth in the morning",
        textExampleTranslate: "Они всегда чистят зубы по утрам",
        id: 341,
        word: "always",
        wordTranslate: "всегда"
      },
      {
        audioExample: "files/18_0342_example.mp3",
        textExample: "Please ask questions if you do not understand",
        textExampleTranslate: "Пожалуйста, задавайте вопросы, если вы не понимаете",
        id: 342,
        word: "ask",
        wordTranslate: "спросить"
      },
      {
        audioExample: "files/18_0343_example.mp3",
        textExample: "Did you eat a banana for breakfast?",
        textExampleTranslate: "Ты ел банан на завтрак?",
        id: 343,
        word: "banana",
        wordTranslate: "банан"
      },
      {
        audioExample: "files/18_0344_example.mp3",
        textExample: "You need two pieces of bread to make a sandwich",
        textExampleTranslate: "Вам нужно два куска хлеба, чтобы сделать бутерброд",
        id: 344,
        word: "bread",
        wordTranslate: "хлеб"
      },
      {
        audioExample: "files/18_0345_example.mp3",
        textExample: "What a beautiful birthday cake!",
        textExampleTranslate: "Какой красивый торт ко дню рождения!",
        id: 345,
        word: "cake",
        wordTranslate: "торт"
      },
      {
        audioExample: "files/18_0346_example.mp3",
        textExample: "I put a carrot in my salad",
        textExampleTranslate: "Я положил морковку в свой салат",
        id: 346,
        word: "carrot",
        wordTranslate: "морковь"
      },
      {
        audioExample: "files/18_0347_example.mp3",
        textExample: "Chicken is his favorite kind of meat",
        textExampleTranslate: "Курица - его любимый вид мяса",
        id: 347,
        word: "chicken",
        wordTranslate: "курица"
      },
      {
        audioExample: "files/18_0348_example.mp3",
        textExample: "I made a chocolate cake for my mom’s party",
        textExampleTranslate: "Я сделал шоколадный торт для вечеринки моей мамы",
        id: 348,
        word: "chocolate",
        wordTranslate: "шоколад"
      },
      {
        audioExample: "files/18_0349_example.mp3",
        textExample: "I have to find something to contain these apples",
        textExampleTranslate: "Я должен найти что-то, чтобы содержать эти яблоки",
        id: 349,
        word: "contain",
        wordTranslate: "содержать"
      },
      {
        audioExample: "files/18_0350_example.mp3",
        textExample: "I loved the delicious fried chicken I ate for dinner!",
        textExampleTranslate: "Мне очень понравилась вкусная жареная курица, которую я ел на ужин!",
        id: 350,
        word: "delicious",
        wordTranslate: "очень вкусно"
      }
    ]
  },
  {
    levelData: {
      id: "1_28",
      name: "Wooded Landscape",
      imageSrc: "level1/landscap_1.jpg",
      cutSrc: "level1/cut/landscap_1.jpg",
      author: "ARTHOIS, Jacques d'",
      year: "XVII century"
    },
    words: [
      {
        audioExample: "files/18_0351_example.mp3",
        textExample: "His diet mostly consists of fruits and vegetables",
        textExampleTranslate: "Его диета состоит в основном из фруктов и овощей",
        id: 351,
        word: "diet",
        wordTranslate: "рацион питания"
      },
      {
        audioExample: "files/18_0352_example.mp3",
        textExample: "You should eat breakfast every day",
        textExampleTranslate: "Ты должен завтракать каждый день",
        id: 352,
        word: "eat",
        wordTranslate: "есть"
      },
      {
        audioExample: "files/18_0353_example.mp3",
        textExample: "Pasta is a famous food in Italy",
        textExampleTranslate: "Макароны - известная еда в Италии",
        id: 353,
        word: "food",
        wordTranslate: "пища"
      },
      {
        audioExample: "files/18_0354_example.mp3",
        textExample: "Apples, pears, and oranges are types of fruit",
        textExampleTranslate: "Яблоки, груши и апельсины - это виды фруктов",
        id: 354,
        word: "fruit",
        wordTranslate: "фрукты"
      },
      {
        audioExample: "files/18_0355_example.mp3",
        textExample: "It was a great, exciting game!",
        textExampleTranslate: "Это была отличная, захватывающая игра!",
        id: 355,
        word: "great",
        wordTranslate: "великий"
      },
      {
        audioExample: "files/18_0356_example.mp3",
        textExample: "People who want good health should not smoke",
        textExampleTranslate: "Люди, которые хотят хорошего здоровья, не должны курить",
        id: 356,
        word: "health",
        wordTranslate: "здоровье"
      },
      {
        audioExample: "files/18_0357_example.mp3",
        textExample: "Do you use a recipe when you make that sauce?",
        textExampleTranslate: "Ты используешь рецепт, когда готовишь этот соус?",
        id: 357,
        word: "recipe",
        wordTranslate: "рецепт блюда"
      },
      {
        audioExample: "files/18_0358_example.mp3",
        textExample: "Let’s eat at the Indian restaurant",
        textExampleTranslate: "Давайте есть в индийском ресторане",
        id: 358,
        word: "restaurant",
        wordTranslate: "ресторан"
      },
      {
        audioExample: "files/18_0359_example.mp3",
        textExample: "The cupcake was special because it had blue frosting",
        textExampleTranslate: "Кекс был особенным, потому что у него была голубая глазурь",
        id: 359,
        word: "special",
        wordTranslate: "специальный"
      },
      {
        audioExample: "files/18_0360_example.mp3",
        textExample: "Drink eight cups of water every day",
        textExampleTranslate: "Пейте восемь чашек воды каждый день",
        id: 360,
        word: "water",
        wordTranslate: "вода"
      }
    ]
  },
  {
    levelData: {
      id: "1_29",
      name: "Wooded Landscape",
      imageSrc: "level1/woodedla.jpg",
      cutSrc: "level1/cut/woodedla.jpg",
      author: "ARTHOIS, Jacques d'",
      year: "XVII century"
    },
    words: [
      {
        audioExample: "files/19_0362_example.mp3",
        textExample: "I brought home a nice bone for my dog",
        textExampleTranslate: "Я принес домой хорошую собаку для моей собаки",
        id: 362,
        word: "bone",
        wordTranslate: "кость"
      },
      {
        audioExample: "files/19_0363_example.mp3",
        textExample: "No one bothered to wash the dishes today",
        textExampleTranslate: "Никто не удосужился мыть посуду сегодня",
        id: 363,
        word: "bother",
        wordTranslate: "заморачиваться"
      },
      {
        audioExample: "files/19_0364_example.mp3",
        textExample: "The captain sailed his ship to Australia",
        textExampleTranslate: "Капитан отплыл на своем корабле в Австралию",
        id: 364,
        word: "captain",
        wordTranslate: "капитан"
      },
      {
        audioExample: "files/19_0366_example.mp3",
        textExample: "I have doubt that the story is true",
        textExampleTranslate: "Я сомневаюсь, что история правдива",
        id: 366,
        word: "doubt",
        wordTranslate: "сомнение"
      },
      {
        audioExample: "files/19_0367_example.mp3",
        textExample: "He wants to explore the world and see new things",
        textExampleTranslate: "Он хочет исследовать мир и видеть новые вещи",
        id: 367,
        word: "explore",
        wordTranslate: "исследовать"
      },
      {
        audioExample: "files/19_0368_example.mp3",
        textExample: "I am glad you came to my party",
        textExampleTranslate: "Я рад, что ты пришел на мою вечеринку",
        id: 368,
        word: "glad",
        wordTranslate: "рады"
      },
      {
        audioExample: "files/19_0371_example.mp3",
        textExample: "The United Nations is a powerful international organization",
        textExampleTranslate: "Организация Объединенных Наций является мощной международной организацией",
        id: 371,
        word: "international",
        wordTranslate: "международный"
      },
      {
        audioExample: "files/19_0373_example.mp3",
        textExample: "The doctors mentioned the problems that the patient was having",
        textExampleTranslate: "Врачи упомянули о проблемах, с которыми сталкивался пациент",
        id: 373,
        word: "mention",
        wordTranslate: "отметить"
      },
      {
        audioExample: "files/19_0374_example.mp3",
        textExample: "My mother is seventy years old now",
        textExampleTranslate: "Моей маме сейчас семьдесят лет",
        id: 374,
        word: "old",
        wordTranslate: "старый"
      },
      {
        audioExample: "files/19_0376_example.mp3",
        textExample: "People should come together and fix the world’s social problems",
        textExampleTranslate: "Люди должны собраться вместе и решить социальные проблемы мира",
        id: 376,
        word: "social",
        wordTranslate: "социальное"
      }
    ]
  },
  {
    levelData: {
      id: "1_30",
      name: "The Delft City Wall with the Houttuinen",
      imageSrc: "level1/citywall.jpg",
      cutSrc: "level1/cut/citywall.jpg",
      author: "ASCH, Pieter Jansz.van",
      year: "1650"
    },
    words: [
      {
        audioExample: "files/19_0377_example.mp3",
        textExample: "She gave a speech to the class",
        textExampleTranslate: "Она выступила с речью перед классом",
        id: 377,
        word: "speech",
        wordTranslate: "речь"
      },
      {
        audioExample: "files/19_0379_example.mp3",
        textExample: "Santa walked toward my house with a bag of gifts",
        textExampleTranslate: "Санта шел к моему дому с мешком подарков",
        id: 379,
        word: "toward",
        wordTranslate: "в сторону"
      },
      {
        audioExample: "files/19_0380_example.mp3",
        textExample: "I put the pieces of wood in a pile",
        textExampleTranslate: "Я положил кусочки дерева в кучу",
        id: 380,
        word: "wood",
        wordTranslate: "дерево"
      },
      {
        audioExample: "files/20_0381_example.mp3",
        textExample: "I was happy that I could achieve my goal",
        textExampleTranslate: "Я был счастлив, что смог достичь своей цели",
        id: 381,
        word: "achieve",
        wordTranslate: "достижения"
      },
      {
        audioExample: "files/20_0382_example.mp3",
        textExample: "My mother often advises people about their money",
        textExampleTranslate: "Моя мама часто советует людям об их деньгах",
        id: 382,
        word: "advise",
        wordTranslate: "советовать"
      },
      {
        audioExample: "files/20_0384_example.mp3",
        textExample: "I learned some basic English skills in school today",
        textExampleTranslate: "Я выучил некоторые базовые навыки английского в школе сегодня",
        id: 384,
        word: "basic",
        wordTranslate: "базовый"
      },
      {
        audioExample: "files/20_0387_example.mp3",
        textExample: "The glass was destroyed",
        textExampleTranslate: "Стекло было разрушено",
        id: 387,
        word: "destroy",
        wordTranslate: "уничтожить"
      },
      {
        audioExample: "files/20_0388_example.mp3",
        textExample: "The clown entertained the kids at the party",
        textExampleTranslate: "Клоун развлекал детей на вечеринке",
        id: 388,
        word: "entertain",
        wordTranslate: "развлекать"
      },
      {
        audioExample: "files/20_0389_example.mp3",
        textExample: "The squirrel had extra nuts for the winter",
        textExampleTranslate: "У белки были дополнительные орехи на зиму",
        id: 389,
        word: "extra",
        wordTranslate: "экстра"
      },
      {
        audioExample: "files/20_0390_example.mp3",
        textExample: "Her goal was to become a doctor",
        textExampleTranslate: "Ее целью было стать врачом",
        id: 390,
        word: "goal",
        wordTranslate: "цель"
      }
    ]
  },
  {
    levelData: {
      id: "1_31",
      name: "River Landscape",
      imageSrc: "level1/river_la.jpg",
      cutSrc: "level1/cut/river_la.jpg",
      author: "ASCH, Pieter Jansz. van",
      year: "1640"
    },
    words: [
      {
        audioExample: "files/20_0391_example.mp3",
        textExample: "Whenever Pinocchio lied to his father, his nose grew",
        textExampleTranslate: "Всякий раз, когда Пиноккио лгал своему отцу, его нос рос",
        id: 391,
        word: "lie",
        wordTranslate: "ложь"
      },
      {
        audioExample: "files/20_0392_example.mp3",
        textExample: "This piece of meat I’m eating tastes very good",
        textExampleTranslate: "Этот кусок мяса, который я ем, имеет очень хороший вкус",
        id: 392,
        word: "meat",
        wordTranslate: "мясо"
      },
      {
        audioExample: "files/20_0395_example.mp3",
        textExample: "Her face was reflected in the smooth glass",
        textExampleTranslate: "Ее лицо отражалось в гладком стекле",
        id: 395,
        word: "reflect",
        wordTranslate: "отражать"
      },
      {
        audioExample: "files/20_0396_example.mp3",
        textExample: "The boy regarded the girl as a good friend",
        textExampleTranslate: "Мальчик считал девушку хорошим другом",
        id: 396,
        word: "regard",
        wordTranslate: "учитывая"
      },
      {
        audioExample: "files/20_0397_example.mp3",
        textExample: "He served us our drinks quickly",
        textExampleTranslate: "Он подал нам наши напитки быстро",
        id: 397,
        word: "serve",
        wordTranslate: "обслуживать"
      },
      {
        audioExample: "files/20_0398_example.mp3",
        textExample: "Carrots are my favorite vegetable",
        textExampleTranslate: "Морковь - мой любимый овощ",
        id: 398,
        word: "vegetable",
        wordTranslate: "растительное"
      },
      {
        audioExample: "files/20_0399_example.mp3",
        textExample: "Many young men died in the war",
        textExampleTranslate: "Многие молодые люди погибли на войне",
        id: 399,
        word: "war",
        wordTranslate: "война"
      },
      {
        audioExample: "files/20_0400_example.mp3",
        textExample: "Our house is worth a lot of money",
        textExampleTranslate: "Наш дом стоит много денег",
        id: 400,
        word: "worth",
        wordTranslate: "ценность"
      },
      {
        audioExample: "files/21_0401_example.mp3",
        textExample: "She appeared to be sad. She was crying",
        textExampleTranslate: "Она казалась грустной. Она плакала",
        id: 401,
        word: "appear",
        wordTranslate: "появляются"
      },
      {
        audioExample: "files/21_0402_example.mp3",
        textExample: "The base of the table has three legs",
        textExampleTranslate: "У основания стола три ножки",
        id: 402,
        word: "base",
        wordTranslate: "база"
      }
    ]
  },
  {
    levelData: {
      id: "1_32",
      name: "View of Killarney",
      imageSrc: "level1/kilarney.jpg",
      cutSrc: "level1/cut/kilarney.jpg",
      author: "ASHFORD, William",
      year: "1778"
    },
    words: [
      {
        audioExample: "files/21_0403_example.mp3",
        textExample: "You must use your brain to solve the problem",
        textExampleTranslate: "Вы должны использовать свой мозг, чтобы решить проблему",
        id: 403,
        word: "brain",
        wordTranslate: "головной мозг"
      },
      {
        audioExample: "files/21_0405_example.mp3",
        textExample: "The clerk added up her bill for the groceries",
        textExampleTranslate: "Клерк сложил свой счет за продукты",
        id: 405,
        word: "clerk",
        wordTranslate: "клерк"
      },
      {
        audioExample: "files/21_0406_example.mp3",
        textExample: "He always puts a lot of effort into his studies",
        textExampleTranslate: "Он всегда прикладывает много усилий к учебе",
        id: 406,
        word: "effort",
        wordTranslate: "усилие"
      },
      {
        audioExample: "files/21_0407_example.mp3",
        textExample: "Two guards greeted me as I entered the front door",
        textExampleTranslate: "Два охранника встретили меня, когда я вошел в переднюю дверь",
        id: 407,
        word: "enter",
        wordTranslate: "войти"
      },
      {
        audioExample: "files/21_0408_example.mp3",
        textExample: "I got an excellent score on my school test",
        textExampleTranslate: "Я получил отличную оценку на школьном тесте",
        id: 408,
        word: "excellent",
        wordTranslate: "отлично"
      },
      {
        audioExample: "files/21_0410_example.mp3",
        textExample: "I hurried home on my bike",
        textExampleTranslate: "Я поспешил домой на своем велосипеде",
        id: 410,
        word: "hurry",
        wordTranslate: "торопиться"
      },
      {
        audioExample: "files/21_0411_example.mp3",
        textExample: "I called and informed her about my idea",
        textExampleTranslate: "Я позвонил и сообщил ей о своей идее",
        id: 411,
        word: "inform",
        wordTranslate: "сообщить"
      },
      {
        audioExample: "files/21_0414_example.mp3",
        textExample: "I could not locate my keys in the house",
        textExampleTranslate: "Я не мог найти свои ключи в доме",
        id: 414,
        word: "locate",
        wordTranslate: "найти"
      },
      {
        audioExample: "files/21_0415_example.mp3",
        textExample: "A nurse helped me get better",
        textExampleTranslate: "Медсестра помогла мне поправиться",
        id: 415,
        word: "nurse",
        wordTranslate: "медсестра"
      },
      {
        audioExample: "files/21_0416_example.mp3",
        textExample: "The operation on my arm was a success",
        textExampleTranslate: "Операция на моей руке прошла успешно",
        id: 416,
        word: "operation",
        wordTranslate: "операция"
      }
    ]
  },
  {
    levelData: {
      id: "1_33",
      name: "Landscape with Waterfall and Farm",
      imageSrc: "level1/waterfal.jpg",
      cutSrc: "level1/cut/waterfal.jpg",
      author: "ASSCHE, Henri van",
      year: "1806"
    },
    words: [
      {
        audioExample: "files/21_0417_example.mp3",
        textExample: "His head was full of pain",
        textExampleTranslate: "Его голова была полна боли",
        id: 417,
        word: "pain",
        wordTranslate: "боль"
      },
      {
        audioExample: "files/21_0418_example.mp3",
        textExample: "The dog refused to play with the cat",
        textExampleTranslate: "Собака отказалась играть с кошкой",
        id: 418,
        word: "refuse",
        wordTranslate: "отказываться"
      },
      {
        audioExample: "files/21_0419_example.mp3",
        textExample: "Though he was overweight, he liked to be active",
        textExampleTranslate: "Хотя он весил больше нормы, ему нравилось быть активным",
        id: 419,
        word: "though",
        wordTranslate: "хоть"
      },
      {
        audioExample: "files/21_0420_example.mp3",
        textExample: "She owned shoes of various styles",
        textExampleTranslate: "Она владела обувью разных стилей",
        id: 420,
        word: "various",
        wordTranslate: "разные"
      },
      {
        audioExample: "files/22_0422_example.mp3",
        textExample: "The news in the paper amazed Jack",
        textExampleTranslate: "Новости в газете поразили Джека",
        id: 422,
        word: "amaze",
        wordTranslate: "поражают"
      },
      {
        audioExample: "files/22_0423_example.mp3",
        textExample: "The charge for the shirts was $15",
        textExampleTranslate: "Плата за футболки составила 15 долларов",
        id: 423,
        word: "charge",
        wordTranslate: "обвинять"
      },
      {
        audioExample: "files/22_0425_example.mp3",
        textExample: "I contacted Sue about my party",
        textExampleTranslate: "Я связался с Сью по поводу моей вечеринки",
        id: 425,
        word: "contact",
        wordTranslate: "контакт"
      },
      {
        audioExample: "files/22_0426_example.mp3",
        textExample: "The customer put a few items in a bag",
        textExampleTranslate: "Клиент положил несколько вещей в сумку",
        id: 426,
        word: "customer",
        wordTranslate: "клиент"
      },
      {
        audioExample: "files/22_0427_example.mp3",
        textExample: "The man delivered Chinese food to my house",
        textExampleTranslate: "Мужчина доставил китайскую еду в мой дом",
        id: 427,
        word: "deliver",
        wordTranslate: "доставить"
      },
      {
        audioExample: "files/22_0430_example.mp3",
        textExample: "Does this meal include a soft drink?",
        textExampleTranslate: "Включает ли это блюдо безалкогольный напиток?",
        id: 430,
        word: "include",
        wordTranslate: "включают"
      }
    ]
  },
  {
    levelData: {
      id: "1_34",
      name: "Winter Landscape",
      imageSrc: "level1/winterla_1.jpg",
      cutSrc: "level1/cut/winterla_1.jpg",
      author: "ASSCHE, Henri van",
      year: "1814"
    },
    words: [
      {
        audioExample: "files/22_0431_example.mp3",
        textExample: "I had to manage the meeting myself",
        textExampleTranslate: "Я должен был сам управлять встречей",
        id: 431,
        word: "manage",
        wordTranslate: "управлять"
      },
      {
        audioExample: "files/22_0433_example.mp3",
        textExample: "When did the thunderstorm occur?",
        textExampleTranslate: "Когда произошла гроза?",
        id: 433,
        word: "occur",
        wordTranslate: "происходят"
      },
      {
        audioExample: "files/22_0434_example.mp3",
        textExample: "The opposite of black is white",
        textExampleTranslate: "Противоположность черного есть белое",
        id: 434,
        word: "opposite",
        wordTranslate: "напротив"
      },
      {
        audioExample: "files/22_0436_example.mp3",
        textExample: "I received a present on my birthday",
        textExampleTranslate: "Я получил подарок на мой день рождения",
        id: 436,
        word: "receive",
        wordTranslate: "получать"
      },
      {
        audioExample: "files/22_0437_example.mp3",
        textExample: "He was given a reward for his excellent performance",
        textExampleTranslate: "Он получил награду за отличную работу",
        id: 437,
        word: "reward",
        wordTranslate: "награда"
      },
      {
        audioExample: "files/22_0438_example.mp3",
        textExample: "Please set the dice down on the table",
        textExampleTranslate: "Пожалуйста, поставьте кости на стол",
        id: 438,
        word: "set",
        wordTranslate: "набор"
      },
      {
        audioExample: "files/22_0439_example.mp3",
        textExample: "The men tried to steal money from the bank",
        textExampleTranslate: "Мужчины пытались украсть деньги из банка",
        id: 439,
        word: "steal",
        wordTranslate: "украсть"
      },
      {
        audioExample: "files/23_0441_example.mp3",
        textExample: "He advanced across the bridge slowly",
        textExampleTranslate: "Он медленно продвигался через мост",
        id: 441,
        word: "advance",
        wordTranslate: "вперед"
      },
      {
        audioExample: "files/23_0442_example.mp3",
        textExample: "Some athletes can play many sports very well",
        textExampleTranslate: "Некоторые спортсмены могут очень хорошо заниматься многими видами спорта",
        id: 442,
        word: "athlete",
        wordTranslate: "спортсмен"
      },
      {
        audioExample: "files/23_0443_example.mp3",
        textExample: "I’m not rich or poor; I’m average",
        textExampleTranslate: "Я не богат или не беден; я средний",
        id: 443,
        word: "average",
        wordTranslate: "средний"
      }
    ]
  },
  {
    levelData: {
      id: "1_35",
      name: "Coastal Scene with Resting Riders",
      imageSrc: "level1/coastal.jpg",
      cutSrc: "level1/cut/coastal.jpg",
      author: "ASSELYN, Jan",
      year: "1652"
    },
    words: [
      {
        audioExample: "files/23_0444_example.mp3",
        textExample: "Their behavior was good this semester. They didn’t cause trouble",
        textExampleTranslate: "Их поведение было хорошим в этом семестре. Они не доставляли хлопот",
        id: 444,
        word: "behavior",
        wordTranslate: "поведение"
      },
      {
        audioExample: "files/23_0445_example.mp3",
        textExample: "The little girl was hiding behind a tree",
        textExampleTranslate: "Маленькая девочка пряталась за деревом",
        id: 445,
        word: "behind",
        wordTranslate: "позади"
      },
      {
        audioExample: "files/23_0446_example.mp3",
        textExample: "I took a P.E. course in school this year",
        textExampleTranslate: "В этом году я прошел курс обучения в школе",
        id: 446,
        word: "course",
        wordTranslate: "курс"
      },
      {
        audioExample: "files/23_0448_example.mp3",
        textExample: "The two shoes matched. They looked the same",
        textExampleTranslate: "Две туфли совпали. Они выглядели одинаково",
        id: 448,
        word: "match",
        wordTranslate: "матч"
      },
      {
        audioExample: "files/23_0449_example.mp3",
        textExample: "Julie is the newest member of our team",
        textExampleTranslate: "Джули - самый новый член нашей команды",
        id: 449,
        word: "member",
        wordTranslate: "член"
      },
      {
        audioExample: "files/23_0450_example.mp3",
        textExample: "I made a mental picture of the room",
        textExampleTranslate: "Я сделал мысленную картину комнаты",
        id: 450,
        word: "mental",
        wordTranslate: "психического"
      },
      {
        audioExample: "files/23_0451_example.mp3",
        textExample: "One passenger was standing near the subway train",
        textExampleTranslate: "Один пассажир стоял возле поезда метро",
        id: 451,
        word: "passenger",
        wordTranslate: "пассажир"
      },
      {
        audioExample: "files/23_0452_example.mp3",
        textExample: "John has a bad personality",
        textExampleTranslate: "У Джона плохая личность",
        id: 452,
        word: "personality",
        wordTranslate: "личность"
      },
      {
        audioExample: "files/23_0453_example.mp3",
        textExample: "William Shakespeare wrote many poems",
        textExampleTranslate: "Уильям Шекспир написал много стихов",
        id: 453,
        word: "poem",
        wordTranslate: "стихотворение"
      },
      {
        audioExample: "files/23_0454_example.mp3",
        textExample: "The flag was hanging from the flag pole",
        textExampleTranslate: "Флаг висел на флагштоке",
        id: 454,
        word: "pole",
        wordTranslate: "столб"
      }
    ]
  },
  {
    levelData: {
      id: "1_36",
      name: "Italianate Landscape with a River and an Arched Bridge",
      imageSrc: "level1/italiana.jpg",
      cutSrc: "level1/cut/italiana.jpg",
      author: "ASSELYN, Jan",
      year: "1648"
    },
    words: [
      {
        audioExample: "files/23_0455_example.mp3",
        textExample: "I removed the nail from the board",
        textExampleTranslate: "Я снял гвоздь с доски",
        id: 455,
        word: "remove",
        wordTranslate: "удалить"
      },
      {
        audioExample: "files/23_0457_example.mp3",
        textExample: "The hunter raised his gun to shoot at the target",
        textExampleTranslate: "Охотник поднял ружье, чтобы выстрелить в цель",
        id: 457,
        word: "shoot",
        wordTranslate: "стрелять"
      },
      {
        audioExample: "files/23_0458_example.mp3",
        textExample: "The alarm clock sounded and woke us all up",
        textExampleTranslate: "Прозвучал будильник и разбудил нас всех",
        id: 458,
        word: "sound",
        wordTranslate: "звук"
      },
      {
        audioExample: "files/23_0459_example.mp3",
        textExample: "I love to swim in the ocean",
        textExampleTranslate: "Я люблю плавать в океане",
        id: 459,
        word: "swim",
        wordTranslate: "плавать"
      },
      {
        audioExample: "files/23_0460_example.mp3",
        textExample: "Mom cleaned the spider webs out of the garage",
        textExampleTranslate: "Мама убрала паутину из гаража",
        id: 460,
        word: "web",
        wordTranslate: "паутина"
      },
      {
        audioExample: "files/24_0461_example.mp3",
        textExample: "I saw a block of ice on the floor",
        textExampleTranslate: "Я видел кусок льда на полу",
        id: 461,
        word: "block",
        wordTranslate: "блок"
      },
      {
        audioExample: "files/24_0462_example.mp3",
        textExample: "My father was buried in his hometown when he died",
        textExampleTranslate: "Мой отец был похоронен в своем родном городе, когда он умер",
        id: 462,
        word: "bury",
        wordTranslate: "похоронить"
      },
      {
        audioExample: "files/24_0463_example.mp3",
        textExample: "The crowd all cheered when the home team won",
        textExampleTranslate: "Толпа всех приветствовала, когда победила хозяева",
        id: 463,
        word: "cheer",
        wordTranslate: "поболеть"
      },
      {
        audioExample: "files/24_0467_example.mp3",
        textExample: "Finishing high school was a major event in his life",
        textExampleTranslate: "Окончание средней школы было главным событием в его жизни",
        id: 467,
        word: "event",
        wordTranslate: "событие"
      },
      {
        audioExample: "files/24_0468_example.mp3",
        textExample: "You should exercise every day",
        textExampleTranslate: "Ты должен заниматься каждый день",
        id: 468,
        word: "exercise",
        wordTranslate: "упражнение"
      }
    ]
  },
  {
    levelData: {
      id: "1_37",
      name: "Italianate Landscape with Peasants and Animals Fording a River",
      imageSrc: "level1/italianb.jpg",
      cutSrc: "level1/cut/italianb.jpg",
      author: "ASSELYN, Jan",
      year: "1640-45"
    },
    words: [
      {
        audioExample: "files/24_0470_example.mp3",
        textExample: "We followed a guide at the park",
        textExampleTranslate: "Мы следовали за гидом в парке",
        id: 470,
        word: "guide",
        wordTranslate: "руководство"
      },
      {
        audioExample: "files/24_0471_example.mp3",
        textExample: "His only problem is a lack of money",
        textExampleTranslate: "Его единственная проблема - нехватка денег",
        id: 471,
        word: "lack",
        wordTranslate: "отсутствие"
      },
      {
        audioExample: "files/24_0472_example.mp3",
        textExample: "He will perform a song for the class",
        textExampleTranslate: "Он исполнит песню для класса",
        id: 472,
        word: "perform",
        wordTranslate: "выполнить"
      },
      {
        audioExample: "files/24_0473_example.mp3",
        textExample: "They put pressure on him to change his mind",
        textExampleTranslate: "Они заставляют его передумать",
        id: 473,
        word: "pressure",
        wordTranslate: "давление"
      },
      {
        audioExample: "files/24_0476_example.mp3",
        textExample: "Mary is a smart student",
        textExampleTranslate: "Мария умная ученица",
        id: 476,
        word: "smart",
        wordTranslate: "умный"
      },
      {
        audioExample: "files/24_0477_example.mp3",
        textExample: "She struck the other girl in the face",
        textExampleTranslate: "Она ударила другую девушку по лицу",
        id: 477,
        word: "strike",
        wordTranslate: "забастовка"
      },
      {
        audioExample: "files/24_0478_example.mp3",
        textExample: "Everyone at work supports the new plan",
        textExampleTranslate: "Все на работе поддерживают новый план",
        id: 478,
        word: "support",
        wordTranslate: "служба поддержки"
      },
      {
        audioExample: "files/24_0480_example.mp3",
        textExample: "If we unite, we can finish our project faster",
        textExampleTranslate: "Если мы объединимся, мы сможем завершить наш проект быстрее",
        id: 480,
        word: "unite",
        wordTranslate: "объединить"
      },
      {
        audioExample: "files/25_0481_example.mp3",
        textExample: "Most people associate birthday parties with having fun",
        textExampleTranslate: "У большинства людей дни рождения ассоциируются с весельем",
        id: 481,
        word: "associate",
        wordTranslate: "ассоциировать"
      },
      {
        audioExample: "files/25_0482_example.mp3",
        textExample: "Keeping our environment clean is important to our health",
        textExampleTranslate: "Поддержание нашей окружающей среды в чистоте важно для нашего здоровья",
        id: 482,
        word: "environment",
        wordTranslate: "окружающая обстановка"
      }
    ]
  },
  {
    levelData: {
      id: "1_38",
      name: "Landscape with Frozen River",
      imageSrc: "level1/landscap_2.jpg",
      cutSrc: "level1/cut/landscap_2.jpg",
      author: "AVERCAMP, Barend",
      year: "1655"
    },
    words: [
      {
        audioExample: "files/25_0483_example.mp3",
        textExample: "We have only one factory in our town",
        textExampleTranslate: "У нас только один завод в нашем городе",
        id: 483,
        word: "factory",
        wordTranslate: "фабрика"
      },
      {
        audioExample: "files/25_0484_example.mp3",
        textExample: "The cell phone has many features",
        textExampleTranslate: "У мобильного телефона много функций",
        id: 484,
        word: "feature",
        wordTranslate: "характерная черта"
      },
      {
        audioExample: "files/25_0485_example.mp3",
        textExample: "I have never experienced an instance of hate. Have you?",
        textExampleTranslate: "Я никогда не испытывал ненависти. А ты?",
        id: 485,
        word: "instance",
        wordTranslate: "пример"
      },
      {
        audioExample: "files/25_0486_example.mp3",
        textExample: "The whole family was involved in playing the game",
        textExampleTranslate: "Вся семья была вовлечена в игру",
        id: 486,
        word: "involve",
        wordTranslate: "включать"
      },
      {
        audioExample: "files/25_0487_example.mp3",
        textExample: "The doctor gave me medicine for my cold",
        textExampleTranslate: "Доктор дал мне лекарство от простуды",
        id: 487,
        word: "medicine",
        wordTranslate: "лекарство"
      },
      {
        audioExample: "files/25_0490_example.mp3",
        textExample: "In one period in Europe, there were many knights",
        textExampleTranslate: "За один период в Европе было много рыцарей",
        id: 490,
        word: "period",
        wordTranslate: "период"
      },
      {
        audioExample: "files/25_0491_example.mp3",
        textExample: "Billions of people populate the Earth",
        textExampleTranslate: "Миллиарды людей населяют Землю",
        id: 491,
        word: "populate",
        wordTranslate: "заселить"
      },
      {
        audioExample: "files/25_0492_example.mp3",
        textExample: "This tree produces apples every year",
        textExampleTranslate: "Это дерево производит яблоки каждый год",
        id: 492,
        word: "produce",
        wordTranslate: "производить"
      },
      {
        audioExample: "files/25_0493_example.mp3",
        textExample: "I saw a range of cars to choose from",
        textExampleTranslate: "Я видел целый ряд автомобилей на выбор",
        id: 493,
        word: "range",
        wordTranslate: "спектр"
      },
      {
        audioExample: "files/25_0494_example.mp3",
        textExample: "I recognized an old friend from many years ago",
        textExampleTranslate: "Я узнал старого друга много лет назад",
        id: 494,
        word: "recognize",
        wordTranslate: "признают"
      }
    ]
  },
  {
    levelData: {
      id: "1_39",
      name: "Ice Landscape",
      imageSrc: "level1/ice_land.jpg",
      cutSrc: "level1/cut/ice_land.jpg",
      author: "AVERCAMP, Hendrick",
      year: "XVII century"
    },
    words: [
      {
        audioExample: "files/25_0495_example.mp3",
        textExample: "Our regular lunch time is around noon",
        textExampleTranslate: "Мы регулярно обедаем около полудня",
        id: 495,
        word: "regular",
        wordTranslate: "стабильный"
      },
      {
        audioExample: "files/25_0496_example.mp3",
        textExample: "The sign indicated that today would be a bad day",
        textExampleTranslate: "Знак указывает, что сегодня будет плохой день",
        id: 496,
        word: "sign",
        wordTranslate: "подписать"
      },
      {
        audioExample: "files/25_0497_example.mp3",
        textExample: "The tip of his pen was very sharp",
        textExampleTranslate: "Кончик его ручки был очень острым",
        id: 497,
        word: "tip",
        wordTranslate: "подсказка"
      },
      {
        audioExample: "files/25_0498_example.mp3",
        textExample: "Marriage is a tradition all over the world",
        textExampleTranslate: "Брак - это традиция во всем мире",
        id: 498,
        word: "tradition",
        wordTranslate: "традиция"
      },
      {
        audioExample: "files/25_0499_example.mp3",
        textExample: "Please take out the trash; it smells bad",
        textExampleTranslate: "Пожалуйста, выньте мусор; он плохо пахнет",
        id: 499,
        word: "trash",
        wordTranslate: "мусор"
      },
      {
        audioExample: "files/25_0500_example.mp3",
        textExample: "The door was as wide as my arms",
        textExampleTranslate: "Дверь была такая же широкая, как мои руки",
        id: 500,
        word: "wide",
        wordTranslate: "широкий"
      },
      {
        audioExample: "files/26_0503_example.mp3",
        textExample: "His work got the attention of two of his co-workers",
        textExampleTranslate: "Его работа привлекла внимание двух его сотрудников",
        id: 503,
        word: "attention",
        wordTranslate: "внимание"
      },
      {
        audioExample: "files/26_0504_example.mp3",
        textExample: "The magnet attracted the metal",
        textExampleTranslate: "Магнит притягивал металл",
        id: 504,
        word: "attract",
        wordTranslate: "привлечь"
      },
      {
        audioExample: "files/26_0505_example.mp3",
        textExample: "The girls climbed to the top of the mountain",
        textExampleTranslate: "Девчонки забрались на вершину горы",
        id: 505,
        word: "climb",
        wordTranslate: "подняться"
      },
      {
        audioExample: "files/26_0506_example.mp3",
        textExample: "A small amount of water dropped from the bottle",
        textExampleTranslate: "из бутылки выпало небольшое количество воды",
        id: 506,
        word: "drop",
        wordTranslate: "падение"
      }
    ]
  },
  {
    levelData: {
      id: "1_40",
      name: "Arabs on Horseback",
      imageSrc: "level1/arabs.jpg",
      cutSrc: "level1/cut/arabs.jpg",
      author: "AZEGLIO, Massimo Taparelli, Marquis d'",
      year: "1840"
    },
    words: [
      {
        audioExample: "files/26_0508_example.mp3",
        textExample: "The escalator is further than I thought",
        textExampleTranslate: "Эскалатор дальше, чем я думал",
        id: 508,
        word: "further",
        wordTranslate: "дальше"
      },
      {
        audioExample: "files/26_0510_example.mp3",
        textExample: "The balls maintain constant movement",
        textExampleTranslate: "Шарики поддерживают постоянное движение",
        id: 510,
        word: "maintain",
        wordTranslate: "поддерживать"
      },
      {
        audioExample: "files/26_0512_example.mp3",
        textExample: "It’s good to stay active; otherwise, you’ll gain weight",
        textExampleTranslate: "Хорошо быть активным, иначе ты наберешь вес",
        id: 512,
        word: "otherwise",
        wordTranslate: "в противном случае"
      },
      {
        audioExample: "files/26_0513_example.mp3",
        textExample: "Biking is good for your physical health",
        textExampleTranslate: "Езда на велосипеде полезна для вашего физического здоровья",
        id: 513,
        word: "physical",
        wordTranslate: "физический"
      },
      {
        audioExample: "files/26_0514_example.mp3",
        textExample: "My teacher proved the answer on the board",
        textExampleTranslate: "Мой учитель доказал ответ на доске",
        id: 514,
        word: "prove",
        wordTranslate: "доказать"
      },
      {
        audioExample: "files/26_0515_example.mp3",
        textExample: "James reacted badly to the news",
        textExampleTranslate: "Джеймс плохо отреагировал на новости",
        id: 515,
        word: "react",
        wordTranslate: "реагируют"
      },
      {
        audioExample: "files/26_0517_example.mp3",
        textExample: "The whiteboard is situated between the two men",
        textExampleTranslate: "Доска расположена между двумя мужчинами",
        id: 517,
        word: "situated",
        wordTranslate: "расположенный"
      },
      {
        audioExample: "files/26_0518_example.mp3",
        textExample: "Society expects people to be good and honest",
        textExampleTranslate: "Общество ожидает, что люди будут хорошими и честными",
        id: 518,
        word: "society",
        wordTranslate: "общество"
      },
      {
        audioExample: "files/26_0519_example.mp3",
        textExample: "This older model TV is below our store’s standards",
        textExampleTranslate: "Эта старая модель телевизора не соответствует стандартам нашего магазина",
        id: 519,
        word: "standard",
        wordTranslate: "стандарт"
      },
      {
        audioExample: "files/26_0520_example.mp3",
        textExample: "He suggested that we go to see his boss",
        textExampleTranslate: "Он предложил пойти к его боссу",
        id: 520,
        word: "suggest",
        wordTranslate: "предложить"
      }
    ]
  },
  {
    levelData: {
      id: "1_41",
      name: "Ships in Distress off a Rocky Coast",
      imageSrc: "level1/distress.jpg",
      cutSrc: "level1/cut/distress.jpg",
      author: "BACKHUYSEN, Ludolf",
      year: "1667"
    },
    words: [
      {
        audioExample: "files/27_0522_example.mp3",
        textExample: "The boy took a big bite of his hamburger",
        textExampleTranslate: "Мальчик откусил гамбургер",
        id: 522,
        word: "bite",
        wordTranslate: "укусить"
      },
      {
        audioExample: "files/27_0523_example.mp3",
        textExample: "I stayed on the southern coast of Australia",
        textExampleTranslate: "Я остался на южном побережье Австралии",
        id: 523,
        word: "coast",
        wordTranslate: "побережье"
      },
      {
        audioExample: "files/27_0525_example.mp3",
        textExample: "Not many plants grow in the desert",
        textExampleTranslate: "В пустыне мало растений",
        id: 525,
        word: "desert",
        wordTranslate: "пустыня"
      },
      {
        audioExample: "files/27_0526_example.mp3",
        textExample: "Swimming is an effective way to stay healthy",
        textExampleTranslate: "Плавание - эффективный способ оставаться здоровым",
        id: 526,
        word: "effective",
        wordTranslate: "эффективный"
      },
      {
        audioExample: "files/27_0527_example.mp3",
        textExample: "The doctor examined my eyes today",
        textExampleTranslate: "Доктор осмотрел мои глаза сегодня",
        id: 527,
        word: "examine",
        wordTranslate: "исследовать"
      },
      {
        audioExample: "files/27_0529_example.mp3",
        textExample: "I couldn’t figure out what he wanted me to do",
        textExampleTranslate: "Я не мог понять, что он от меня хотел",
        id: 529,
        word: "figure out",
        wordTranslate: "выяснять"
      },
      {
        audioExample: "files/27_0530_example.mp3",
        textExample: "Dave received many gifts for Christmas",
        textExampleTranslate: "Дейв получил много подарков на Рождество",
        id: 530,
        word: "gift",
        wordTranslate: "подарок"
      },
      {
        audioExample: "files/27_0531_example.mp3",
        textExample: "After playing all day long, he was filled with hunger",
        textExampleTranslate: "После целого дня игры он был полон голода",
        id: 531,
        word: "hunger",
        wordTranslate: "голод"
      },
      {
        audioExample: "files/27_0532_example.mp3",
        textExample: "Sally imagined herself winning lots of money",
        textExampleTranslate: "Салли представила, что выигрывает много денег",
        id: 532,
        word: "imagine",
        wordTranslate: "представить"
      },
      {
        audioExample: "files/27_0534_example.mp3",
        textExample: "The question was a puzzle to him",
        textExampleTranslate: "Вопрос был для него загадкой",
        id: 534,
        word: "puzzle",
        wordTranslate: "головоломка"
      }
    ]
  },
  {
    levelData: {
      id: "1_42",
      name: "A Fishing Pink",
      imageSrc: "level1/fishing.jpg",
      cutSrc: "level1/cut/fishing.jpg",
      author: "BACKHUYSEN, Ludolf",
      year: "1680"
    },
    words: [
      {
        audioExample: "files/27_0535_example.mp3",
        textExample: "I think typing on a keyboard is quite easy",
        textExampleTranslate: "Я думаю, что набирать текст на клавиатуре довольно просто",
        id: 535,
        word: "quite",
        wordTranslate: "довольно"
      },
      {
        audioExample: "files/27_0537_example.mp3",
        textExample: "Please choose a specific place on the map",
        textExampleTranslate: "Пожалуйста, выберите конкретное место на карте",
        id: 537,
        word: "specific",
        wordTranslate: "конкретный"
      },
      {
        audioExample: "files/27_0539_example.mp3",
        textExample: "I took a tour of Asia and Europe",
        textExampleTranslate: "Я взял тур по Азии и Европе",
        id: 539,
        word: "tour",
        wordTranslate: "тур"
      },
      {
        audioExample: "files/27_0540_example.mp3",
        textExample: "Ken took a trip to the city yesterday",
        textExampleTranslate: "Кен отправился в город вчера",
        id: 540,
        word: "trip",
        wordTranslate: "поездка"
      },
      {
        audioExample: "files/28_0541_example.mp3",
        textExample: "My brother is in a rock band",
        textExampleTranslate: "Мой брат в рок-группе",
        id: 541,
        word: "band",
        wordTranslate: "группа"
      },
      {
        audioExample: "files/28_0543_example.mp3",
        textExample: "I think the Internet is boring",
        textExampleTranslate: "Я думаю, что Интернет скучен",
        id: 543,
        word: "boring",
        wordTranslate: "скучно"
      },
      {
        audioExample: "files/28_0545_example.mp3",
        textExample: "The long driveway led us to their new house",
        textExampleTranslate: "Долгий путь привел нас к их новому дому",
        id: 545,
        word: "driveway",
        wordTranslate: "подъездные пути"
      },
      {
        audioExample: "files/28_0546_example.mp3",
        textExample: "The boy cleaned up the garbage around his house",
        textExampleTranslate: "Мальчик убрал мусор вокруг своего дома",
        id: 546,
        word: "garbage",
        wordTranslate: "мусор"
      },
      {
        audioExample: "files/28_0547_example.mp3",
        textExample: "My favorite musical instrument is the piano",
        textExampleTranslate: "Мой любимый музыкальный инструмент - пианино",
        id: 547,
        word: "instrument",
        wordTranslate: "инструмент"
      },
      {
        audioExample: "files/28_0548_example.mp3",
        textExample: "My mom makes a list of groceries to buy",
        textExampleTranslate: "Моя мама составляет список покупок",
        id: 548,
        word: "list",
        wordTranslate: "список"
      }
    ]
  },
  {
    levelData: {
      id: "1_43",
      name: "Shipping by the Dutch Coast",
      imageSrc: "level1/shipping_1.jpg",
      cutSrc: "level1/cut/shipping_1.jpg",
      author: "BACKHUYSEN, Ludolf",
      year: "XVII century"
    },
    words: [
      {
        audioExample: "files/28_0550_example.mp3",
        textExample: "I left a message for you in the envelope",
        textExampleTranslate: "Я оставил тебе сообщение в конверте",
        id: 550,
        word: "message",
        wordTranslate: "сообщение"
      },
      {
        audioExample: "files/28_0551_example.mp3",
        textExample: "Did you notice the view?",
        textExampleTranslate: "Вы заметили вид?",
        id: 551,
        word: "notice",
        wordTranslate: "уведомление"
      },
      {
        audioExample: "files/28_0552_example.mp3",
        textExample: "My grandfather owns that house",
        textExampleTranslate: "Мой дедушка владеет этим домом",
        id: 552,
        word: "own",
        wordTranslate: "своя"
      },
      {
        audioExample: "files/28_0553_example.mp3",
        textExample: "She predicted that I would get married next year",
        textExampleTranslate: "Она предсказала, что я выйду замуж в следующем году",
        id: 553,
        word: "predict",
        wordTranslate: "предсказать"
      },
      {
        audioExample: "files/28_0554_example.mp3",
        textExample: "Mike’s science professor knows a lot about physics",
        textExampleTranslate: "Профессор Майка много знает о физике",
        id: 554,
        word: "professor",
        wordTranslate: "профессор"
      },
      {
        audioExample: "files/28_0555_example.mp3",
        textExample: "Nancy rushed to finish her homework",
        textExampleTranslate: "Нэнси поспешила закончить домашнее задание",
        id: 555,
        word: "rush",
        wordTranslate: "порыв"
      },
      {
        audioExample: "files/28_0556_example.mp3",
        textExample: "What is your class schedule for today?",
        textExampleTranslate: "Какое у тебя расписание занятий на сегодня?",
        id: 556,
        word: "schedule",
        wordTranslate: "график"
      },
      {
        audioExample: "files/28_0557_example.mp3",
        textExample: "Jimmy shared his apple with me",
        textExampleTranslate: "Джимми поделился со мной своим яблоком",
        id: 557,
        word: "share",
        wordTranslate: "доля"
      },
      {
        audioExample: "files/28_0558_example.mp3",
        textExample: "A large screen was on the stage",
        textExampleTranslate: "Большой экран был на сцене",
        id: 558,
        word: "stage",
        wordTranslate: "сцена"
      },
      {
        audioExample: "files/28_0559_example.mp3",
        textExample: "Did that storm wake you up last night?",
        textExampleTranslate: "Этот шторм разбудил тебя прошлой ночью?",
        id: 559,
        word: "storm",
        wordTranslate: "буря"
      }
    ]
  },
  {
    levelData: {
      id: "1_44",
      name: "View from the Nieuwe Maas River towards the City of Vlaardingen",
      imageSrc: "level1/viewvlaa.jpg",
      cutSrc: "level1/cut/viewvlaa.jpg",
      author: "BACKHUYSEN, Ludolf",
      year: "1680s"
    },
    words: [
      {
        audioExample: "files/28_0560_example.mp3",
        textExample: "Within the box, there was a pizza",
        textExampleTranslate: "Внутри коробки была пицца",
        id: 560,
        word: "within",
        wordTranslate: "в пределах"
      },
      {
        audioExample: "files/29_0562_example.mp3",
        textExample: "We both compromised about the game we decided to play",
        textExampleTranslate: "Мы оба пошли на компромисс по поводу игры, в которую решили играть",
        id: 562,
        word: "compromise",
        wordTranslate: "компромисс"
      },
      {
        audioExample: "files/29_0564_example.mp3",
        textExample: "I like sky-diving from an airplane",
        textExampleTranslate: "Мне нравится скайдайвинг с самолета",
        id: 564,
        word: "dive",
        wordTranslate: "погружение"
      },
      {
        audioExample: "files/29_0565_example.mp3",
        textExample: "The fragile glassware was carefully packed into boxes",
        textExampleTranslate: "Хрупкая стеклянная посуда была тщательно упакована в коробки",
        id: 565,
        word: "fragile",
        wordTranslate: "хрупкий"
      },
      {
        audioExample: "files/29_0566_example.mp3",
        textExample: "The machine can divide the book in half",
        textExampleTranslate: "Машина может разделить книгу пополам",
        id: 566,
        word: "half",
        wordTranslate: "половина"
      },
      {
        audioExample: "files/29_0567_example.mp3",
        textExample: "Everyone who met her found her innocence to be charming",
        textExampleTranslate: "Все, кто встречал ее, находили ее невинность очаровательной",
        id: 567,
        word: "innocence",
        wordTranslate: "невинность"
      },
      {
        audioExample: "files/29_0568_example.mp3",
        textExample: "I will lead you to the right place",
        textExampleTranslate: "Я приведу вас в нужное место",
        id: 568,
        word: "lead",
        wordTranslate: "вести"
      },
      {
        audioExample: "files/29_0572_example.mp3",
        textExample: "The amount of homework her teacher assigned has overwhelmed her",
        textExampleTranslate: "Количество домашних заданий, которые назначил ее учитель, ошеломило ее",
        id: 572,
        word: "overwhelm",
        wordTranslate: "нападает"
      },
      {
        audioExample: "files/29_0578_example.mp3",
        textExample: "Speeding is the cause of most car accidents",
        textExampleTranslate: "Ускорение является причиной большинства автомобильных аварий",
        id: 578,
        word: "speed",
        wordTranslate: "скорость"
      },
      {
        audioExample: "files/29_0580_example.mp3",
        textExample: "It was just the usual people who came",
        textExampleTranslate: "Это были просто обычные люди, которые пришли",
        id: 580,
        word: "usual",
        wordTranslate: "обычный"
      }
    ]
  },
  {
    levelData: {
      id: "1_45",
      name: "Dutch Vessels off a Coastline on a Breezy Day",
      imageSrc: "level1/vessels1.jpg",
      cutSrc: "level1/cut/vessels1.jpg",
      author: "BACKHUYSEN, Ludolf",
      year: "1680"
    },
    words: [
      {
        audioExample: "files/30_0581_example.mp3",
        textExample: "He straightened the sign that was above the crowd",
        textExampleTranslate: "Он поправил знак, который был над толпой",
        id: 581,
        word: "above",
        wordTranslate: "над"
      },
      {
        audioExample: "files/30_0582_example.mp3",
        textExample: "The blue car drove on ahead of us",
        textExampleTranslate: "Синяя машина ехала впереди нас",
        id: 582,
        word: "ahead",
        wordTranslate: "вперед"
      },
      {
        audioExample: "files/30_0586_example.mp3",
        textExample: "It is common for snow to fall in the winter",
        textExampleTranslate: "Зимой выпадает снег",
        id: 586,
        word: "common",
        wordTranslate: "общий"
      },
      {
        audioExample: "files/30_0587_example.mp3",
        textExample: "These designer shoes cost more than the regular ones",
        textExampleTranslate: "Эти дизайнерские туфли стоят дороже обычных",
        id: 587,
        word: "cost",
        wordTranslate: "стоимость"
      },
      {
        audioExample: "files/30_0588_example.mp3",
        textExample: "She demonstrated her plan to her co-workers",
        textExampleTranslate: "Она продемонстрировала свой план своим сотрудникам",
        id: 588,
        word: "demonstrate",
        wordTranslate: "продемонстрировать"
      },
      {
        audioExample: "files/30_0589_example.mp3",
        textExample: "Each of my sisters has a different hair style",
        textExampleTranslate: "У каждой из моих сестер разные прически",
        id: 589,
        word: "different",
        wordTranslate: "другой"
      },
      {
        audioExample: "files/30_0590_example.mp3",
        textExample: "He used the pictures as evidence that UFOs are real",
        textExampleTranslate: "Он использовал фотографии в качестве доказательства того, что НЛО реальны",
        id: 590,
        word: "evidence",
        wordTranslate: "доказательство"
      },
      {
        audioExample: "files/30_0591_example.mp3",
        textExample: "A courtroom should be a place of honesty",
        textExampleTranslate: "Зал суда должен быть местом честности",
        id: 591,
        word: "honesty",
        wordTranslate: "честность"
      },
      {
        audioExample: "files/30_0593_example.mp3",
        textExample: "She chose to live an independent life in the country",
        textExampleTranslate: "Она решила жить независимой жизнью в стране",
        id: 593,
        word: "independent",
        wordTranslate: "независимый"
      },
      {
        audioExample: "files/30_0594_example.mp3",
        textExample: "The inside of the box was empty",
        textExampleTranslate: "Внутри коробки было пусто",
        id: 594,
        word: "inside",
        wordTranslate: "внутри"
      }
    ]
  },
  {
    "levelData": {
      id: "2_01",
      name: "Italianate Landscape With Travellers",
      imageSrc: "level2/2_01.jpg",
      cutSrc: "level2/cut/2_01.jpg",
      author: "BARKER, Thomas",
      year: "1793"
    },
    words: [
      {
        audioExample: "files/01_0601_example.mp3",
        textExample: "We need to study because we have a test tomorrow",
        textExampleTranslate: "Нам нужно учиться, потому что завтра у нас тест",
        id: 601,
        word: "because",
        wordTranslate: "потому что"
      },
      {
        audioExample: "files/01_0603_example.mp3",
        textExample: "My friend drives an expensive sports car",
        textExampleTranslate: "Мой друг водит дорогой спортивный автомобиль",
        id: 603,
        word: "expensive",
        wordTranslate: "дорогой"
      },
      {
        audioExample: "files/01_0604_example.mp3",
        textExample: "She gave pink flowers to her grandmother",
        textExampleTranslate: "Она дала розовые цветы своей бабушке",
        id: 604,
        word: "flower",
        wordTranslate: "цветок"
      },
      {
        audioExample: "files/01_0605_example.mp3",
        textExample: "The garden is very bright and colorful in the spring",
        textExampleTranslate: "Сад очень яркий и красочный весной",
        id: 605,
        word: "garden",
        wordTranslate: "сад"
      },
      {
        audioExample: "files/01_0607_example.mp3",
        textExample: "There are many people on the street",
        textExampleTranslate: "На улице много людей",
        id: 607,
        word: "many",
        wordTranslate: "многие"
      },
      {
        audioExample: "files/01_0608_example.mp3",
        textExample: "Almost 19 million people live in Delhi, India",
        textExampleTranslate: "Почти 19 миллионов человек живут в Дели, Индия",
        id: 608,
        word: "million",
        wordTranslate: "миллион"
      },
      {
        audioExample: "files/01_0609_example.mp3",
        textExample: "Mount Everest is the highest mountain in the world",
        textExampleTranslate: "Гора Эверест - самая высокая гора в мире",
        id: 609,
        word: "mountain",
        wordTranslate: "гора"
      },
      {
        audioExample: "files/01_0610_example.mp3",
        textExample: "A library is a place where people can read books",
        textExampleTranslate: "Библиотека - это место, где люди могут читать книги",
        id: 610,
        word: "place",
        wordTranslate: "место"
      },
      {
        audioExample: "files/01_0611_example.mp3",
        textExample: "These people are listening to a popular man speak",
        textExampleTranslate: "Эти люди слушают разговор популярного человека",
        id: 611,
        word: "popular",
        wordTranslate: "популярный"
      },
      {
        audioExample: "files/01_0612_example.mp3",
        textExample: "The man likes to ski and goes every weekend",
        textExampleTranslate: "Мужчина любит кататься на лыжах и ездит каждые выходные",
        id: 612,
        word: "ski",
        wordTranslate: "лыжи"
      }
    ]
  },
  {
    "levelData": {
      id: "2_02",
      name: "Landscape with a Watermill",
      imageSrc: "level2/2_02.jpg",
      cutSrc: "level2/cut/2_02.jpg",
      author: "BARRET, George",
      year: "1728"
    },
    words: [
      {
        audioExample: "files/01_0613_example.mp3",
        textExample: "I have never seen such a beautiful sunset before",
        textExampleTranslate: "Я никогда раньше не видел такой красивый закат",
        id: 613,
        word: "such",
        wordTranslate: "такой"
      },
      {
        audioExample: "files/01_0614_example.mp3",
        textExample: ".The total cost of the items she bought was $52",
        textExampleTranslate: "Общая стоимость предметов, которые она купила, составила 52 доллара",
        id: 614,
        word: "total",
        wordTranslate: "всего"
      },
      {
        audioExample: "files/01_0615_example.mp3",
        textExample: "This is a very famous tower in Italy",
        textExampleTranslate: "Это очень известная башня в Италии",
        id: 615,
        word: "tower",
        wordTranslate: "башня"
      },
      {
        audioExample: "files/01_0618_example.mp3",
        textExample: "The children walk to school in the morning",
        textExampleTranslate: "Дети гуляют в школу по утрам",
        id: 618,
        word: "walk",
        wordTranslate: "ходить"
      },
      {
        audioExample: "files/01_0619_example.mp3",
        textExample: "My friend came over to watch a movie with me",
        textExampleTranslate: "Мой друг пришел посмотреть фильм со мной",
        id: 619,
        word: "watch",
        wordTranslate: "смотреть"
      },
      {
        audioExample: "files/02_0621_example.mp3",
        textExample: "She was anxious about not making her appointment on time",
        textExampleTranslate: "Она беспокоилась о том, чтобы не договориться о встрече вовремя",
        id: 621,
        word: "anxious",
        wordTranslate: "озабоченный"
      },
      {
        audioExample: "files/02_0622_example.mp3",
        textExample: "Her performance last night was awful",
        textExampleTranslate: "Ее выступление прошлой ночью было ужасным",
        id: 622,
        word: "awful",
        wordTranslate: "ужасный"
      },
      {
        audioExample: "files/02_0624_example.mp3",
        textExample: "My sister desires a big house and lots of money",
        textExampleTranslate: "Моя сестра хочет большой дом и много денег",
        id: 624,
        word: "desire",
        wordTranslate: "желание"
      },
      {
        audioExample: "files/02_0625_example.mp3",
        textExample: "The man was eager to talk about the good news",
        textExampleTranslate: "Человек стремился говорить о хороших новостях",
        id: 625,
        word: "eager",
        wordTranslate: "нетерпеливый"
      },
      {
        audioExample: "files/02_0627_example.mp3",
        textExample: "Her intent is to visit Italy next summer",
        textExampleTranslate: "Ее намерение - посетить Италию следующим летом",
        id: 627,
        word: "intent",
        wordTranslate: "намерение"
      }
    ]
  },
  {
    "levelData": {
      id: "2_03",
      name: "Winter",
      imageSrc: "level2/2_03.jpg",
      cutSrc: "level2/cut/2_03.jpg",
      author: "BASSANO, Francesco",
      year: "1577-78"
    },
    words: [
      {
        audioExample: "files/02_0628_example.mp3",
        textExample: "The landscape of the country is very green",
        textExampleTranslate: "Ландшафт страны очень зеленый",
        id: 628,
        word: "landscape",
        wordTranslate: "пейзаж"
      },
      {
        audioExample: "files/02_0629_example.mp3",
        textExample: "The man tried to lift the box",
        textExampleTranslate: "Человек пытался поднять коробку",
        id: 629,
        word: "lift",
        wordTranslate: "лифт"
      },
      {
        audioExample: "files/02_0630_example.mp3",
        textExample: "The man loaded the boxes into a truck",
        textExampleTranslate: "Человек загрузил коробки в грузовик",
        id: 630,
        word: "load",
        wordTranslate: "нагрузка"
      },
      {
        audioExample: "files/02_0631_example.mp3",
        textExample: "Having strong lungs is necessary for a healthy life",
        textExampleTranslate: "Наличие крепких легких необходимо для здоровой жизни",
        id: 631,
        word: "lung",
        wordTranslate: "легкое"
      },
      {
        audioExample: "files/02_0632_example.mp3",
        textExample: "The police officer made a motion with his hand",
        textExampleTranslate: "Полицейский сделал движение рукой",
        id: 632,
        word: "motion",
        wordTranslate: "движение"
      },
      {
        audioExample: "files/02_0634_example.mp3",
        textExample: "The boy was very polite; he behaved very thoughtfully",
        textExampleTranslate: "Мальчик был очень вежлив, он вел себя очень вдумчиво",
        id: 634,
        word: "polite",
        wordTranslate: "вежливый"
      },
      {
        audioExample: "files/02_0636_example.mp3",
        textExample: "The train moved rapidly on the tracks",
        textExampleTranslate: "Поезд быстро двигался по рельсам",
        id: 636,
        word: "rapidly",
        wordTranslate: "быстро"
      },
      {
        audioExample: "files/02_0637_example.mp3",
        textExample: "The teacher remarked on how quickly the students were learning",
        textExampleTranslate: "Учитель отметил, как быстро учатся студенты",
        id: 637,
        word: "remark",
        wordTranslate: "замечание"
      },
      {
        audioExample: "files/02_0638_example.mp3",
        textExample: "If I have a problem, I seek my sister’s advice",
        textExampleTranslate: "Если у меня есть проблема, я обращаюсь к совету моей сестры",
        id: 638,
        word: "seek",
        wordTranslate: "стремиться"
      },
      {
        audioExample: "files/02_0639_example.mp3",
        textExample: "The candles are shining in the dark room",
        textExampleTranslate: "В темной комнате светятся свечи",
        id: 639,
        word: "shine",
        wordTranslate: "сияние"
      }
    ]
  },
  {
    "levelData": {
      id: "2_04",
      name: "Skating at Sloten, near Amsterdam",
      imageSrc: "level2/2_04.jpg",
      cutSrc: "level2/cut/2_04.jpg",
      author: "BEERSTRATEN, Jan Abrahamsz.",
      year: "1660-65"
    },
    words: [
      {
        audioExample: "files/02_0640_example.mp3",
        textExample: "I spilled the coffee on the table",
        textExampleTranslate: "Я пролил кофе на стол",
        id: 640,
        word: "spill",
        wordTranslate: "проливать"
      },
      {
        audioExample: "files/03_0641_example.mp3",
        textExample: "The arrow flew through the air and hit the target",
        textExampleTranslate: "Стрела взлетела в воздух и поразила цель",
        id: 641,
        word: "arrow",
        wordTranslate: "стрела"
      },
      {
        audioExample: "files/03_0642_example.mp3",
        textExample: "The battle lasted for many days",
        textExampleTranslate: "Битва длилась много дней",
        id: 642,
        word: "battle",
        wordTranslate: "боевой"
      },
      {
        audioExample: "files/03_0643_example.mp3",
        textExample: "He went hunting with a bow and arrow",
        textExampleTranslate: "Он пошел на охоту с луком и стрелами",
        id: 643,
        word: "bow",
        wordTranslate: "лук"
      },
      {
        audioExample: "files/03_0644_example.mp3",
        textExample: "The brave firefighter saved the girl from the burning building",
        textExampleTranslate: "Отважный пожарник спас девушку из горящего здания",
        id: 644,
        word: "brave",
        wordTranslate: "храбрый"
      },
      {
        audioExample: "files/03_0645_example.mp3",
        textExample: "The chief led the people through the mountains",
        textExampleTranslate: "Шеф вел людей через горы",
        id: 645,
        word: "chief",
        wordTranslate: "главный"
      },
      {
        audioExample: "files/03_0647_example.mp3",
        textExample: "The enemy prepared to attack the kingdom",
        textExampleTranslate: "Враг готов атаковать королевство",
        id: 647,
        word: "enemy",
        wordTranslate: "враг"
      },
      {
        audioExample: "files/03_0650_example.mp3",
        textExample: "I intend to finish college in three years",
        textExampleTranslate: "Я намерен закончить колледж через три года",
        id: 650,
        word: "intend",
        wordTranslate: "намереваться"
      },
      {
        audioExample: "files/03_0651_example.mp3",
        textExample: "Susan’s joke made her classmates burst into laughter",
        textExampleTranslate: "Шутка Сьюзен заставила ее одноклассников разразиться смехом",
        id: 651,
        word: "laughter",
        wordTranslate: "смех"
      },
      {
        audioExample: "files/03_0653_example.mp3",
        textExample: "I joined the military after I finished high school",
        textExampleTranslate: "Я поступил на военную службу после окончания средней школы",
        id: 653,
        word: "military",
        wordTranslate: "военные"
      }
    ]
  },
  {
    "levelData": {
      id: "2_05",
      name: "The Castle of Batavia, Seen from Kali Besar West",
      imageSrc: "level2/2_05.jpg",
      cutSrc: "level2/cut/2_05.jpg",
      author: "BEECKMAN, Andries",
      year: "1656"
    },
    words: [
      {
        audioExample: "files/03_0658_example.mp3",
        textExample: "She twisted the spaghetti around her fork",
        textExampleTranslate: "Она крутила спагетти вокруг своей вилки",
        id: 658,
        word: "twist",
        wordTranslate: "твист"
      },
      {
        audioExample: "files/03_0660_example.mp3",
        textExample: "Swords have been used as weapons for thousands of years",
        textExampleTranslate: "Мечи использовались в качестве оружия на протяжении тысячелетий",
        id: 660,
        word: "weapon",
        wordTranslate: "оружие"
      },
      {
        audioExample: "files/04_0662_example.mp3",
        textExample: "I have confidence that I did well on the test",
        textExampleTranslate: "У меня есть уверенность, что я хорошо справился с тестом",
        id: 662,
        word: "confidence",
        wordTranslate: "доверие"
      },
      {
        audioExample: "files/04_0664_example.mp3",
        textExample: "When the car crashed, it was a disaster",
        textExampleTranslate: "Когда машина разбилась, это была катастрофа",
        id: 664,
        word: "disaster",
        wordTranslate: "стихийное бедствие"
      },
      {
        audioExample: "files/04_0665_example.mp3",
        textExample: "The loud noise disturbed me while I was working",
        textExampleTranslate: "Громкий шум беспокоил меня, когда я работал",
        id: 665,
        word: "disturb",
        wordTranslate: "беспокоить"
      },
      {
        audioExample: "files/04_0666_example.mp3",
        textExample: "The boy estimated that he was one meter tall",
        textExampleTranslate: "Мальчик подсчитал, что он был один метр в высоту",
        id: 666,
        word: "estimate",
        wordTranslate: "оценить"
      },
      {
        audioExample: "files/04_0670_example.mp3",
        textExample: "The girl’s skin was very pale",
        textExampleTranslate: "Кожа девушки была очень бледной",
        id: 670,
        word: "pale",
        wordTranslate: "бледный"
      },
      {
        audioExample: "files/04_0671_example.mp3",
        textExample: "The rough ground hurt my feet",
        textExampleTranslate: "Грубая земля повредила мои ноги",
        id: 671,
        word: "rough",
        wordTranslate: "грубый"
      },
      {
        audioExample: "files/04_0673_example.mp3",
        textExample: "The girl saw a spider and screamed",
        textExampleTranslate: "Девушка увидела паука и закричала",
        id: 673,
        word: "scream",
        wordTranslate: "кричать"
      },
      {
        audioExample: "files/04_0674_example.mp3",
        textExample: "My teeth are sensitive to cold things",
        textExampleTranslate: "Мои зубы чувствительны к холодным вещам",
        id: 674,
        word: "sensitive",
        wordTranslate: "чувствительный"
      }
    ]
  },
  {
    "levelData": {
      id: "2_06",
      name: "The Hague Vegetable Market in Winter",
      imageSrc: "level2/2_06.jpg",
      cutSrc: "level2/cut/2_06.jpg",
      author: "BEEST, Sybrand van",
      year: "1650"
    },
    words: [
      {
        audioExample: "files/04_0676_example.mp3",
        textExample: "Eating good food builds up your strength",
        textExampleTranslate: "Еда хорошей пищи укрепляет ваши силы",
        id: 676,
        word: "strength",
        wordTranslate: "прочность"
      },
      {
        audioExample: "files/04_0677_example.mp3",
        textExample: "He supplements his diet with fresh fruits",
        textExampleTranslate: "Он дополняет свою диету свежими фруктами",
        id: 677,
        word: "supplement",
        wordTranslate: "дополнение"
      },
      {
        audioExample: "files/04_0680_example.mp3",
        textExample: "I was a victim of a robbery",
        textExampleTranslate: "Я был жертвой грабежа",
        id: 680,
        word: "victim",
        wordTranslate: "потерпевший"
      },
      {
        audioExample: "files/05_0681_example.mp3",
        textExample: "My ancestors came from Germany",
        textExampleTranslate: "Мои предки приехали из Германии",
        id: 681,
        word: "ancestor",
        wordTranslate: "предок"
      },
      {
        audioExample: "files/05_0682_example.mp3",
        textExample: "The giraffe turned its head to see from another angle",
        textExampleTranslate: "Жираф повернул голову, чтобы увидеть под другим углом",
        id: 682,
        word: "angle",
        wordTranslate: "угол"
      },
      {
        audioExample: "files/05_0683_example.mp3",
        textExample: "He wore boots so that his feet wouldn’t get wet",
        textExampleTranslate: "Он носил ботинки, чтобы ноги не промокли",
        id: 683,
        word: "boot",
        wordTranslate: "загрузка"
      },
      {
        audioExample: "files/05_0684_example.mp3",
        textExample: "The postcard had a pretty green border of pine needles",
        textExampleTranslate: "У открытки была довольно зеленая кайма из хвои",
        id: 684,
        word: "border",
        wordTranslate: "граница"
      },
      {
        audioExample: "files/05_0686_example.mp3",
        textExample: "I have to get a frame for my friend’s picture",
        textExampleTranslate: "Я должен получить рамку для картины моего друга",
        id: 686,
        word: "frame",
        wordTranslate: "рамка"
      },
      {
        audioExample: "files/05_0687_example.mp3",
        textExample: "When I die, I hope that I go to heaven",
        textExampleTranslate: "Когда я умру, я надеюсь, что я попаду на небеса",
        id: 687,
        word: "heaven",
        wordTranslate: "небо"
      },
      {
        audioExample: "files/05_0690_example.mp3",
        textExample: "The coach praised the athletes after a good practice",
        textExampleTranslate: "Тренер похвалил спортсменов после хорошей тренировки",
        id: 690,
        word: "praise",
        wordTranslate: "хвалить"
      }
    ]
  },
  {
    "levelData": {
      id: "2_07",
      name: "Seashore",
      imageSrc: "level2/2_07.jpg",
      cutSrc: "level2/cut/2_07.jpg",
      author: "BEGEYN, Abraham Jansz.",
      year: "1662"
    },
    words: [
      {
        audioExample: "files/05_0692_example.mp3",
        textExample: "The rose was pure. It had no dirt or imperfections",
        textExampleTranslate: "Роза была чистой. В ней не было ни грязи, ни недостатков",
        id: 692,
        word: "pure",
        wordTranslate: "чистый"
      },
      {
        audioExample: "files/05_0693_example.mp3",
        textExample: "My relatives came by to see the new baby",
        textExampleTranslate: "Мои родственники пришли, чтобы увидеть нового ребенка",
        id: 693,
        word: "relative",
        wordTranslate: "относительный"
      },
      {
        audioExample: "files/05_0695_example.mp3",
        textExample: "Since no one was home, the house was silent",
        textExampleTranslate: "Так как дома никого не было, дом молчал",
        id: 695,
        word: "silent",
        wordTranslate: "молчит"
      },
      {
        audioExample: "files/05_0697_example.mp3",
        textExample: "I think cooking outdoors is superior to cooking indoors",
        textExampleTranslate: "Я думаю, что готовить на улице лучше, чем готовить в помещении",
        id: 697,
        word: "superior",
        wordTranslate: "превосходный"
      },
      {
        audioExample: "files/05_0698_example.mp3",
        textExample: "We surrounded the suspect on all four sides",
        textExampleTranslate: "Мы окружили подозреваемого со всех четырех сторон",
        id: 698,
        word: "surround",
        wordTranslate: "окружают"
      },
      {
        audioExample: "files/05_0700_example.mp3",
        textExample: "I wrapped his gift and put a bow on it",
        textExampleTranslate: "Я завернул его подарок и положил на него лук",
        id: 700,
        word: "wrap",
        wordTranslate: "заворачивать"
      },
      {
        audioExample: "files/06_0701_example.mp3",
        textExample: "I like blue, and I also like yellow",
        textExampleTranslate: "Я люблю синий, и я также люблю желтый",
        id: 701,
        word: "also",
        wordTranslate: "также"
      },
      {
        audioExample: "files/06_0702_example.mp3",
        textExample: "The man automatically smiled when he thought about his friend",
        textExampleTranslate: "Человек автоматически улыбнулся, когда подумал о своем друге",
        id: 702,
        word: "automatically",
        wordTranslate: "автоматически"
      },
      {
        audioExample: "files/06_0703_example.mp3",
        textExample: "Everyone is busy at the office today",
        textExampleTranslate: "Сегодня все заняты в офисе",
        id: 703,
        word: "busy",
        wordTranslate: "занятый"
      },
      {
        audioExample: "files/06_0704_example.mp3",
        textExample: "Sad news can make her cry",
        textExampleTranslate: "Печальные новости могут заставить ее плакать",
        id: 704,
        word: "can",
        wordTranslate: "можно"
      }
    ]
  },
  {
    "levelData": {
      id: "2_08",
      name: "Banks of the Oise",
      imageSrc: "level2/2_08.jpg",
      cutSrc: "level2/cut/2_08.jpg",
      author: "BÉLIARD, Edouard",
      year: "1875"
    },
    words: [
      {
        audioExample: "files/06_0706_example.mp3",
        textExample: "The man wanted to close the door tightly",
        textExampleTranslate: "Человек хотел плотно закрыть дверь",
        id: 706,
        word: "close",
        wordTranslate: "близко"
      },
      {
        audioExample: "files/06_0707_example.mp3",
        textExample: "James began to discuss his report with his teacher",
        textExampleTranslate: "Джеймс начал обсуждать свой доклад со своим учителем",
        id: 707,
        word: "discuss",
        wordTranslate: "обсудить"
      },
      {
        audioExample: "files/06_0709_example.mp3",
        textExample: "Lisa wanted to listen carefully to her friend",
        textExampleTranslate: "Лиза хотела внимательно выслушать своего друга",
        id: 709,
        word: "listen",
        wordTranslate: "слушать"
      },
      {
        audioExample: "files/06_0710_example.mp3",
        textExample: "Ken’s mother wanted to meet his teacher today",
        textExampleTranslate: "Мать Кена хотела встретиться со своим учителем сегодня",
        id: 710,
        word: "meet",
        wordTranslate: "встретиться"
      },
      {
        audioExample: "files/06_0711_example.mp3",
        textExample: "The boy makes music by playing a guitar",
        textExampleTranslate: "Мальчик делает музыку, играя на гитаре",
        id: 711,
        word: "music",
        wordTranslate: "музыка"
      },
      {
        audioExample: "files/06_0712_example.mp3",
        textExample: "It is normal to wear school uniforms in private schools",
        textExampleTranslate: "Нормально носить школьную форму в частных школах",
        id: 712,
        word: "normal",
        wordTranslate: "нормальный"
      },
      {
        audioExample: "files/06_0713_example.mp3",
        textExample: "The man told the children to be quiet",
        textExampleTranslate: "Человек велел детям быть спокойными",
        id: 713,
        word: "quiet",
        wordTranslate: "тихо"
      },
      {
        audioExample: "files/06_0714_example.mp3",
        textExample: "Nicole likes to relax by reading books",
        textExampleTranslate: "Николь любит отдыхать, читая книги",
        id: 714,
        word: "relax",
        wordTranslate: "расслабиться"
      },
      {
        audioExample: "files/06_0715_example.mp3",
        textExample: "The child goes to sleep in her bedroom at night",
        textExampleTranslate: "Ребенок ночью ложится спать в своей спальне",
        id: 715,
        word: "sleep",
        wordTranslate: "спать"
      },
      {
        audioExample: "files/06_0716_example.mp3",
        textExample: "Dan has a lot of stress at work",
        textExampleTranslate: "У Дэна много стресса на работе",
        id: 716,
        word: "stress",
        wordTranslate: "стресс"
      }
    ]
  },
  {
    "levelData": {
      id: "2_09",
      name: "View of the Grand Canal at San Stae",
      imageSrc: "level2/2_09.jpg",
      cutSrc: "level2/cut/2_09.jpg",
      author: "BELLOTTO, Bernardo",
      year: "1738-40"
    },
    words: [
      {
        audioExample: "files/06_0718_example.mp3",
        textExample: "They went someplace to talk to each other",
        textExampleTranslate: "Они пошли куда-нибудь, чтобы поговорить друг с другом",
        id: 718,
        word: "talk",
        wordTranslate: "разговаривать"
      },
      {
        audioExample: "files/06_0719_example.mp3",
        textExample: "They need to work together to finish an important project",
        textExampleTranslate: "Им нужно работать вместе, чтобы закончить важный проект",
        id: 719,
        word: "work",
        wordTranslate: "работа"
      },
      {
        audioExample: "files/06_0720_example.mp3",
        textExample: "I need to write a story for my homework",
        textExampleTranslate: "Мне нужно написать историю для моей домашней работы",
        id: 720,
        word: "write",
        wordTranslate: "записывать"
      },
      {
        audioExample: "files/07_0721_example.mp3",
        textExample: "My grandfather gets his hearing checked on a yearly basis",
        textExampleTranslate: "Мой дедушка проверяет слух на ежегодной основе",
        id: 721,
        word: "basis",
        wordTranslate: "основа"
      },
      {
        audioExample: "files/07_0722_example.mp3",
        textExample: "We learned about the human heart in biology class",
        textExampleTranslate: "Мы узнали о человеческом сердце на уроке биологии",
        id: 722,
        word: "biology",
        wordTranslate: "биология"
      },
      {
        audioExample: "files/07_0723_example.mp3",
        textExample: "We put the parrots in their cage at night",
        textExampleTranslate: "Мы помещаем попугаев в их клетку на ночь",
        id: 723,
        word: "cage",
        wordTranslate: "клетка"
      },
      {
        audioExample: "files/07_0724_example.mp3",
        textExample: "My colleague helped me finish the job",
        textExampleTranslate: "Мой коллега помог мне закончить работу",
        id: 724,
        word: "colleague",
        wordTranslate: "коллега"
      },
      {
        audioExample: "files/07_0726_example.mp3",
        textExample: "The husband and wife debated which TV to buy",
        textExampleTranslate: "Муж и жена обсуждали, какой телевизор купить",
        id: 726,
        word: "debate",
        wordTranslate: "дебаты"
      },
      {
        audioExample: "files/07_0727_example.mp3",
        textExample: "The plane departed for Italy at 3:00 this afternoon",
        textExampleTranslate: "Самолет вылетел в Италию в 3 часа дня",
        id: 727,
        word: "depart",
        wordTranslate: "развестись"
      },
      {
        audioExample: "files/07_0728_example.mp3",
        textExample: "The bad news from work depressed the man",
        textExampleTranslate: "Плохие новости с работы угнетали мужчину",
        id: 728,
        word: "depress",
        wordTranslate: "отжимает"
      }
    ]
  },
  {
    "levelData": {
      id: "2_10",
      name: "The Piazza della Signoria in Florence",
      imageSrc: "level2/2_10.jpg",
      cutSrc: "level2/cut/2_10.jpg",
      author: "BELLOTTO, Bernardo",
      year: "1740"
    },
    words: [
      {
        audioExample: "files/07_0729_example.mp3",
        textExample: "John learns about history from factual books",
        textExampleTranslate: "Джон узнает об истории из фактических книг",
        id: 729,
        word: "factual",
        wordTranslate: "фактический"
      },
      {
        audioExample: "files/07_0730_example.mp3",
        textExample: "The kitten was fascinated by the ball of yarn",
        textExampleTranslate: "Котенок был очарован клубком пряжи",
        id: 730,
        word: "fascinate",
        wordTranslate: "завораживает"
      },
      {
        audioExample: "files/07_0731_example.mp3",
        textExample: "The woman’s mission was to help sick people",
        textExampleTranslate: "Миссия женщины состояла в том, чтобы помочь больным людям",
        id: 731,
        word: "mission",
        wordTranslate: "миссия"
      },
      {
        audioExample: "files/07_0732_example.mp3",
        textExample: "He is usually friendly. Nevertheless, he wasn’t friendly this afternoon",
        textExampleTranslate: "Он обычно дружелюбен. Тем не менее, он не был дружелюбен сегодня днем",
        id: 732,
        word: "nevertheless",
        wordTranslate: "тем не менее"
      },
      {
        audioExample: "files/07_0733_example.mp3",
        textExample: "My father’s occupation is a dentist",
        textExampleTranslate: "Мой отец занимается стоматологом",
        id: 733,
        word: "occupation",
        wordTranslate: "род занятий"
      },
      {
        audioExample: "files/07_0734_example.mp3",
        textExample: "John often goes overseas for vacations",
        textExampleTranslate: "Джон часто ездит за границу на каникулы",
        id: 734,
        word: "overseas",
        wordTranslate: "за рубежом"
      },
      {
        audioExample: "files/07_0735_example.mp3",
        textExample: "The children persuaded their parents to buy them gifts",
        textExampleTranslate: "Дети уговорили своих родителей купить им подарки",
        id: 735,
        word: "persuade",
        wordTranslate: "уговаривать"
      },
      {
        audioExample: "files/07_0737_example.mp3",
        textExample: "I visited some interesting ruins in Greece",
        textExampleTranslate: "Я посетил некоторые интересные руины в Греции",
        id: 737,
        word: "ruins",
        wordTranslate: "руины"
      },
      {
        audioExample: "files/07_0738_example.mp3",
        textExample: "The scholar knew much about art history",
        textExampleTranslate: "Ученый много знал об истории искусства",
        id: 738,
        word: "scholar",
        wordTranslate: "ученый"
      },
      {
        audioExample: "files/07_0740_example.mp3",
        textExample: "When the volcano erupted, smoke and heat filled the air",
        textExampleTranslate: "Когда извергся вулкан, воздух наполнил дым и тепло",
        id: 740,
        word: "volcano",
        wordTranslate: "вулкан"
      }
    ]
  },
  {
    "levelData": {
      id: "2_11",
      name: "View of the Villa Cagnola at Gazzada near Varese",
      imageSrc: "level2/2_11.jpg",
      cutSrc: "level2/cut/2_11.jpg",
      author: "BELLOTTO, Bernardo",
      year: "1744"
    },
    words: [
      {
        audioExample: "files/08_0741_example.mp3",
        textExample: "The river is very long and broad",
        textExampleTranslate: "Река очень длинная и широкая",
        id: 741,
        word: "broad",
        wordTranslate: "широкий"
      },
      {
        audioExample: "files/08_0744_example.mp3",
        textExample: "They cheated on the test by sharing answers",
        textExampleTranslate: "Они изменяли тесту, делясь ответами",
        id: 744,
        word: "cheat",
        wordTranslate: "обмануть"
      },
      {
        audioExample: "files/08_0748_example.mp3",
        textExample: "They paid a considerable amount of money for that car",
        textExampleTranslate: "Они заплатили значительную сумму денег за эту машину",
        id: 748,
        word: "considerable",
        wordTranslate: "значительный"
      },
      {
        audioExample: "files/08_0750_example.mp3",
        textExample: "There is a definite connection between hard work and success",
        textExampleTranslate: "Существует определенная связь между трудолюбием и успехом",
        id: 750,
        word: "definite",
        wordTranslate: "определенный"
      },
      {
        audioExample: "files/08_0751_example.mp3",
        textExample: "He felt such delight after getting a promotion at work",
        textExampleTranslate: "Он почувствовал такой восторг после продвижения по службе",
        id: 751,
        word: "delight",
        wordTranslate: "восторг"
      },
      {
        audioExample: "files/08_0752_example.mp3",
        textExample: "The destination of this plane is Munich, Germany",
        textExampleTranslate: "Пункт назначения этого самолета - Мюнхен, Германия",
        id: 752,
        word: "destination",
        wordTranslate: "пункт назначения"
      },
      {
        audioExample: "files/08_0753_example.mp3",
        textExample: "He ran to the edge of the cliff",
        textExampleTranslate: "Он побежал к краю обрыва",
        id: 753,
        word: "edge",
        wordTranslate: "край"
      },
      {
        audioExample: "files/08_0754_example.mp3",
        textExample: "Just follow the instructions and you will be OK",
        textExampleTranslate: "Просто следуйте инструкциям, и вы будете в порядке",
        id: 754,
        word: "instructions",
        wordTranslate: "инструкции"
      },
      {
        audioExample: "files/08_0755_example.mp3",
        textExample: "We followed a path through the woods",
        textExampleTranslate: "Мы шли по тропинке через лес",
        id: 755,
        word: "path",
        wordTranslate: "дорожка"
      },
      {
        audioExample: "files/08_0757_example.mp3",
        textExample: "The man’s shadow was taller than he was",
        textExampleTranslate: "Тень человека была выше его",
        id: 757,
        word: "shadow",
        wordTranslate: "тень"
      }
    ]
  },
  {
    "levelData": {
      id: "2_12",
      name: "The Campagna at Lungezza near Rome",
      imageSrc: "level2/2_12.jpg",
      cutSrc: "level2/cut/2_12.jpg",
      author: "BENOUVILLE, Jean-Achille",
      year: "1848"
    },
    words: [
      {
        audioExample: "files/08_0759_example.mp3",
        textExample: "I suspect that those kids stole the money",
        textExampleTranslate: "Я подозреваю, что эти дети украли деньги",
        id: 759,
        word: "suspect",
        wordTranslate: "подозреваемый"
      },
      {
        audioExample: "files/09_0761_example.mp3",
        textExample: "They both leaned against the wall",
        textExampleTranslate: "Они оба прислонились к стене",
        id: 761,
        word: "against",
        wordTranslate: "против"
      },
      {
        audioExample: "files/09_0762_example.mp3",
        textExample: "The little girl built a sandcastle on the beach",
        textExampleTranslate: "Маленькая девочка построила замок из песка на пляже",
        id: 762,
        word: "beach",
        wordTranslate: "пляж"
      },
      {
        audioExample: "files/09_0763_example.mp3",
        textExample: "The car was damaged in the accident",
        textExampleTranslate: "Автомобиль был поврежден в аварии",
        id: 763,
        word: "damage",
        wordTranslate: "наносить ущерб"
      },
      {
        audioExample: "files/09_0764_example.mp3",
        textExample: "I discovered some new information in this book",
        textExampleTranslate: "Я обнаружил некоторую новую информацию в этой книге",
        id: 764,
        word: "discover",
        wordTranslate: "обнаружить"
      },
      {
        audioExample: "files/09_0765_example.mp3",
        textExample: "Anger is a common emotion that we all feel",
        textExampleTranslate: "Гнев - это общая эмоция, которую мы все чувствуем",
        id: 765,
        word: "emotion",
        wordTranslate: "эмоция"
      },
      {
        audioExample: "files/09_0767_example.mp3",
        textExample: "I used the file to identify his name",
        textExampleTranslate: "Я использовал файл, чтобы определить его имя",
        id: 767,
        word: "identify",
        wordTranslate: "определить"
      },
      {
        audioExample: "files/09_0768_example.mp3",
        textExample: "Japan is a group of islands",
        textExampleTranslate: "Япония - это группа островов",
        id: 768,
        word: "island",
        wordTranslate: "остров"
      },
      {
        audioExample: "files/09_0769_example.mp3",
        textExample: "The ocean can make powerful waves",
        textExampleTranslate: "Океан может создавать мощные волны",
        id: 769,
        word: "ocean",
        wordTranslate: "океан"
      },
      {
        audioExample: "files/09_0770_example.mp3",
        textExample: "Perhaps I will eat an apple for lunch",
        textExampleTranslate: "Возможно, я буду есть яблоко на обед",
        id: 770,
        word: "perhaps",
        wordTranslate: "возможно"
      }
    ]
  },
  {
    "levelData": {
      id: "2_13",
      name: "A Southern Harbour Scene",
      imageSrc: "level2/2_13.jpg",
      cutSrc: "level2/cut/2_13.jpg",
      author: "BERCHEM, Nicolaes",
      year: "1657-59"
    },
    words: [
      {
        audioExample: "files/09_0771_example.mp3",
        textExample: "The character had a pleasant look on its face",
        textExampleTranslate: "У персонажа было приятное выражение лица",
        id: 771,
        word: "pleasant",
        wordTranslate: "приятный"
      },
      {
        audioExample: "files/09_0772_example.mp3",
        textExample: "The handcuffs prevented me from moving my hands",
        textExampleTranslate: "Наручники мешали мне двигаться руками",
        id: 772,
        word: "prevent",
        wordTranslate: "предотвращать"
      },
      {
        audioExample: "files/09_0773_example.mp3",
        textExample: "I stacked rocks on top of one another",
        textExampleTranslate: "Я сложил камни друг на друга",
        id: 773,
        word: "rock",
        wordTranslate: "скала"
      },
      {
        audioExample: "files/09_0774_example.mp3",
        textExample: "I want to help save the world",
        textExampleTranslate: "Я хочу помочь спасти мир",
        id: 774,
        word: "save",
        wordTranslate: "спасти"
      },
      {
        audioExample: "files/09_0775_example.mp3",
        textExample: "The baby smiled at me",
        textExampleTranslate: "Ребенок улыбнулся мне",
        id: 775,
        word: "smile",
        wordTranslate: "улыбка"
      },
      {
        audioExample: "files/09_0776_example.mp3",
        textExample: "Be careful where you step",
        textExampleTranslate: "Будь осторожен, куда ступаешь",
        id: 776,
        word: "step",
        wordTranslate: "шаг"
      },
      {
        audioExample: "files/09_0777_example.mp3",
        textExample: "They are still waiting in line to get tickets",
        textExampleTranslate: "Они все еще ждут своей очереди, чтобы получить билеты",
        id: 777,
        word: "still",
        wordTranslate: "по-прежнему"
      },
      {
        audioExample: "files/09_0778_example.mp3",
        textExample: "The taste of the fruit was sweet",
        textExampleTranslate: "Вкус плода был сладким",
        id: 778,
        word: "taste",
        wordTranslate: "вкус"
      },
      {
        audioExample: "files/09_0779_example.mp3",
        textExample: "The pitcher can throw the baseball very fast",
        textExampleTranslate: "Кувшин может бросить бейсбол очень быстро",
        id: 779,
        word: "throw",
        wordTranslate: "бросить"
      },
      {
        audioExample: "files/09_0780_example.mp3",
        textExample: "The water was filled with large blue waves",
        textExampleTranslate: "Вода была наполнена большими синими волнами",
        id: 780,
        word: "wave",
        wordTranslate: "волна"
      }
    ]
  },
  {
    "levelData": {
      id: "2_14",
      name: "A Harbour Scene",
      imageSrc: "level2/2_14.jpg",
      cutSrc: "level2/cut/2_14.jpg",
      author: "BERCHEM, Nicolaes",
      year: "1665-70"
    },
    words: [
      {
        audioExample: "files/10_0781_example.mp3",
        textExample: "Carlos was born in Spain. He is a Spanish citizen",
        textExampleTranslate: "Карлос родился в Испании. Он гражданин Испании",
        id: 781,
        word: "citizen",
        wordTranslate: "гражданин"
      },
      {
        audioExample: "files/10_0783_example.mp3",
        textExample: "I declared my love for him",
        textExampleTranslate: "Я объявил свою любовь к нему",
        id: 783,
        word: "declare",
        wordTranslate: "объявить"
      },
      {
        audioExample: "files/10_0784_example.mp3",
        textExample: "My dog looks enormous next to yours",
        textExampleTranslate: "Моя собака выглядит огромной рядом с вашей",
        id: 784,
        word: "enormous",
        wordTranslate: "огромный"
      },
      {
        audioExample: "files/10_0785_example.mp3",
        textExample: "The fireman who rescued the girl was extraordinary",
        textExampleTranslate: "Пожарный, который спас девушку, был необычайным",
        id: 785,
        word: "extraordinary",
        wordTranslate: "экстраординарный"
      },
      {
        audioExample: "files/10_0786_example.mp3",
        textExample: "I did not want to drive in the thick fog",
        textExampleTranslate: "Я не хотел ездить в густом тумане",
        id: 786,
        word: "fog",
        wordTranslate: "туман"
      },
      {
        audioExample: "files/10_0788_example.mp3",
        textExample: "The giant truck got in my way",
        textExampleTranslate: "Гигантский грузовик встал у меня на пути",
        id: 788,
        word: "giant",
        wordTranslate: "гигант"
      },
      {
        audioExample: "files/10_0790_example.mp3",
        textExample: "Do you have good intentions?",
        textExampleTranslate: "У тебя хорошие намерения?",
        id: 790,
        word: "intention",
        wordTranslate: "намерение"
      },
      {
        audioExample: "files/10_0791_example.mp3",
        textExample: "Mother got mad when I didn’t listen to her",
        textExampleTranslate: "Мать разозлилась, когда я ее не слушал",
        id: 791,
        word: "mad",
        wordTranslate: "без ума"
      },
      {
        audioExample: "files/10_0792_example.mp3",
        textExample: "I ought to take my library books back",
        textExampleTranslate: "Я должен забрать свои библиотечные книги обратно",
        id: 792,
        word: "ought",
        wordTranslate: "должен"
      },
      {
        audioExample: "files/10_0793_example.mp3",
        textExample: "He resisted the treatment at the hospital",
        textExampleTranslate: "Он сопротивлялся лечению в больнице",
        id: 793,
        word: "resist",
        wordTranslate: "оказывать сопротивление"
      }
    ]
  },
  {
    "levelData": {
      id: "2_15",
      name: "The Invalides, Paris",
      imageSrc: "level2/2_15.jpg",
      cutSrc: "level2/cut/2_15.jpg",
      author: "CANELLA, Giuseppe",
      year: "1830"
    },
    words: [
      {
        audioExample: "files/10_0794_example.mp3",
        textExample: "I will reveal where I hid the candy bar",
        textExampleTranslate: "Я покажу, где я спрятал моноблок",
        id: 794,
        word: "reveal",
        wordTranslate: "раскрыть"
      },
      {
        audioExample: "files/10_0795_example.mp3",
        textExample: "We rid our home of mice by using traps",
        textExampleTranslate: "Мы избавляем наш дом от мышей, используя ловушки",
        id: 795,
        word: "rid",
        wordTranslate: "избавиться"
      },
      {
        audioExample: "files/10_0796_example.mp3",
        textExample: "They used to use swords in battles in ancient times",
        textExampleTranslate: "Они использовали мечи в сражениях в древние времена",
        id: 796,
        word: "sword",
        wordTranslate: "меч"
      },
      {
        audioExample: "files/10_0798_example.mp3",
        textExample: "We trapped butterflies in a net",
        textExampleTranslate: "Мы поймали бабочек в сеть",
        id: 798,
        word: "trap",
        wordTranslate: "ловушка"
      },
      {
        audioExample: "files/10_0799_example.mp3",
        textExample: "He went on trial for robbing the bank",
        textExampleTranslate: "Он предстал перед судом за ограбление банка",
        id: 799,
        word: "trial",
        wordTranslate: "пробный"
      },
      {
        audioExample: "files/10_0800_example.mp3",
        textExample: "The man was put into jail because he was violent",
        textExampleTranslate: "Человека посадили в тюрьму за насилие",
        id: 800,
        word: "violent",
        wordTranslate: "неистовый"
      },
      {
        audioExample: "files/11_0801_example.mp3",
        textExample: "The admission ticket to the movie was $5",
        textExampleTranslate: "Входной билет в кино был 5 долларов",
        id: 801,
        word: "admission",
        wordTranslate: "прием"
      },
      {
        audioExample: "files/11_0803_example.mp3",
        textExample: "My mom blamed me for something I didn’t do",
        textExampleTranslate: "Моя мама обвиняла меня в том, чего я не делала",
        id: 803,
        word: "blame",
        wordTranslate: "вина"
      },
      {
        audioExample: "files/11_0804_example.mp3",
        textExample: "In chemistry class, the professor taught us about chemical reactions",
        textExampleTranslate: "На уроке химии профессор учил нас химическим реакциям",
        id: 804,
        word: "chemistry",
        wordTranslate: "химия"
      },
      {
        audioExample: "files/11_0805_example.mp3",
        textExample: "We still played the game despite the cold weather",
        textExampleTranslate: "Мы все еще играли в игру, несмотря на холодную погоду",
        id: 805,
        word: "despite",
        wordTranslate: "несмотря на"
      }
    ]
  },
  {
    "levelData": {
      id: "2_16",
      name: "View of Ariccia with the Sea in the Background",
      imageSrc: "level2/2_16.jpg",
      cutSrc: "level2/cut/2_16.jpg",
      author: "CATEL, Franz Ludwig",
      year: "1821-25"
    },
    words: [
      {
        audioExample: "files/11_0806_example.mp3",
        textExample: "I like to see the dinosaur bones at the museum",
        textExampleTranslate: "Мне нравится видеть кости динозавра в музее",
        id: 806,
        word: "dinosaur",
        wordTranslate: "динозавр"
      },
      {
        audioExample: "files/11_0807_example.mp3",
        textExample: "My painting will be exhibited at the fair",
        textExampleTranslate: "Моя картина будет выставлена на ярмарке",
        id: 807,
        word: "exhibit",
        wordTranslate: "экспонат"
      },
      {
        audioExample: "files/11_0808_example.mp3",
        textExample: "He had fame and fortune, but he was not happy",
        textExampleTranslate: "У него была слава и богатство, но он не был счастлив",
        id: 808,
        word: "fame",
        wordTranslate: "слава"
      },
      {
        audioExample: "files/11_0809_example.mp3",
        textExample: "The forecast says that it will rain all week",
        textExampleTranslate: "Прогноз говорит, что будет идти дождь всю неделю",
        id: 809,
        word: "forecast",
        wordTranslate: "прогноз"
      },
      {
        audioExample: "files/11_0811_example.mp3",
        textExample: "He is very gentle with the baby",
        textExampleTranslate: "Он очень нежный с ребенком",
        id: 811,
        word: "gentle",
        wordTranslate: "нежный"
      },
      {
        audioExample: "files/11_0812_example.mp3",
        textExample: "I had to draw a map for geography class",
        textExampleTranslate: "Я должен был нарисовать карту для класса географии",
        id: 812,
        word: "geography",
        wordTranslate: "география"
      },
      {
        audioExample: "files/11_0813_example.mp3",
        textExample: "My little sister always interferes when I’m trying to study",
        textExampleTranslate: "Моя младшая сестра всегда мешает, когда я пытаюсь учиться",
        id: 813,
        word: "interfere",
        wordTranslate: "вмешиваться"
      },
      {
        audioExample: "files/11_0814_example.mp3",
        textExample: "Draw lightly so you do not tear your paper",
        textExampleTranslate: "Рисуй слегка, чтобы не порвать свою бумагу",
        id: 814,
        word: "lightly",
        wordTranslate: "слегка"
      },
      {
        audioExample: "files/11_0815_example.mp3",
        textExample: "My school’s principal can be very strict with the rules",
        textExampleTranslate: "Директор школы может быть очень строг с правилами",
        id: 815,
        word: "principal",
        wordTranslate: "принципал"
      },
      {
        audioExample: "files/11_0816_example.mp3",
        textExample: "James put all of his toy soldiers into neat rows",
        textExampleTranslate: "Джеймс собрал всех своих игрушечных солдат в аккуратные ряды",
        id: 816,
        word: "row",
        wordTranslate: "строка"
      }
    ]
  },
  {
    "levelData": {
      id: "2_17",
      name: "The Miracles of the Penitent St Mary",
      imageSrc: "level2/2_17.jpg",
      cutSrc: "level2/cut/2_17.jpg",
      author: "CHAMPAIGNE, Philippe de",
      year: "1656"
    },
    words: [
      {
        audioExample: "files/11_0817_example.mp3",
        textExample: "I keep my clothes on a shelf in my closet",
        textExampleTranslate: "Я держу свою одежду на полке в моем шкафу",
        id: 817,
        word: "shelf",
        wordTranslate: "полка"
      },
      {
        audioExample: "files/12_0823_example.mp3",
        textExample: "My sister is a good cook. She bakes delicious cakes",
        textExampleTranslate: "Моя сестра - хороший повар. Она печет вкусные пирожные",
        id: 823,
        word: "bake",
        wordTranslate: "печь"
      },
      {
        audioExample: "files/12_0824_example.mp3",
        textExample: "There are many different kinds of beans to eat",
        textExampleTranslate: "Есть много разных видов бобов, чтобы поесть",
        id: 824,
        word: "bean",
        wordTranslate: "боб"
      },
      {
        audioExample: "files/12_0825_example.mp3",
        textExample: "When the lights went out, we lit some candles",
        textExampleTranslate: "Когда погас свет, мы зажгли свечи",
        id: 825,
        word: "candle",
        wordTranslate: "свеча"
      },
      {
        audioExample: "files/12_0828_example.mp3",
        textExample: "Hiring more police officers has decreased crime in the city",
        textExampleTranslate: "Наем большего количества полицейских уменьшил преступность в городе",
        id: 828,
        word: "decrease",
        wordTranslate: "уменьшить"
      },
      {
        audioExample: "files/12_0830_example.mp3",
        textExample: "We all put money into our club’s fund",
        textExampleTranslate: "Мы все вкладываем деньги в фонд нашего клуба",
        id: 830,
        word: "fund",
        wordTranslate: "фонд"
      },
      {
        audioExample: "files/12_0831_example.mp3",
        textExample: "The generous man donated several new computers to our school",
        textExampleTranslate: "Щедрый человек подарил нашей школе несколько новых компьютеров",
        id: 831,
        word: "generous",
        wordTranslate: "щедрый"
      },
      {
        audioExample: "files/12_0832_example.mp3",
        textExample: "The main ingredients in cake are eggs, sugar, and flour",
        textExampleTranslate: "Основными ингредиентами торта являются яйца, сахар и мука",
        id: 832,
        word: "ingredient",
        wordTranslate: "ингредиент"
      },
      {
        audioExample: "files/12_0833_example.mp3",
        textExample: "I insist that you try some of these cookies",
        textExampleTranslate: "Я настаиваю на том, чтобы вы попробовали некоторые из этих файлов cookie",
        id: 833,
        word: "insist",
        wordTranslate: "настаивают"
      },
      {
        audioExample: "files/12_0834_example.mp3",
        textExample: "Heather’s room was a complete mess",
        textExampleTranslate: "Комната Хизер была полным беспорядком",
        id: 834,
        word: "mess",
        wordTranslate: "беспорядок"
      }
    ]
  },
  {
    "levelData": {
      id: "2_18",
      name: "Autumn",
      imageSrc: "level2/2_18.jpg",
      cutSrc: "level2/cut/2_18.jpg",
      author: "CHURCH, Frederic Edwin",
      year: "1875"
    },
    words: [
      {
        audioExample: "files/12_0836_example.mp3",
        textExample: "The teacher monitors the students when they take tests",
        textExampleTranslate: "Учитель следит за учениками, когда они сдают тесты",
        id: 836,
        word: "monitor",
        wordTranslate: "монитор"
      },
      {
        audioExample: "files/12_0839_example.mp3",
        textExample: "I have a small quantity of milk in my glass",
        textExampleTranslate: "У меня есть небольшое количество молока в моем стакане",
        id: 839,
        word: "quantity",
        wordTranslate: "количество"
      },
      {
        audioExample: "files/13_0841_example.mp3",
        textExample: "This is adequate for my needs",
        textExampleTranslate: "Это соответствует моим потребностям",
        id: 841,
        word: "adequate",
        wordTranslate: "адекватный"
      },
      {
        audioExample: "files/13_0843_example.mp3",
        textExample: "The army protects all the people in the country",
        textExampleTranslate: "Армия защищает всех людей в стране",
        id: 843,
        word: "army",
        wordTranslate: "армия"
      },
      {
        audioExample: "files/13_0844_example.mp3",
        textExample: "There are billions of stars in outer space",
        textExampleTranslate: "В космосе миллиарды звезд",
        id: 844,
        word: "billion",
        wordTranslate: "миллиард"
      },
      {
        audioExample: "files/13_0845_example.mp3",
        textExample: "My father usually carves the turkey for Thanksgiving",
        textExampleTranslate: "Мой отец обычно вырезает индейку на День благодарения",
        id: 845,
        word: "carve",
        wordTranslate: "высекает"
      },
      {
        audioExample: "files/13_0848_example.mp3",
        textExample: "I have good fortune when I play cards",
        textExampleTranslate: "Мне повезло, когда я играю в карты",
        id: 848,
        word: "fortune",
        wordTranslate: "состояние"
      },
      {
        audioExample: "files/13_0851_example.mp3",
        textExample: "The skunk made an intense odor that filled the air",
        textExampleTranslate: "Скунс издал сильный запах, который наполнил воздух",
        id: 851,
        word: "intense",
        wordTranslate: "интенсивный"
      },
      {
        audioExample: "files/13_0853_example.mp3",
        textExample: "There is snow on the peaks of those mountains",
        textExampleTranslate: "На вершинах этих гор лежит снег",
        id: 853,
        word: "peak",
        wordTranslate: "пик"
      },
      {
        audioExample: "files/13_0854_example.mp3",
        textExample: "I’ve thought of some potential problems with your idea",
        textExampleTranslate: "Я подумал о некоторых потенциальных проблемах с вашей идеей",
        id: 854,
        word: "potential",
        wordTranslate: "потенциал"
      }
    ]
  },
  {
    "levelData": {
      id: "2_19",
      name: "Landscape with Merchants",
      imageSrc: "level2/2_19.jpg",
      cutSrc: "level2/cut/2_19.jpg",
      author: "CLAUDE LORRAIN",
      year: "1630"
    },
    words: [
      {
        audioExample: "files/13_0855_example.mp3",
        textExample: "I take pride in getting good grades",
        textExampleTranslate: "Я горжусь получением хороших оценок",
        id: 855,
        word: "pride",
        wordTranslate: "гордость"
      },
      {
        audioExample: "files/13_0857_example.mp3",
        textExample: "I quit running because I got tired",
        textExampleTranslate: "Я бросил бежать, потому что устал",
        id: 857,
        word: "quit",
        wordTranslate: "уволиться"
      },
      {
        audioExample: "files/13_0858_example.mp3",
        textExample: "The boy kept spinning until he fell down",
        textExampleTranslate: "Мальчик продолжал вращаться, пока не упал",
        id: 858,
        word: "spin",
        wordTranslate: "вращение"
      },
      {
        audioExample: "files/13_0859_example.mp3",
        textExample: "A baby’s hand is tiny",
        textExampleTranslate: "Рука ребенка крошечная",
        id: 859,
        word: "tiny",
        wordTranslate: "крошечный"
      },
      {
        audioExample: "files/14_0861_example.mp3",
        textExample: "Her happiness was apparent from the smile on her face",
        textExampleTranslate: "Ее счастье было видно по улыбке на ее лице",
        id: 861,
        word: "apparent",
        wordTranslate: "очевидный"
      },
      {
        audioExample: "files/14_0866_example.mp3",
        textExample: "Tony composed his report using many sources of information",
        textExampleTranslate: "Тони составил свой доклад, используя много источников информации",
        id: 866,
        word: "compose",
        wordTranslate: "сочинить"
      },
      {
        audioExample: "files/14_0868_example.mp3",
        textExample: "John exhausted himself by swimming all day",
        textExampleTranslate: "Джон исчерпал себя, плавая весь день",
        id: 868,
        word: "exhaust",
        wordTranslate: "выхлопные газы"
      },
      {
        audioExample: "files/14_0870_example.mp3",
        textExample: "I ignored the message he was making and kept studying",
        textExampleTranslate: "Я проигнорировал сообщение, которое он делал, и продолжал изучать",
        id: 870,
        word: "ignore",
        wordTranslate: "игнорировать"
      },
      {
        audioExample: "files/14_0873_example.mp3",
        textExample: "I only ate a small portion of the pizza",
        textExampleTranslate: "Я съел только небольшую часть пиццы",
        id: 873,
        word: "portion",
        wordTranslate: "часть"
      },
      {
        audioExample: "files/14_0874_example.mp3",
        textExample: "Nick’s dad reminded him to do his homework",
        textExampleTranslate: "Папа Ника напомнил ему сделать домашнее задание",
        id: 874,
        word: "remind",
        wordTranslate: "напомнить"
      }
    ]
  },
  {
    "levelData": {
      id: "2_20",
      name: "Landscape with Shepherds",
      imageSrc: "level2/2_20.jpg",
      cutSrc: "level2/cut/2_20.jpg",
      author: "CLAUDE LORRAIN",
      year: "1645-46"
    },
    words: [
      {
        audioExample: "files/14_0875_example.mp3",
        textExample: "Rebecca asked her secretary to type a report",
        textExampleTranslate: "Ребекка попросила своего секретаря напечатать отчет",
        id: 875,
        word: "secretary",
        wordTranslate: "секретарь"
      },
      {
        audioExample: "files/14_0877_example.mp3",
        textExample: "Maria has a talent for playing the piano",
        textExampleTranslate: "У Марии есть талант играть на пианино",
        id: 877,
        word: "talent",
        wordTranslate: "талант"
      },
      {
        audioExample: "files/14_0878_example.mp3",
        textExample: "She did not support her thesis very well",
        textExampleTranslate: "Она не очень хорошо поддержала свой тезис",
        id: 878,
        word: "thesis",
        wordTranslate: "тезис"
      },
      {
        audioExample: "files/14_0879_example.mp3",
        textExample: "All the members of our marching band wear matching uniforms",
        textExampleTranslate: "Все члены нашего оркестра носят подходящую форму",
        id: 879,
        word: "uniform",
        wordTranslate: "униформа"
      },
      {
        audioExample: "files/14_0880_example.mp3",
        textExample: "The eye doctor tested my vision",
        textExampleTranslate: "Глазной врач проверил мое зрение",
        id: 880,
        word: "vision",
        wordTranslate: "видение"
      },
      {
        audioExample: "files/15_0882_example.mp3",
        textExample: "My boss is a nice person",
        textExampleTranslate: "Мой босс хороший человек",
        id: 882,
        word: "boss",
        wordTranslate: "босс"
      },
      {
        audioExample: "files/15_0883_example.mp3",
        textExample: "I give money each year to a charitable foundation",
        textExampleTranslate: "Я каждый год отдаю деньги благотворительному фонду",
        id: 883,
        word: "charitable",
        wordTranslate: "благотворительный"
      },
      {
        audioExample: "files/15_0885_example.mp3",
        textExample: "The woman signed a contract when she bought the house",
        textExampleTranslate: "Женщина подписала контракт, когда купила дом",
        id: 885,
        word: "contract",
        wordTranslate: "контракт"
      },
      {
        audioExample: "files/15_0886_example.mp3",
        textExample: "My father has a crew that helps him build houses",
        textExampleTranslate: "У моего отца есть команда, которая помогает ему строить дома",
        id: 886,
        word: "crew",
        wordTranslate: "экипаж"
      },
      {
        audioExample: "files/15_0887_example.mp3",
        textExample: "She devotes two hours a day to playing the piano",
        textExampleTranslate: "Она посвящает два часа в день игре на пианино",
        id: 887,
        word: "devote",
        wordTranslate: "посвятить"
      }
    ]
  },
  {
    "levelData": {
      id: "2_21",
      name: "The Hay-Wain",
      imageSrc: "level2/2_21.jpg",
      cutSrc: "level2/cut/2_21.jpg",
      author: "CONSTABLE, John",
      year: "1821"
    },
    words: [
      {
        audioExample: "files/15_0889_example.mp3",
        textExample: "The young couple dined at their home",
        textExampleTranslate: "Молодая пара обедала у себя дома",
        id: 889,
        word: "dine",
        wordTranslate: "обедает"
      },
      {
        audioExample: "files/15_0890_example.mp3",
        textExample: "We donate money to charities every year",
        textExampleTranslate: "Мы жертвуем деньги благотворительным организациям каждый год",
        id: 890,
        word: "donate",
        wordTranslate: "пожертвовать"
      },
      {
        audioExample: "files/15_0891_example.mp3",
        textExample: "I paid almost double the amount for that shirt",
        textExampleTranslate: "Я заплатил почти вдвое больше за эту рубашку",
        id: 891,
        word: "double",
        wordTranslate: "двойной"
      },
      {
        audioExample: "files/15_0892_example.mp3",
        textExample: "The flavor of the ice cream was very good",
        textExampleTranslate: "Вкус мороженого был очень хорошим",
        id: 892,
        word: "flavor",
        wordTranslate: "аромат"
      },
      {
        audioExample: "files/15_0893_example.mp3",
        textExample: "The foundation raised money to give scholarships to students",
        textExampleTranslate: "Фонд собрал деньги, чтобы дать стипендии студентам",
        id: 893,
        word: "foundation",
        wordTranslate: "фонд"
      },
      {
        audioExample: "files/15_0894_example.mp3",
        textExample: "My grandparents are from a different generation than me",
        textExampleTranslate: "Мои бабушка и дедушка из другого поколения, чем я",
        id: 894,
        word: "generation",
        wordTranslate: "поколение"
      },
      {
        audioExample: "files/15_0897_example.mp3",
        textExample: "My brother played rugby in the mud. Now, he’s dirty",
        textExampleTranslate: "Мой брат играл в регби в грязи. Теперь он грязный",
        id: 897,
        word: "mud",
        wordTranslate: "грязь"
      },
      {
        audioExample: "files/15_0898_example.mp3",
        textExample: "The baby’s skin felt very smooth",
        textExampleTranslate: "Кожа малыша была очень гладкой",
        id: 898,
        word: "smooth",
        wordTranslate: "гладкий; плавный"
      },
      {
        audioExample: "files/16_0902_example.mp3",
        textExample: "I want to see the ancient buildings in Rome",
        textExampleTranslate: "Я хочу увидеть древние здания в Риме",
        id: 902,
        word: "ancient",
        wordTranslate: "древний"
      },
      {
        audioExample: "files/16_0903_example.mp3",
        textExample: "The sign was made of a few wooden boards",
        textExampleTranslate: "Знак был сделан из нескольких деревянных досок",
        id: 903,
        word: "board",
        wordTranslate: "доска"
      }
    ]
  },
  {
    "levelData": {
      id: "2_22",
      name: "The Bridge at Mantes",
      imageSrc: "level2/2_22.jpg",
      cutSrc: "level2/cut/2_22.jpg",
      author: "COROT, Jean-Baptiste Camille",
      year: "1868-70"
    },
    words: [
      {
        audioExample: "files/16_0904_example.mp3",
        textExample: "Our company is celebrating a century of business in London",
        textExampleTranslate: "Наша компания празднует столетие бизнеса в Лондоне",
        id: 904,
        word: "century",
        wordTranslate: "век"
      },
      {
        audioExample: "files/16_0905_example.mp3",
        textExample: "The detective found some clues on the sidewalk",
        textExampleTranslate: "Детектив нашел улики на тротуаре",
        id: 905,
        word: "clue",
        wordTranslate: "подсказка"
      },
      {
        audioExample: "files/16_0907_example.mp3",
        textExample: "He wanted to represent the citizens of his county",
        textExampleTranslate: "Он хотел представлять граждан своего округа",
        id: 907,
        word: "county",
        wordTranslate: "округ"
      },
      {
        audioExample: "files/16_0908_example.mp3",
        textExample: "I use the dictionary to learn new words",
        textExampleTranslate: "Я использую словарь, чтобы выучить новые слова",
        id: 908,
        word: "dictionary",
        wordTranslate: "толковый словарь"
      },
      {
        audioExample: "files/16_0909_example.mp3",
        textExample: "Do you really think that unicorns ever existed?",
        textExampleTranslate: "Вы действительно думаете, что единороги когда-либо существовали?",
        id: 909,
        word: "exist",
        wordTranslate: "существовать"
      },
      {
        audioExample: "files/16_0910_example.mp3",
        textExample: "My parents bought a new flat-screen TV on the weekend",
        textExampleTranslate: "Мои родители купили новый телевизор с плоским экраном на выходных",
        id: 910,
        word: "flat",
        wordTranslate: "квартира"
      },
      {
        audioExample: "files/16_0911_example.mp3",
        textExample: "My grandfather is a kind and helpful gentleman",
        textExampleTranslate: "Мой дедушка - добрый и отзывчивый джентльмен",
        id: 911,
        word: "gentleman",
        wordTranslate: "джентльмен"
      },
      {
        audioExample: "files/16_0912_example.mp3",
        textExample: "The hidden camera recorded everything in the parking lot",
        textExampleTranslate: "Скрытая камера записала все на стоянке",
        id: 912,
        word: "hidden",
        wordTranslate: "скрытый"
      },
      {
        audioExample: "files/16_0914_example.mp3",
        textExample: "The soldiers followed the orders of the officer",
        textExampleTranslate: "Солдаты следовали приказам офицера",
        id: 914,
        word: "officer",
        wordTranslate: "офицер"
      },
      {
        audioExample: "files/16_0915_example.mp3",
        textExample: "This is the original painting of the Mona Lisa",
        textExampleTranslate: "Это оригинальная картина Моны Лизы",
        id: 915,
        word: "original",
        wordTranslate: "оригинальный"
      }
    ]
  },
  {
    "levelData": {
      id: "2_23",
      name: "View of Frankfurt am Main",
      imageSrc: "level2/2_23.jpg",
      cutSrc: "level2/cut/2_23.jpg",
      author: "COURBET, Gustave",
      year: "1858"
    },
    words: [
      {
        audioExample: "files/16_0916_example.mp3",
        textExample: "He pounded the nail with the hammer",
        textExampleTranslate: "Он вбил гвоздь молотком",
        id: 916,
        word: "pound",
        wordTranslate: "фунт"
      },
      {
        audioExample: "files/16_0917_example.mp3",
        textExample: "Making a cake is a long process",
        textExampleTranslate: "Создание торта - это долгий процесс",
        id: 917,
        word: "process",
        wordTranslate: "обработать"
      },
      {
        audioExample: "files/16_0918_example.mp3",
        textExample: "That company publishes daily newspapers",
        textExampleTranslate: "Эта компания издает ежедневные газеты",
        id: 918,
        word: "publish",
        wordTranslate: "публиковать"
      },
      {
        audioExample: "files/16_0919_example.mp3",
        textExample: "We went to the theater to see a play",
        textExampleTranslate: "Мы пошли в театр, чтобы посмотреть пьесу",
        id: 919,
        word: "theater",
        wordTranslate: "театр"
      },
      {
        audioExample: "files/17_0921_example.mp3",
        textExample: "My aim is to become a helicopter pilot",
        textExampleTranslate: "Моя цель - стать пилотом вертолета",
        id: 921,
        word: "aim",
        wordTranslate: "цель"
      },
      {
        audioExample: "files/17_0922_example.mp3",
        textExample: "I attached the socks to the clothesline to dry",
        textExampleTranslate: "Я прикрепил носки к бельевой веревке, чтобы высохнуть",
        id: 922,
        word: "attach",
        wordTranslate: "прикреплять"
      },
      {
        audioExample: "files/17_0923_example.mp3",
        textExample: "How much will you bet that your horse will win?",
        textExampleTranslate: "На сколько вы поспорите, что ваша лошадь победит?",
        id: 923,
        word: "bet",
        wordTranslate: "ставка"
      },
      {
        audioExample: "files/17_0924_example.mp3",
        textExample: "We took a carriage ride in the park",
        textExampleTranslate: "Мы прокатились на карете в парке",
        id: 924,
        word: "carriage",
        wordTranslate: "перевозка"
      },
      {
        audioExample: "files/17_0925_example.mp3",
        textExample: "The athlete made a classic mistake-he started running too soon",
        textExampleTranslate: "Спортсмен совершил классическую ошибку - он слишком рано побежал",
        id: 925,
        word: "classic",
        wordTranslate: "классический"
      },
      {
        audioExample: "files/17_0926_example.mp3",
        textExample: "I usually commute to work on the train",
        textExampleTranslate: "Я обычно добираюсь до работы на поезде",
        id: 926,
        word: "commute",
        wordTranslate: "ездить"
      }
    ]
  },
  {
    "levelData": {
      id: "2_24",
      name: "The Cliff at Étretat after the Storm",
      imageSrc: "level2/2_24.jpg",
      cutSrc: "level2/cut/2_24.jpg",
      author: "COURBET, Gustave",
      year: "1869-70"
    },
    words: [
      {
        audioExample: "files/17_0927_example.mp3",
        textExample: "Winning the game confirmed that James was a good player",
        textExampleTranslate: "Победа в игре подтвердила, что Джеймс был хорошим игроком",
        id: 927,
        word: "confirm",
        wordTranslate: "подтвердить"
      },
      {
        audioExample: "files/17_0928_example.mp3",
        textExample: "He criticized his wife for spending too much money",
        textExampleTranslate: "Он критиковал свою жену за то, что она потратила слишком много денег",
        id: 928,
        word: "criticize",
        wordTranslate: "критиковать"
      },
      {
        audioExample: "files/17_0930_example.mp3",
        textExample: "She wrote down all the expenses for her trip",
        textExampleTranslate: "Она записала все расходы на ее поездку",
        id: 930,
        word: "expense",
        wordTranslate: "расходы"
      },
      {
        audioExample: "files/17_0932_example.mp3",
        textExample: "My height is 168 centimeters",
        textExampleTranslate: "Мой рост 168 сантиметров",
        id: 932,
        word: "height",
        wordTranslate: "высота"
      },
      {
        audioExample: "files/17_0933_example.mp3",
        textExample: "My grandfather has invented some interesting things",
        textExampleTranslate: "Мой дедушка изобрел некоторые интересные вещи",
        id: 933,
        word: "invent",
        wordTranslate: "изобрести"
      },
      {
        audioExample: "files/17_0935_example.mp3",
        textExample: "Building the house took a lot of labor",
        textExampleTranslate: "Строительство дома заняло много труда",
        id: 935,
        word: "labor",
        wordTranslate: "труд, работа"
      },
      {
        audioExample: "files/17_0936_example.mp3",
        textExample: "We took the car to the mechanic to be fixed",
        textExampleTranslate: "Мы взяли машину к механику, чтобы исправить",
        id: 936,
        word: "mechanic",
        wordTranslate: "механик"
      },
      {
        audioExample: "files/17_0937_example.mp3",
        textExample: "Dirty air is a prime cause of illness",
        textExampleTranslate: "Грязный воздух - главная причина болезней",
        id: 937,
        word: "prime",
        wordTranslate: "премьер"
      },
      {
        audioExample: "files/17_0940_example.mp3",
        textExample: "He sounded sincere when he apologized to me",
        textExampleTranslate: "Он звучал искренне, когда извинился передо мной",
        id: 940,
        word: "sincere",
        wordTranslate: "искренний"
      },
      {
        audioExample: "files/18_0941_example.mp3",
        textExample: "His swimming abilities let him cross the entire lake",
        textExampleTranslate: "Его способности плавать позволили ему пересечь все озеро",
        id: 941,
        word: "ability",
        wordTranslate: "способность"
      }
    ]
  },
  {
    "levelData": {
      id: "2_25",
      name: "Greenwood Lake",
      imageSrc: "level2/2_25.jpg",
      cutSrc: "level2/cut/2_25.jpg",
      author: "CROPSEY, Jasper Francis",
      year: "1870"
    },
    words: [
      {
        audioExample: "files/18_0942_example.mp3",
        textExample: "The farmer studied agriculture in college",
        textExampleTranslate: "Фермер изучал сельское хозяйство в колледже",
        id: 942,
        word: "agriculture",
        wordTranslate: "сельское хозяйство"
      },
      {
        audioExample: "files/18_0943_example.mp3",
        textExample: "Sometimes, people draw cartoons for the newspaper",
        textExampleTranslate: "Иногда люди рисуют мультфильмы для газеты",
        id: 943,
        word: "cartoon",
        wordTranslate: "мультфильм"
      },
      {
        audioExample: "files/18_0944_example.mp3",
        textExample: "He painted the ceiling with a special roller",
        textExampleTranslate: "Он расписал потолок специальным валиком",
        id: 944,
        word: "ceiling",
        wordTranslate: "потолок"
      },
      {
        audioExample: "files/18_0945_example.mp3",
        textExample: "She convinced me to buy the house",
        textExampleTranslate: "Она убедила меня купить дом",
        id: 945,
        word: "convince",
        wordTranslate: "убедить"
      },
      {
        audioExample: "files/18_0947_example.mp3",
        textExample: "I was delayed at the airport for over two hours",
        textExampleTranslate: "Я задержался в аэропорту более двух часов",
        id: 947,
        word: "delay",
        wordTranslate: "задержка"
      },
      {
        audioExample: "files/18_0948_example.mp3",
        textExample: "I do not let anybody read my diary",
        textExampleTranslate: "Я не позволяю никому читать мой дневник",
        id: 948,
        word: "diary",
        wordTranslate: "дневник"
      },
      {
        audioExample: "files/18_0949_example.mp3",
        textExample: "Tackling an opponent is Johnny’s favorite element of American football",
        textExampleTranslate: "Борьба с противником - любимый элемент американского футбола Джонни",
        id: 949,
        word: "element",
        wordTranslate: "элемент"
      },
      {
        audioExample: "files/18_0951_example.mp3",
        textExample: "The farmer planted two fields of grain this year",
        textExampleTranslate: "Фермер посадил два поля зерна в этом году",
        id: 951,
        word: "grain",
        wordTranslate: "зерно"
      },
      {
        audioExample: "files/18_0953_example.mp3",
        textExample: "The detective went to investigate the crime",
        textExampleTranslate: "Детектив отправился расследовать преступление",
        id: 953,
        word: "investigate",
        wordTranslate: "исследовать"
      },
      {
        audioExample: "files/18_0954_example.mp3",
        textExample: "I love baseball. I feel joy when I play",
        textExampleTranslate: "Я люблю бейсбол. Я чувствую радость, когда играю",
        id: 954,
        word: "joy",
        wordTranslate: "радость"
      }
    ]
  },
  {
    "levelData": {
      id: "2_26",
      name: "The Avenue at Meerdervoort",
      imageSrc: "level2/2_26.jpg",
      cutSrc: "level2/cut/2_26.jpg",
      author: "CUYP, Aelbert",
      year: "1650-52"
    },
    words: [
      {
        audioExample: "files/18_0956_example.mp3",
        textExample: "The monks knew a lot about religion",
        textExampleTranslate: "Монахи много знали о религии",
        id: 956,
        word: "monk",
        wordTranslate: "монах"
      },
      {
        audioExample: "files/18_0957_example.mp3",
        textExample: "Her cat is odd. It walks on two feet",
        textExampleTranslate: "Ее кошка странная. Она ходит на двух ногах",
        id: 957,
        word: "odd",
        wordTranslate: "странный"
      },
      {
        audioExample: "files/18_0959_example.mp3",
        textExample: "The priest taught us about God",
        textExampleTranslate: "Священник учил нас о Боге",
        id: 959,
        word: "priest",
        wordTranslate: "священник"
      },
      {
        audioExample: "files/19_0961_example.mp3",
        textExample: "Seth bought a new soccer ball",
        textExampleTranslate: "Сет купил новый футбольный мяч",
        id: 961,
        word: "ball",
        wordTranslate: "мяч"
      },
      {
        audioExample: "files/19_0963_example.mp3",
        textExample: "I want to work for a small software company",
        textExampleTranslate: "Я хочу работать в небольшой софтверной компании",
        id: 963,
        word: "company",
        wordTranslate: "компания"
      },
      {
        audioExample: "files/19_0964_example.mp3",
        textExample: "The woman likes to drink water after she exercises",
        textExampleTranslate: "Женщина любит пить воду после упражнений",
        id: 964,
        word: "drink",
        wordTranslate: "напиток"
      },
      {
        audioExample: "files/19_0965_example.mp3",
        textExample: "I have only a few coins",
        textExampleTranslate: "У меня всего несколько монет",
        id: 965,
        word: "few",
        wordTranslate: "несколько"
      },
      {
        audioExample: "files/19_0966_example.mp3",
        textExample: "This is the longest line I have ever seen",
        textExampleTranslate: "Это самая длинная линия, которую я когда-либо видел",
        id: 966,
        word: "line",
        wordTranslate: "линия"
      },
      {
        audioExample: "files/19_0967_example.mp3",
        textExample: "Tyler likes to spend time with his pet dog",
        textExampleTranslate: "Тайлер любит проводить время со своей собакой",
        id: 967,
        word: "pet",
        wordTranslate: "домашнее животное"
      },
      {
        audioExample: "files/19_0969_example.mp3",
        textExample: "Peter is responsible for leading his department",
        textExampleTranslate: "Петр отвечает за руководство своим отделом",
        id: 969,
        word: "responsible",
        wordTranslate: "ответственность"
      }
    ]
  },
  {
    "levelData": {
      id: "2_27",
      name: "The Valkhof at Nijmegen",
      imageSrc: "level2/2_27.jpg",
      cutSrc: "level2/cut/2_27.jpg",
      author: "CUYP, Aelbert",
      year: "1652-54"
    },
    words: [
      {
        audioExample: "files/19_0970_example.mp3",
        textExample: "This man’s job is to sell houses",
        textExampleTranslate: "Работа этого человека - продавать дома",
        id: 970,
        word: "sell",
        wordTranslate: "продать"
      },
      {
        audioExample: "files/19_0971_example.mp3",
        textExample: "Be careful of the snake in the tree",
        textExampleTranslate: "Будь осторожен со змеей на дереве",
        id: 971,
        word: "snake",
        wordTranslate: "змей"
      },
      {
        audioExample: "files/19_0972_example.mp3",
        textExample: "Allan prefers to stand and work at his desk",
        textExampleTranslate: "Аллан предпочитает стоять и работать за своим столом",
        id: 972,
        word: "stand",
        wordTranslate: "стоять"
      },
      {
        audioExample: "files/19_0973_example.mp3",
        textExample: "They are wearing strange masks",
        textExampleTranslate: "Они носят странные маски",
        id: 973,
        word: "strange",
        wordTranslate: "странный"
      },
      {
        audioExample: "files/19_0976_example.mp3",
        textExample: "The cat uses its tongue to drink water",
        textExampleTranslate: "Кошка использует свой язык, чтобы пить воду",
        id: 976,
        word: "tongue",
        wordTranslate: "язык"
      },
      {
        audioExample: "files/19_0977_example.mp3",
        textExample: "They are playing a fun game",
        textExampleTranslate: "Они играют в веселую игру",
        id: 977,
        word: "they",
        wordTranslate: "они"
      },
      {
        audioExample: "files/19_0978_example.mp3",
        textExample: "Tulips are a type of flower",
        textExampleTranslate: "Тюльпаны - это разновидность цветка",
        id: 978,
        word: "type",
        wordTranslate: "тип"
      },
      {
        audioExample: "files/19_0979_example.mp3",
        textExample: "An elephant is a very big animal",
        textExampleTranslate: "Слон очень большое животное",
        id: 979,
        word: "very",
        wordTranslate: "очень"
      },
      {
        audioExample: "files/19_0980_example.mp3",
        textExample: "She has to wait for the airplane to arrive",
        textExampleTranslate: "Она должна ждать прибытия самолета",
        id: 980,
        word: "wait",
        wordTranslate: "подождите"
      },
      {
        audioExample: "files/20_0981_example.mp3",
        textExample: "He accomplished his goal of running ten miles",
        textExampleTranslate: "Он достиг своей цели - пробежать десять миль",
        id: 981,
        word: "accomplish",
        wordTranslate: "выполнить"
      }
    ]
  },
  {
    "levelData": {
      id: "2_28",
      name: "Morning after a Stormy Night",
      imageSrc: "level2/2_28.jpg",
      cutSrc: "level2/cut/2_28.jpg",
      author: "DAHL, Johan Christian Clausen",
      year: "1819"
    },
    words: [
      {
        audioExample: "files/20_0982_example.mp3",
        textExample: "Her co-workers approved her new plan",
        textExampleTranslate: "Ее сотрудники одобрили ее новый план",
        id: 982,
        word: "approve",
        wordTranslate: "одобрить"
      },
      {
        audioExample: "files/20_0983_example.mp3",
        textExample: "My approximate height is two meters",
        textExampleTranslate: "Мой приблизительный рост - два метра",
        id: 983,
        word: "approximate",
        wordTranslate: "приблизительно"
      },
      {
        audioExample: "files/20_0986_example.mp3",
        textExample: "It is parents’ duty to take care of their children",
        textExampleTranslate: "Родители обязаны заботиться о своих детях",
        id: 986,
        word: "duty",
        wordTranslate: "долг"
      },
      {
        audioExample: "files/20_0987_example.mp3",
        textExample: "Children go to elementary school before high school",
        textExampleTranslate: "Дети ходят в начальную школу до старшей школы",
        id: 987,
        word: "elementary",
        wordTranslate: "элементарный"
      },
      {
        audioExample: "files/20_0988_example.mp3",
        textExample: "My cooking ended in failure because I burned the food",
        textExampleTranslate: "Моя готовка закончилась неудачей, потому что я сжег еду",
        id: 988,
        word: "failure",
        wordTranslate: "провал"
      },
      {
        audioExample: "files/20_0990_example.mp3",
        textExample: "My parents were immigrants. They came from Poland",
        textExampleTranslate: "Мои родители были иммигрантами. Они приехали из Польши",
        id: 990,
        word: "immigrant",
        wordTranslate: "иммигрант"
      },
      {
        audioExample: "files/20_0991_example.mp3",
        textExample: "He inserted an extra sentence into the story",
        textExampleTranslate: "Он вставил дополнительное предложение в историю",
        id: 991,
        word: "insert",
        wordTranslate: "вставить"
      },
      {
        audioExample: "files/20_0992_example.mp3",
        textExample: "A microwave oven cooks food in an instant",
        textExampleTranslate: "Микроволновая печь готовит еду в одно мгновение",
        id: 992,
        word: "instant",
        wordTranslate: "мгновенное"
      },
      {
        audioExample: "files/20_0993_example.mp3",
        textExample: "Poverty is a problem in many countries around the world",
        textExampleTranslate: "Бедность является проблемой во многих странах мира",
        id: 993,
        word: "poverty",
        wordTranslate: "бедность"
      },
      {
        audioExample: "files/20_0994_example.mp3",
        textExample: "The boy liked to pretend he was a king",
        textExampleTranslate: "Мальчику нравилось притворяться, что он король",
        id: 994,
        word: "pretend",
        wordTranslate: "делать вид"
      }
    ]
  },
  {
    "levelData": {
      id: "2_29",
      name: "Eruption of the Vesuvius",
      imageSrc: "level2/2_29.jpg",
      cutSrc: "level2/cut/2_29.jpg",
      author: "DAHL, Johan Christian Clausen",
      year: "1823"
    },
    words: [
      {
        audioExample: "files/20_0996_example.mp3",
        textExample: "The hero got recognition for his brave deed",
        textExampleTranslate: "Герой получил признание за свой смелый поступок",
        id: 996,
        word: "recognition",
        wordTranslate: "признание"
      },
      {
        audioExample: "files/20_0997_example.mp3",
        textExample: "Supermarkets refrigerate fruit to make it last long",
        textExampleTranslate: "Супермаркеты хранят фрукты в холодильнике так долго",
        id: 997,
        word: "refrigerate",
        wordTranslate: "замораживать"
      },
      {
        audioExample: "files/21_1001_example.mp3",
        textExample: "He damaged the car in an accident",
        textExampleTranslate: "Он повредил машину в результате аварии",
        id: 1001,
        word: "accident",
        wordTranslate: "несчастный случай"
      },
      {
        audioExample: "files/21_1002_example.mp3",
        textExample: "The astronaut was walking on the moon",
        textExampleTranslate: "Астронавт шел по луне",
        id: 1002,
        word: "astronaut",
        wordTranslate: "космонавт"
      },
      {
        audioExample: "files/21_1004_example.mp3",
        textExample: "The man had the courage to touch the lion",
        textExampleTranslate: "Человек имел смелость дотронуться до льва",
        id: 1004,
        word: "courage",
        wordTranslate: "мужество"
      },
      {
        audioExample: "files/21_1005_example.mp3",
        textExample: "The boy’s toy boat floated in the pool",
        textExampleTranslate: "Игрушечная лодка мальчика плыла в бассейне",
        id: 1005,
        word: "float",
        wordTranslate: "плавать"
      },
      {
        audioExample: "files/21_1007_example.mp3",
        textExample: "There is no gravity in space",
        textExampleTranslate: "В космосе нет гравитации",
        id: 1007,
        word: "gravity",
        wordTranslate: "сила тяжести"
      },
      {
        audioExample: "files/21_1009_example.mp3",
        textExample: "The miner was looking for gold",
        textExampleTranslate: "Шахтер искал золото",
        id: 1009,
        word: "miner",
        wordTranslate: "шахтер"
      },
      {
        audioExample: "files/21_1010_example.mp3",
        textExample: "Rocks are made up of different kinds of minerals",
        textExampleTranslate: "Горные породы состоят из разных видов минералов",
        id: 1010,
        word: "mineral",
        wordTranslate: "минеральная"
      },
      {
        audioExample: "files/21_1011_example.mp3",
        textExample: "The students participated in the school play",
        textExampleTranslate: "Учащиеся участвовали в школьной пьесе",
        id: 1011,
        word: "participate",
        wordTranslate: "участвовать"
      }
    ]
  },
  {
    "levelData": {
      id: "2_30",
      name: "Landscape with Shepherds",
      imageSrc: "level2/2_30.jpg",
      cutSrc: "level2/cut/2_30.jpg",
      author: "DALEM, Cornelis van",
      year: "1550-60"
    },
    words: [
      {
        audioExample: "files/21_1012_example.mp3",
        textExample: "I have permission to drive my mom’s car",
        textExampleTranslate: "У меня есть разрешение водить машину моей мамы",
        id: 1012,
        word: "permission",
        wordTranslate: "разрешение"
      },
      {
        audioExample: "files/21_1013_example.mp3",
        textExample: "I poured some milk into my sister’s cup",
        textExampleTranslate: "Я налил немного молока в чашку моей сестры",
        id: 1013,
        word: "pour",
        wordTranslate: "влить"
      },
      {
        audioExample: "files/21_1014_example.mp3",
        textExample: "The company dumped raw sewage into the river",
        textExampleTranslate: "Компания сбросила сырые сточные воды в реку",
        id: 1014,
        word: "raw",
        wordTranslate: "сырой"
      },
      {
        audioExample: "files/21_1015_example.mp3",
        textExample: "The satellite was traveling around the Earth",
        textExampleTranslate: "Спутник путешествовал вокруг Земли",
        id: 1015,
        word: "satellite",
        wordTranslate: "спутниковое"
      },
      {
        audioExample: "files/21_1017_example.mp3",
        textExample: "He skipped work to get more sleep",
        textExampleTranslate: "Он пропустил работу, чтобы больше спать",
        id: 1017,
        word: "skip",
        wordTranslate: "пропускать"
      },
      {
        audioExample: "files/21_1018_example.mp3",
        textExample: "She stretched her body before exercising",
        textExampleTranslate: "Она вытянула тело перед тренировкой",
        id: 1018,
        word: "stretch",
        wordTranslate: "протяжение"
      },
      {
        audioExample: "files/21_1020_example.mp3",
        textExample: "Subway trains travel underground",
        textExampleTranslate: "Поезда метрополитена едут под землей",
        id: 1020,
        word: "underground",
        wordTranslate: "метро"
      },
      {
        audioExample: "files/22_1022_example.mp3",
        textExample: "The man was arrested for breaking the law",
        textExampleTranslate: "Человек был арестован за нарушение закона",
        id: 1022,
        word: "arrest",
        wordTranslate: "арест"
      },
      {
        audioExample: "files/22_1024_example.mp3",
        textExample: "I like small dog breeds, such as terriers",
        textExampleTranslate: "Мне нравятся маленькие породы собак, такие как терьеры",
        id: 1024,
        word: "breed",
        wordTranslate: "разводить"
      },
      {
        audioExample: "files/22_1025_example.mp3",
        textExample: "I filled the bucket with water",
        textExampleTranslate: "Я наполнил ведро водой",
        id: 1025,
        word: "bucket",
        wordTranslate: "ведро"
      }
    ]
  },
  {
    "levelData": {
      id: "2_31",
      name: "The Barges",
      imageSrc: "level2/2_31.jpg",
      cutSrc: "level2/cut/2_31.jpg",
      author: "DAUBIGNY, Charles-François",
      year: "1865"
    },
    words: [
      {
        audioExample: "files/22_1027_example.mp3",
        textExample: "He was convicted of the crime and sent to jail",
        textExampleTranslate: "Он был осужден за преступление и отправлен в тюрьму",
        id: 1027,
        word: "convict",
        wordTranslate: "осужденный"
      },
      {
        audioExample: "files/22_1028_example.mp3",
        textExample: "I heard the song at the music festival in London",
        textExampleTranslate: "Я слышал песню на музыкальном фестивале в Лондоне",
        id: 1028,
        word: "festival",
        wordTranslate: "фестиваль"
      },
      {
        audioExample: "files/22_1030_example.mp3",
        textExample: "The journalist took notes for a story he was writing",
        textExampleTranslate: "Журналист делал заметки для рассказа, который он писал",
        id: 1030,
        word: "journalist",
        wordTranslate: "журналист"
      },
      {
        audioExample: "files/22_1031_example.mp3",
        textExample: "All the girl wanted for her birthday was a pup",
        textExampleTranslate: "Все, чего девушка хотела на день рождения, это щенок",
        id: 1031,
        word: "pup",
        wordTranslate: "щенок"
      },
      {
        audioExample: "files/22_1033_example.mp3",
        textExample: "I repaired the flat tire on my car",
        textExampleTranslate: "Я отремонтировал спущенное колесо на моей машине",
        id: 1033,
        word: "repair",
        wordTranslate: "ремонт"
      },
      {
        audioExample: "files/22_1035_example.mp3",
        textExample: "A thief has robbed me of my passport",
        textExampleTranslate: "Вор украл у меня паспорт",
        id: 1035,
        word: "rob",
        wordTranslate: "грабят"
      },
      {
        audioExample: "files/22_1036_example.mp3",
        textExample: "The man slipped on the wet floor",
        textExampleTranslate: "Человек поскользнулся на мокром полу",
        id: 1036,
        word: "slip",
        wordTranslate: "проскальзывание"
      },
      {
        audioExample: "files/22_1038_example.mp3",
        textExample: "The chair is stable. Its legs are strong",
        textExampleTranslate: "Стул устойчив. Его ноги крепкие",
        id: 1038,
        word: "stable",
        wordTranslate: "стабильный"
      },
      {
        audioExample: "files/22_1039_example.mp3",
        textExample: "There was a box of tissue on the table",
        textExampleTranslate: "На столе была коробка с тканью",
        id: 1039,
        word: "tissue",
        wordTranslate: "ткань"
      },
      {
        audioExample: "files/22_1040_example.mp3",
        textExample: "The girls jumped rope in the yard",
        textExampleTranslate: "Девушки прыгали через скакалку во дворе",
        id: 1040,
        word: "yard",
        wordTranslate: "двор"
      }
    ]
  },
  {
    "levelData": {
      id: "2_32",
      name: "The Sea from the Heights of Dieppe",
      imageSrc: "level2/2_32.jpg",
      cutSrc: "level2/cut/2_32.jpg",
      author: "DELACROIX, Eugène",
      year: "1852"
    },
    words: [
      {
        audioExample: "files/23_1041_example.mp3",
        textExample: "I got the best score on the math test",
        textExampleTranslate: "Я получил лучший результат на тесте по математике",
        id: 1041,
        word: "best",
        wordTranslate: "лучший"
      },
      {
        audioExample: "files/23_1042_example.mp3",
        textExample: "Adam used his library card to borrow a book",
        textExampleTranslate: "Адам использовал свою библиотечную карточку, чтобы одолжить книгу",
        id: 1042,
        word: "card",
        wordTranslate: "открытка"
      },
      {
        audioExample: "files/23_1043_example.mp3",
        textExample: "The crowd waved to the camera",
        textExampleTranslate: "Толпа помахала перед камерой",
        id: 1043,
        word: "crowd",
        wordTranslate: "толпа людей"
      },
      {
        audioExample: "files/23_1044_example.mp3",
        textExample: "There are two more days until the weekend",
        textExampleTranslate: "До выходных осталось еще два дня",
        id: 1044,
        word: "day",
        wordTranslate: "день"
      },
      {
        audioExample: "files/23_1045_example.mp3",
        textExample: "My favorite dish at the restaurant is chicken curry",
        textExampleTranslate: "Мое любимое блюдо в ресторане - куриное карри",
        id: 1045,
        word: "dish",
        wordTranslate: "блюдо"
      },
      {
        audioExample: "files/23_1046_example.mp3",
        textExample: "Karen is happy because her English homework is easy",
        textExampleTranslate: "Карен счастлива, потому что ее домашнее задание по английскому легко",
        id: 1046,
        word: "easy",
        wordTranslate: "легко"
      },
      {
        audioExample: "files/23_1048_example.mp3",
        textExample: "This family is staying at their favorite hotel",
        textExampleTranslate: "Эта семья останавливается в своем любимом отеле",
        id: 1048,
        word: "hotel",
        wordTranslate: "гостиница"
      },
      {
        audioExample: "files/23_1049_example.mp3",
        textExample: "The man waited for the train for over an hour",
        textExampleTranslate: "Человек ждал поезда более часа",
        id: 1049,
        word: "hour",
        wordTranslate: "час"
      },
      {
        audioExample: "files/23_1051_example.mp3",
        textExample: "I go to the market every weekend to buy vegetables",
        textExampleTranslate: "Я иду на рынок каждые выходные, чтобы купить овощи",
        id: 1051,
        word: "market",
        wordTranslate: "рынок"
      },
      {
        audioExample: "files/23_1052_example.mp3",
        textExample: "It’s Sam’s turn to plan the company party",
        textExampleTranslate: "Сейчас очередь Сэма спланировать вечеринку компании",
        id: 1052,
        word: "plan",
        wordTranslate: "план"
      }
    ]
  },
  {
    "levelData": {
      id: "2_33",
      name: "Architectural Capriccio with Jephthah and His Daughter",
      imageSrc: "level2/2_33.jpg",
      cutSrc: "level2/cut/2_33.jpg",
      author: "DELEN, Dirck van",
      year: "1633"
    },
    words: [
      {
        audioExample: "files/23_1053_example.mp3",
        textExample: "Julie is checking the price of a sweater",
        textExampleTranslate: "Джули проверяет цену на свитер",
        id: 1053,
        word: "price",
        wordTranslate: "цена"
      },
      {
        audioExample: "files/23_1054_example.mp3",
        textExample: "The days are short in the winter",
        textExampleTranslate: "Дни зимой короткие",
        id: 1054,
        word: "short",
        wordTranslate: "короткая"
      },
      {
        audioExample: "files/23_1055_example.mp3",
        textExample: "Tom decided to shop for groceries on his way home",
        textExampleTranslate: "Том решил купить продукты по пути домой",
        id: 1055,
        word: "shop",
        wordTranslate: "магазин"
      },
      {
        audioExample: "files/23_1056_example.mp3",
        textExample: "This man is waiting at the train station",
        textExampleTranslate: "Этот человек ждет на вокзале",
        id: 1056,
        word: "station",
        wordTranslate: "станция"
      },
      {
        audioExample: "files/23_1057_example.mp3",
        textExample: "His parents decided to surprise him with a puppy",
        textExampleTranslate: "Его родители решили удивить его щенком",
        id: 1057,
        word: "surprise",
        wordTranslate: "сюрприз"
      },
      {
        audioExample: "files/23_1058_example.mp3",
        textExample: "This device controls the building’s heating system",
        textExampleTranslate: "Это устройство управляет системой отопления здания",
        id: 1058,
        word: "system",
        wordTranslate: "система"
      },
      {
        audioExample: "files/23_1060_example.mp3",
        textExample: "Two friends study together at the coffee shop",
        textExampleTranslate: "Двое друзей учатся вместе в кафе",
        id: 1060,
        word: "two",
        wordTranslate: "два"
      },
      {
        audioExample: "files/24_1061_example.mp3",
        textExample: "After playing in the dirt, the boy took a bath",
        textExampleTranslate: "Поиграв в грязи, мальчик принял ванну",
        id: 1061,
        word: "bath",
        wordTranslate: "ванна"
      },
      {
        audioExample: "files/24_1063_example.mp3",
        textExample: "I always chew my food carefully before swallowing it",
        textExampleTranslate: "Я всегда тщательно пережевываю еду, прежде чем проглотить ее",
        id: 1063,
        word: "chew",
        wordTranslate: "жевать"
      },
      {
        audioExample: "files/24_1064_example.mp3",
        textExample: "The disabled man used a wheelchair to move around",
        textExampleTranslate: "Инвалид использовал инвалидное кресло для передвижения",
        id: 1064,
        word: "disabled",
        wordTranslate: "отключен"
      }
    ]
  },
  {
    "levelData": {
      id: "2_34",
      name: "The Pont Neuf and the Quai des Orfèvres, from the Place du Pont Neuf",
      imageSrc: "level2/2_34.jpg",
      cutSrc: "level2/cut/2_34.jpg",
      author: "DELPY, Hippolyte-Camille",
      year: "1875"
    },
    words: [
      {
        audioExample: "files/24_1067_example.mp3",
        textExample: "Our country has a beautiful flag",
        textExampleTranslate: "У нашей страны красивый флаг",
        id: 1067,
        word: "flag",
        wordTranslate: "флаг"
      },
      {
        audioExample: "files/24_1070_example.mp3",
        textExample: "Water is the most important liquid for life",
        textExampleTranslate: "Вода - самая важная жидкость для жизни",
        id: 1070,
        word: "liquid",
        wordTranslate: "жидкость"
      },
      {
        audioExample: "files/24_1071_example.mp3",
        textExample: "We marveled at her excellent piano playing",
        textExampleTranslate: "Мы восхищались ее великолепной игрой на пианино",
        id: 1071,
        word: "marvel",
        wordTranslate: "удивляюсь"
      },
      {
        audioExample: "files/24_1074_example.mp3",
        textExample: "I regret that I was mean to my sister",
        textExampleTranslate: "Я сожалею, что я был злым с моей сестрой",
        id: 1074,
        word: "regret",
        wordTranslate: "сожаление"
      },
      {
        audioExample: "files/24_1077_example.mp3",
        textExample: "I needed surgery to repair my leg after the accident",
        textExampleTranslate: "Мне нужна была операция, чтобы восстановить ногу после аварии",
        id: 1077,
        word: "surgery",
        wordTranslate: "операция"
      },
      {
        audioExample: "files/24_1080_example.mp3",
        textExample: "Your love for me has greater value than gold",
        textExampleTranslate: "Твоя любовь ко мне имеет большую ценность, чем золото",
        id: 1080,
        word: "value",
        wordTranslate: "ценность"
      },
      {
        audioExample: "files/25_1082_example.mp3",
        textExample: "There was a beautiful sunset",
        textExampleTranslate: "Был красивый закат",
        id: 1082,
        word: "beautiful",
        wordTranslate: "прекрасный"
      },
      {
        audioExample: "files/25_1085_example.mp3",
        textExample: "The Earth was covered with clouds",
        textExampleTranslate: "Земля была покрыта облаками",
        id: 1085,
        word: "cover",
        wordTranslate: "обложка"
      },
      {
        audioExample: "files/25_1087_example.mp3",
        textExample: "They formed a new government",
        textExampleTranslate: "Они сформировали новое правительство",
        id: 1087,
        word: "form",
        wordTranslate: "форма"
      },
      {
        audioExample: "files/25_1091_example.mp3",
        textExample: "I was frightened by a large bird",
        textExampleTranslate: "Я был напуган большой птицей",
        id: 1091,
        word: "large",
        wordTranslate: "большой"
      }
    ]
  },
  {
    "levelData": {
      id: "2_35",
      name: "Houses at a Millrace",
      imageSrc: "level2/2_35.jpg",
      cutSrc: "level2/cut/2_35.jpg",
      author: "DEPPE, Ludwig",
      year: "1820"
    },
    words: [
      {
        audioExample: "files/25_1092_example.mp3",
        textExample: "The moon looks beautiful tonight",
        textExampleTranslate: "Луна выглядит красиво сегодня вечером",
        id: 1092,
        word: "moon",
        wordTranslate: "луна"
      },
      {
        audioExample: "files/25_1093_example.mp3",
        textExample: "The heat from the fireplace radiated throughout the room",
        textExampleTranslate: "Тепло от камина излучается по всей комнате",
        id: 1093,
        word: "radiate",
        wordTranslate: "излучать"
      },
      {
        audioExample: "files/25_1094_example.mp3",
        textExample: "All day, the cows roamed around the field eating grass",
        textExampleTranslate: "Весь день коровы бродили по полю, питаясь травой",
        id: 1094,
        word: "roam",
        wordTranslate: "странствовать"
      },
      {
        audioExample: "files/25_1095_example.mp3",
        textExample: "The only thing in the room was a solitary chair",
        textExampleTranslate: "Единственное, что было в комнате - это одинокий стул",
        id: 1095,
        word: "solitary",
        wordTranslate: "одинокий"
      },
      {
        audioExample: "files/25_1096_example.mp3",
        textExample: "You can see the entire spectrum in a rainbow",
        textExampleTranslate: "Вы можете увидеть весь спектр в радуге",
        id: 1096,
        word: "spectrum",
        wordTranslate: "спектр"
      },
      {
        audioExample: "files/25_1097_example.mp3",
        textExample: "The balloons were inflated into a variety of colorful spheres",
        textExampleTranslate: "Воздушные шары были накачаны во множество красочных сфер",
        id: 1097,
        word: "sphere",
        wordTranslate: "сфера"
      },
      {
        audioExample: "files/25_1098_example.mp3",
        textExample: "The stars come out at night",
        textExampleTranslate: "Звезды выходят ночью",
        id: 1098,
        word: "star",
        wordTranslate: "звезда"
      },
      {
        audioExample: "files/25_1100_example.mp3",
        textExample: "It was an ugly sight",
        textExampleTranslate: "Это было ужасное зрелище",
        id: 1100,
        word: "ugly",
        wordTranslate: "некрасиво"
      },
      {
        audioExample: "files/26_1101_example.mp3",
        textExample: "She accused her brother of breaking her computer",
        textExampleTranslate: "Она обвинила своего брата в том, что он сломал свой компьютер",
        id: 1101,
        word: "accuse",
        wordTranslate: "обвиняют"
      },
      {
        audioExample: "files/26_1102_example.mp3",
        textExample: "He adjusted the old guitar to make it sound better",
        textExampleTranslate: "Он настроил старую гитару, чтобы она звучала лучше",
        id: 1102,
        word: "adjust",
        wordTranslate: "настроить"
      }
    ]
  },
  {
    "levelData": {
      id: "2_36",
      name: "The Forest in Fontainebleau",
      imageSrc: "level2/2_36.jpg",
      cutSrc: "level2/cut/2_36.jpg",
      author: "DIAZ DE LA PEÑA, Narcisse Virgile",
      year: "1867"
    },
    words: [
      {
        audioExample: "files/26_1103_example.mp3",
        textExample: "The singer was very good. She amused the crowd",
        textExampleTranslate: "Певица была очень хороша. Она позабавила толпу",
        id: 1103,
        word: "amuse",
        wordTranslate: "развлекаться"
      },
      {
        audioExample: "files/26_1104_example.mp3",
        textExample: "The diver admired the beautiful coral under the water",
        textExampleTranslate: "Дайвер восхищался красивым кораллом под водой",
        id: 1104,
        word: "coral",
        wordTranslate: "коралл"
      },
      {
        audioExample: "files/26_1107_example.mp3",
        textExample: "A ship will store many supplies below its deck",
        textExampleTranslate: "Корабль будет хранить много припасов под своей палубой",
        id: 1107,
        word: "deck",
        wordTranslate: "палуба"
      },
      {
        audioExample: "files/26_1109_example.mp3",
        textExample: "He sleeps better on a firm bed",
        textExampleTranslate: "Он лучше спит на твердой кровати",
        id: 1109,
        word: "firm",
        wordTranslate: "фирма"
      },
      {
        audioExample: "files/26_1111_example.mp3",
        textExample: "The grand mountain rose high into the sky",
        textExampleTranslate: "Великая гора поднялась высоко в небо",
        id: 1111,
        word: "grand",
        wordTranslate: "гранд"
      },
      {
        audioExample: "files/26_1112_example.mp3",
        textExample: "The wind from the hurricane bent the palm tree",
        textExampleTranslate: "Ветер от урагана согнул пальму",
        id: 1112,
        word: "hurricane",
        wordTranslate: "ураган"
      },
      {
        audioExample: "files/26_1113_example.mp3",
        textExample: "I suffered a big loss while I was gambling",
        textExampleTranslate: "Я понес большие потери, играя в азартные игры",
        id: 1113,
        word: "loss",
        wordTranslate: "потеря"
      },
      {
        audioExample: "files/26_1116_example.mp3",
        textExample: "Please shut the door; the air outside is cold",
        textExampleTranslate: "Пожалуйста, закрой дверь; воздух снаружи холодный",
        id: 1116,
        word: "shut",
        wordTranslate: "закрыть"
      },
      {
        audioExample: "files/26_1120_example.mp3",
        textExample: "Firefighters often work in danger zones",
        textExampleTranslate: "Пожарные часто работают в опасных зонах",
        id: 1120,
        word: "zone",
        wordTranslate: "зона"
      },
      {
        audioExample: "files/27_1122_example.mp3",
        textExample: "The bold man climbed the high mountain",
        textExampleTranslate: "Смелый человек поднялся на высокую гору",
        id: 1122,
        word: "bold",
        wordTranslate: "смелый"
      }
    ]
  },
  {
    "levelData": {
      id: "2_37",
      name: "View from the Giudecca, Venice",
      imageSrc: "level2/2_37.jpg",
      cutSrc: "level2/cut/2_37.jpg",
      author: "DOMENICHINI, Apollonio",
      year: "1744"
    },
    words: [
      {
        audioExample: "files/27_1123_example.mp3",
        textExample: "Birds like eating bugs",
        textExampleTranslate: "Птицы любят есть жуков",
        id: 1123,
        word: "bug",
        wordTranslate: "ошибка"
      },
      {
        audioExample: "files/27_1124_example.mp3",
        textExample: "James tried to capture the bubbles in his hands",
        textExampleTranslate: "Джеймс пытался поймать пузырьки в руках",
        id: 1124,
        word: "capture",
        wordTranslate: "захватить"
      },
      {
        audioExample: "files/27_1125_example.mp3",
        textExample: "The duke ruled over the land",
        textExampleTranslate: "Герцог правил страной",
        id: 1125,
        word: "duke",
        wordTranslate: "герцог"
      },
      {
        audioExample: "files/27_1126_example.mp3",
        textExample: "He took off his shirt to expose his costume",
        textExampleTranslate: "Он снял рубашку, чтобы выставить свой костюм",
        id: 1126,
        word: "expose",
        wordTranslate: "выставить"
      },
      {
        audioExample: "files/27_1127_example.mp3",
        textExample: "I felt guilty for taking my sister’s cookies",
        textExampleTranslate: "Я чувствовал себя виноватым за то, что взял печенье моей сестры",
        id: 1127,
        word: "guilty",
        wordTranslate: "виновен"
      },
      {
        audioExample: "files/27_1128_example.mp3",
        textExample: "We hired a man to paint our house",
        textExampleTranslate: "Мы наняли человека, чтобы нарисовать наш дом",
        id: 1128,
        word: "hire",
        wordTranslate: "наем"
      },
      {
        audioExample: "files/27_1130_example.mp3",
        textExample: "The reporter spoke a language Sally had never heard before",
        textExampleTranslate: "Репортер говорил на языке, который Салли никогда раньше не слышала",
        id: 1130,
        word: "language",
        wordTranslate: "язык"
      },
      {
        audioExample: "files/27_1131_example.mp3",
        textExample: "The minister of education controls the country’s schools",
        textExampleTranslate: "Министр образования контролирует школы страны",
        id: 1131,
        word: "minister",
        wordTranslate: "министр"
      },
      {
        audioExample: "files/27_1132_example.mp3",
        textExample: "Today was just an ordinary day. Nothing unusual happened",
        textExampleTranslate: "Сегодня был обычный день. Ничего необычного не произошло",
        id: 1132,
        word: "ordinary",
        wordTranslate: "обычный"
      },
      {
        audioExample: "files/27_1135_example.mp3",
        textExample: "Young children often have trouble pronouncing words right",
        textExampleTranslate: "Маленьким детям часто трудно правильно произносить слова",
        id: 1135,
        word: "pronounce",
        wordTranslate: "произносится"
      }
    ]
  },
  {
    "levelData": {
      id: "2_38",
      name: "Landscape with Ford",
      imageSrc: "level2/2_38.jpg",
      cutSrc: "level2/cut/2_38.jpg",
      author: "DOMENICHINO",
      year: "1603"
    },
    words: [
      {
        audioExample: "files/27_1136_example.mp3",
        textExample: "The baby really resembles his father",
        textExampleTranslate: "Ребенок действительно похож на своего отца",
        id: 1136,
        word: "resemble",
        wordTranslate: "напоминают"
      },
      {
        audioExample: "files/27_1138_example.mp3",
        textExample: "The tobacco in cigarettes is bad for you",
        textExampleTranslate: "Табак в сигаретах вреден для вас",
        id: 1138,
        word: "tobacco",
        wordTranslate: "табак"
      },
      {
        audioExample: "files/27_1140_example.mp3",
        textExample: "People think that witches fly around on broomsticks",
        textExampleTranslate: "Люди думают, что ведьмы летают на метлах",
        id: 1140,
        word: "witch",
        wordTranslate: "ведьма"
      },
      {
        audioExample: "files/28_1141_example.mp3",
        textExample: "My brothers accompanied me to the movie",
        textExampleTranslate: "Мои братья сопровождали меня в кино",
        id: 1141,
        word: "accompany",
        wordTranslate: "сопровождать"
      },
      {
        audioExample: "files/28_1142_example.mp3",
        textExample: "He likes to walk around in his bare feet",
        textExampleTranslate: "Он любит гулять босиком",
        id: 1142,
        word: "bare",
        wordTranslate: "голый"
      },
      {
        audioExample: "files/28_1143_example.mp3",
        textExample: "The monkey was hanging from a branch on the tree",
        textExampleTranslate: "Обезьяна висела на ветке на дереве",
        id: 1143,
        word: "branch",
        wordTranslate: "филиал"
      },
      {
        audioExample: "files/28_1144_example.mp3",
        textExample: "You can’t take a breath under water",
        textExampleTranslate: "Нельзя дышать под водой",
        id: 1144,
        word: "breath",
        wordTranslate: "дыхание"
      },
      {
        audioExample: "files/28_1145_example.mp3",
        textExample: "The old bridge fell into the river",
        textExampleTranslate: "Старый мост упал в реку",
        id: 1145,
        word: "bridge",
        wordTranslate: "мост"
      },
      {
        audioExample: "files/28_1146_example.mp3",
        textExample: "The fisherman cast his line into the water",
        textExampleTranslate: "Рыбак бросил свою леску в воду",
        id: 1146,
        word: "cast",
        wordTranslate: "бросать"
      },
      {
        audioExample: "files/28_1147_example.mp3",
        textExample: "He dared to jump out of the airplane and skydive",
        textExampleTranslate: "Он осмелился выпрыгнуть из самолета и прыгнуть с парашютом",
        id: 1147,
        word: "dare",
        wordTranslate: "смели"
      }
    ]
  },
  {
    "levelData": {
      id: "2_39",
      name: "Gorge",
      imageSrc: "level2/2_39.jpg",
      cutSrc: "level2/cut/2_39.jpg",
      author: "DORÉ, Gustave",
      year: "1878"
    },
    words: [
      {
        audioExample: "files/28_1148_example.mp3",
        textExample: "I like having electronic devices such as an MP3 player",
        textExampleTranslate: "Мне нравится иметь электронные устройства, такие как MP3-плеер",
        id: 1148,
        word: "electronic",
        wordTranslate: "электронный"
      },
      {
        audioExample: "files/28_1149_example.mp3",
        textExample: "The visitor got a room at the inn",
        textExampleTranslate: "Посетитель получил комнату в гостинице",
        id: 1149,
        word: "inn",
        wordTranslate: "гостиница"
      },
      {
        audioExample: "files/28_1150_example.mp3",
        textExample: "The boy caught butterflies in his net",
        textExampleTranslate: "Мальчик поймал бабочек в своей сети",
        id: 1150,
        word: "net",
        wordTranslate: "сеть"
      },
      {
        audioExample: "files/28_1151_example.mp3",
        textExample: "My philosophy is “live and let live.”",
        textExampleTranslate: "Моя философия - 'живи и дай жить другим'",
        id: 1151,
        word: "philosophy",
        wordTranslate: "философия"
      },
      {
        audioExample: "files/28_1152_example.mp3",
        textExample: "Don’t touch the pot on the stove. It’s hot",
        textExampleTranslate: "Не трогай кастрюлю на плите. Она горячая",
        id: 1152,
        word: "pot",
        wordTranslate: "горшок"
      },
      {
        audioExample: "files/28_1156_example.mp3",
        textExample: "We learned how to subtract numbers in class",
        textExampleTranslate: "Мы научились вычитать числа в классе",
        id: 1156,
        word: "subtract",
        wordTranslate: "вычитать"
      },
      {
        audioExample: "files/28_1157_example.mp3",
        textExample: "The knots were too tight to untie",
        textExampleTranslate: "Узлы были слишком туго, чтобы развязать",
        id: 1157,
        word: "tight",
        wordTranslate: "плотно"
      },
      {
        audioExample: "files/28_1159_example.mp3",
        textExample: "The little dog weighed exactly 3 kilograms",
        textExampleTranslate: "Маленькая собачка весила ровно 3 килограмма",
        id: 1159,
        word: "weigh",
        wordTranslate: "весят"
      },
      {
        audioExample: "files/29_1161_example.mp3",
        textExample: "The idea of beauty is abstract and changes over time",
        textExampleTranslate: "Идея красоты абстрактна и меняется со временем",
        id: 1161,
        word: "abstract",
        wordTranslate: "аннотация"
      },
      {
        audioExample: "files/29_1163_example.mp3",
        textExample: "She made a bowl out of the clay",
        textExampleTranslate: "Она сделала миску из глины",
        id: 1163,
        word: "clay",
        wordTranslate: "глина"
      }
    ]
  },
  {
    "levelData": {
      id: "2_40",
      name: "Dolmen on Brandsø",
      imageSrc: "level2/2_40.jpg",
      cutSrc: "level2/cut/2_40.jpg",
      author: "DREYER, Dankvart",
      year: "1842"
    },
    words: [
      {
        audioExample: "files/29_1165_example.mp3",
        textExample: "She opened the curtains to let light into the room",
        textExampleTranslate: "Она открыла шторы, чтобы пропустить свет в комнату",
        id: 1165,
        word: "curtain",
        wordTranslate: "занавес"
      },
      {
        audioExample: "files/29_1166_example.mp3",
        textExample: "The dog deserved a bone for behaving very well",
        textExampleTranslate: "Собака заслуживает кости за хорошее поведение",
        id: 1166,
        word: "deserve",
        wordTranslate: "заслуживают"
      },
      {
        audioExample: "files/29_1167_example.mp3",
        textExample: "That bird has orange feathers on its chest",
        textExampleTranslate: "У этой птицы оранжевые перья на груди",
        id: 1167,
        word: "feather",
        wordTranslate: "перо"
      },
      {
        audioExample: "files/29_1168_example.mp3",
        textExample: "The farmer grew many vegetables in the fertile soil",
        textExampleTranslate: "Фермер выращивал много овощей на плодородной почве",
        id: 1168,
        word: "fertile",
        wordTranslate: "плодородный"
      },
      {
        audioExample: "files/29_1171_example.mp3",
        textExample: "We visit our grandfather’s grave each year",
        textExampleTranslate: "Мы посещаем могилу нашего деда каждый год",
        id: 1171,
        word: "grave",
        wordTranslate: "могила"
      },
      {
        audioExample: "files/29_1173_example.mp3",
        textExample: "Because of his high intelligence, he finished school early",
        textExampleTranslate: "Из-за его высокого интеллекта он закончил школу рано",
        id: 1173,
        word: "intelligence",
        wordTranslate: "интеллект"
      },
      {
        audioExample: "files/29_1174_example.mp3",
        textExample: "After I passed the test, I obtained my driver’s license",
        textExampleTranslate: "После прохождения теста я получил водительские права",
        id: 1174,
        word: "obtain",
        wordTranslate: "получить"
      },
      {
        audioExample: "files/29_1175_example.mp3",
        textExample: "The holy man spoke about religious topics",
        textExampleTranslate: "Святой говорил о религиозных темах",
        id: 1175,
        word: "religious",
        wordTranslate: "религиозный"
      },
      {
        audioExample: "files/29_1176_example.mp3",
        textExample: "The young couple went to see a romantic movie",
        textExampleTranslate: "Молодая пара пошла посмотреть романтический фильм",
        id: 1176,
        word: "romantic",
        wordTranslate: "романтик"
      },
      {
        audioExample: "files/29_1177_example.mp3",
        textExample: "There were many pretty shells on the beach",
        textExampleTranslate: "На пляже было много красивых раковин",
        id: 1177,
        word: "shell",
        wordTranslate: "ракушка"
      }
    ]
  },
  {
    "levelData": {
      id: "2_41",
      name: "Village Scene",
      imageSrc: "level2/2_41.jpg",
      cutSrc: "level2/cut/2_41.jpg",
      author: "DROOCHSLOOT, Joost Cornelisz.",
      year: "1623"
    },
    words: [
      {
        audioExample: "files/29_1178_example.mp3",
        textExample: "All of the boats were floating near the shore",
        textExampleTranslate: "Все лодки плавали у берега",
        id: 1178,
        word: "shore",
        wordTranslate: "берег"
      },
      {
        audioExample: "files/29_1179_example.mp3",
        textExample: "A car has four wheels",
        textExampleTranslate: "У машины четыре колеса",
        id: 1179,
        word: "wheel",
        wordTranslate: "рулевое колесо"
      },
      {
        audioExample: "files/29_1180_example.mp3",
        textExample: "My mother gave me a wooden spoon",
        textExampleTranslate: "Моя мама дала мне деревянную ложку",
        id: 1180,
        word: "wooden",
        wordTranslate: "деревянный"
      },
      {
        audioExample: "files/30_1181_example.mp3",
        textExample: "Many homes have appliances like ovens, toasters, and refrigerators",
        textExampleTranslate: "Во многих домах есть такие приборы, как духовки, тостеры и холодильники",
        id: 1181,
        word: "appliance",
        wordTranslate: "устройство"
      },
      {
        audioExample: "files/30_1182_example.mp3",
        textExample: "She filled the basin with water and washed her face",
        textExampleTranslate: "Она наполнила таз водой и вымыла лицо",
        id: 1182,
        word: "basin",
        wordTranslate: "таз"
      },
      {
        audioExample: "files/30_1184_example.mp3",
        textExample: "After eating a lot of leaves, caterpillars change into butterflies",
        textExampleTranslate: "Съев много листьев, гусеницы превращаются в бабочек",
        id: 1184,
        word: "caterpillar",
        wordTranslate: "гусеница"
      },
      {
        audioExample: "files/30_1186_example.mp3",
        textExample: "You should hold the baby carefully because she’s very delicate",
        textExampleTranslate: "Вы должны бережно держать ребенка, потому что она очень нежная",
        id: 1186,
        word: "delicate",
        wordTranslate: "тонкий"
      },
      {
        audioExample: "files/30_1187_example.mp3",
        textExample: "A groundhog emerged from a snow covered hole",
        textExampleTranslate: "Сурок появился из заснеженной ямы",
        id: 1187,
        word: "emerge",
        wordTranslate: "всплывать"
      },
      {
        audioExample: "files/30_1189_example.mp3",
        textExample: "They made a big hole in the wall",
        textExampleTranslate: "Они сделали большую дыру в стене",
        id: 1189,
        word: "hole",
        wordTranslate: "отверстие"
      },
      {
        audioExample: "files/30_1190_example.mp3",
        textExample: "The fish went after the sharp hook",
        textExampleTranslate: "Рыба пошла за острым крючком",
        id: 1190,
        word: "hook",
        wordTranslate: "крюк"
      }
    ]
  },
  {
    "levelData": {
      id: "3_01",
      name: "Return from the Falcon Hunt",
      imageSrc: "level3/3_01.jpg",
      cutSrc: "level3/cut/3_01.jpg",
      author: "BERCHEM, Nicolaes",
      year: "1650"
    },
    words: [
      {
        audioExample: "files/01_1201_example.mp3",
        textExample: "They lived on a 150-acre farm",
        textExampleTranslate: "Они жили на 150-акровой ферме",
        id: 1201,
        word: "acre",
        wordTranslate: "акр"
      },
      {
        audioExample: "files/01_1202_example.mp3",
        textExample: "I believe that there is an afterlife",
        textExampleTranslate: "Я считаю, что есть загробная жизнь",
        id: 1202,
        word: "afterlife",
        wordTranslate: "жизнь после смерти"
      },
      {
        audioExample: "files/01_1204_example.mp3",
        textExample: "The meeting was held in the faculty chamber",
        textExampleTranslate: "Встреча прошла в факультетской палате",
        id: 1204,
        word: "chamber",
        wordTranslate: "камера"
      },
      {
        audioExample: "files/01_1205_example.mp3",
        textExample: "The river cut a channel through the rocks",
        textExampleTranslate: "Река пробила канал сквозь скалы",
        id: 1205,
        word: "channel",
        wordTranslate: "канал"
      },
      {
        audioExample: "files/01_1206_example.mp3",
        textExample: "Earth has a solid inner core",
        textExampleTranslate: "Земля имеет твердое внутреннее ядро",
        id: 1206,
        word: "core",
        wordTranslate: "ядро"
      },
      {
        audioExample: "files/01_1208_example.mp3",
        textExample: "He has a distinct accent",
        textExampleTranslate: "У него отчетливый акцент",
        id: 1208,
        word: "distinct",
        wordTranslate: "отличный"
      },
      {
        audioExample: "files/01_1209_example.mp3",
        textExample: "Only an elite group was allowed membership into the club",
        textExampleTranslate: "Только элитная группа была допущена к членству в клубе",
        id: 1209,
        word: "elite",
        wordTranslate: "элита"
      },
      {
        audioExample: "files/01_1211_example.mp3",
        textExample: "My grandfather founded the City Bank",
        textExampleTranslate: "Мой дед основал городской банк",
        id: 1211,
        word: "found",
        wordTranslate: "нашел"
      },
      {
        audioExample: "files/01_1212_example.mp3",
        textExample: "There is a small gap between the blocks of wood",
        textExampleTranslate: "Между блоками дерева есть небольшой зазор",
        id: 1212,
        word: "gap",
        wordTranslate: "пробел"
      },
      {
        audioExample: "files/01_1213_example.mp3",
        textExample: "They enjoyed the glory of the beautiful sunset",
        textExampleTranslate: "Они наслаждались славой прекрасного заката",
        id: 1213,
        word: "glory",
        wordTranslate: "слава"
      }
    ]
  },
  {
    "levelData": {
      id: "3_02",
      name: "Rocky Landscape with Antique Ruins",
      imageSrc: "level3/3_02.jpg",
      cutSrc: "level3/cut/3_02.jpg",
      author: "BERCHEM, Nicolaes",
      year: "1657"
    },
    words: [
      {
        audioExample: "files/01_1214_example.mp3",
        textExample: "They looked at the interior of the box",
        textExampleTranslate: "Они посмотрели на внутреннюю часть коробки",
        id: 1214,
        word: "interior",
        wordTranslate: "интерьер"
      },
      {
        audioExample: "files/01_1215_example.mp3",
        textExample: "We went to see the lion at the zoo",
        textExampleTranslate: "Мы пошли, чтобы увидеть льва в зоопарке",
        id: 1215,
        word: "lion",
        wordTranslate: "лев"
      },
      {
        audioExample: "files/01_1217_example.mp3",
        textExample: "The Duchess was part of the royal family",
        textExampleTranslate: "Герцогиня была частью королевской семьи",
        id: 1217,
        word: "royal",
        wordTranslate: "королевский"
      },
      {
        audioExample: "files/01_1218_example.mp3",
        textExample: "She was the sole woman in the room",
        textExampleTranslate: "Она была единственной женщиной в комнате",
        id: 1218,
        word: "sole",
        wordTranslate: "подошва"
      },
      {
        audioExample: "files/01_1219_example.mp3",
        textExample: "He took the stairs instead of the elevator",
        textExampleTranslate: "Он поднялся по лестнице вместо лифта",
        id: 1219,
        word: "stairs",
        wordTranslate: "лестница"
      },
      {
        audioExample: "files/01_1220_example.mp3",
        textExample: "She wiped the surface of the table",
        textExampleTranslate: "Она вытерла поверхность стола",
        id: 1220,
        word: "surface",
        wordTranslate: "поверхность"
      },
      {
        audioExample: "files/02_1221_example.mp3",
        textExample: "I think you’ll get Tom’s agreement to this proposal",
        textExampleTranslate: "Я думаю, что вы получите согласие Тома на это предложение",
        id: 1221,
        word: "agreement",
        wordTranslate: "соглашение"
      },
      {
        audioExample: "files/02_1222_example.mp3",
        textExample: "Difficulties arose with his computer because it was old",
        textExampleTranslate: "Трудности возникли с его компьютером, потому что он был старым",
        id: 1222,
        word: "arise",
        wordTranslate: "возникают"
      },
      {
        audioExample: "files/02_1227_example.mp3",
        textExample: "I encountered a sea turtle while I was swimming",
        textExampleTranslate: "Я столкнулся с морской черепахой во время плавания",
        id: 1227,
        word: "encounter",
        wordTranslate: "встреча"
      },
      {
        audioExample: "files/02_1229_example.mp3",
        textExample: "Stacy and Heather forged their friendship when they were teenagers",
        textExampleTranslate: "Стейси и Хизер подружились, когда были подростками",
        id: 1229,
        word: "forge",
        wordTranslate: "кузница"
      }
    ]
  },
  {
    "levelData": {
      id: "3_03",
      name: "The Banks of the Manzanares River",
      imageSrc: "level3/3_03.jpg",
      cutSrc: "level3/cut/3_03.jpg",
      author: "BERUETE, Aureliano",
      year: "1878"
    },
    words: [
      {
        audioExample: "files/02_1231_example.mp3",
        textExample: "The horse had shoes made of iron",
        textExampleTranslate: "У лошади были туфли из железа",
        id: 1231,
        word: "iron",
        wordTranslate: "утюг"
      },
      {
        audioExample: "files/02_1233_example.mp3",
        textExample: "Derek is very modest for someone who is so rich",
        textExampleTranslate: "Дерек очень скромен для такого богатого человека",
        id: 1233,
        word: "modest",
        wordTranslate: "скромные"
      },
      {
        audioExample: "files/02_1235_example.mp3",
        textExample: "US President Abraham Lincoln is on the penny",
        textExampleTranslate: "Президент США Авраам Линкольн на пенни",
        id: 1235,
        word: "penny",
        wordTranslate: "копейка"
      },
      {
        audioExample: "files/02_1236_example.mp3",
        textExample: "Aaron often preached about living an honest life",
        textExampleTranslate: "Аарон часто проповедовал о честной жизни",
        id: 1236,
        word: "preach",
        wordTranslate: "проповедовать"
      },
      {
        audioExample: "files/02_1238_example.mp3",
        textExample: "Canada is divided into several different provinces",
        textExampleTranslate: "Канада разделена на несколько разных провинций",
        id: 1238,
        word: "province",
        wordTranslate: "провинция"
      },
      {
        audioExample: "files/03_1241_example.mp3",
        textExample: "Tina acquired a strange package yesterday",
        textExampleTranslate: "Тина вчера приобрела странную посылку",
        id: 1241,
        word: "acquire",
        wordTranslate: "приобретать"
      },
      {
        audioExample: "files/03_1242_example.mp3",
        textExample: "After dropping his coffee cup, Robbie felt awkward",
        textExampleTranslate: "Уронив чашку с кофе, Робби почувствовал себя неловко",
        id: 1242,
        word: "awkward",
        wordTranslate: "неловко"
      },
      {
        audioExample: "files/03_1243_example.mp3",
        textExample: "My grandmother’s caretaker helps her get around the house",
        textExampleTranslate: "Смотритель моей бабушки помогает ей передвигаться по дому",
        id: 1243,
        word: "caretaker",
        wordTranslate: "сторож"
      },
      {
        audioExample: "files/03_1244_example.mp3",
        textExample: "He tried to deceive his friends with a card trick",
        textExampleTranslate: "Он пытался обмануть своих друзей карточным фокусом",
        id: 1244,
        word: "deceive",
        wordTranslate: "обмануть"
      },
      {
        audioExample: "files/03_1245_example.mp3",
        textExample: "Mr. Perry discouraged the students from quitting school",
        textExampleTranslate: "Мистер Перри отговорил учеников бросить школу",
        id: 1245,
        word: "discourage",
        wordTranslate: "отбить"
      }
    ]
  },
  {
    "levelData": {
      id: "3_04",
      name: "The Augustan Bridge",
      imageSrc: "level3/3_04.jpg",
      cutSrc: "level3/cut/3_04.jpg",
      author: "BIDAULD, Jean-Joseph-Xavier",
      year: "1790"
    },
    words: [
      {
        audioExample: "files/03_1246_example.mp3",
        textExample: "The model was wearing fake hair",
        textExampleTranslate: "Модель носила поддельные волосы",
        id: 1246,
        word: "fake",
        wordTranslate: "не настоящие"
      },
      {
        audioExample: "files/03_1247_example.mp3",
        textExample: "I have a hatred for the taste of medicine",
        textExampleTranslate: "У меня есть ненависть к вкусу лекарства",
        id: 1247,
        word: "hatred",
        wordTranslate: "ненависть"
      },
      {
        audioExample: "files/03_1248_example.mp3",
        textExample: "We all went into the hut to sleep",
        textExampleTranslate: "Мы все пошли в хижину спать",
        id: 1248,
        word: "hut",
        wordTranslate: "хижина"
      },
      {
        audioExample: "files/03_1250_example.mp3",
        textExample: "During our ski trip, we stayed at a lodge",
        textExampleTranslate: "Во время нашей лыжной поездки мы остановились в лодже",
        id: 1250,
        word: "lodge",
        wordTranslate: "поселить"
      },
      {
        audioExample: "files/03_1251_example.mp3",
        textExample: "William neglected his room, so it is a complete mess",
        textExampleTranslate: "Уильям забросил свою комнату, так что это полный беспорядок",
        id: 1251,
        word: "neglect",
        wordTranslate: "халатное отношение"
      },
      {
        audioExample: "files/03_1252_example.mp3",
        textExample: "The students happily welcomed the newcomer to the school",
        textExampleTranslate: "Студенты с радостью приветствовали новичка в школе",
        id: 1252,
        word: "newcomer",
        wordTranslate: "новичок"
      },
      {
        audioExample: "files/03_1253_example.mp3",
        textExample: "Stealing a car is a very serious offense",
        textExampleTranslate: "Кража автомобиля - очень серьезное преступление",
        id: 1253,
        word: "offense",
        wordTranslate: "преступление"
      },
      {
        audioExample: "files/03_1254_example.mp3",
        textExample: "Brenda overlooked the last step and had a bad fall",
        textExampleTranslate: "Бренда упустила последний шаг и потерпела неудачу",
        id: 1254,
        word: "overlook",
        wordTranslate: "не заметить"
      },
      {
        audioExample: "files/03_1256_example.mp3",
        textExample: "Steve looked ridiculous with those huge blue sunglasses",
        textExampleTranslate: "Стив выглядел смешно с этими огромными синими солнцезащитными очками",
        id: 1256,
        word: "ridiculous",
        wordTranslate: "смешной"
      },
      {
        audioExample: "files/03_1257_example.mp3",
        textExample: "Mina often received satisfactory grades since she studied so hard",
        textExampleTranslate: "Мина часто получала удовлетворительные оценки, так как она так усердно училась",
        id: 1257,
        word: "satisfactory",
        wordTranslate: "удовлетворительно"
      }
    ]
  },
  {
    "levelData": {
      id: "3_05",
      name: "Landscape with Sarcophagus",
      imageSrc: "level3/3_05.jpg",
      cutSrc: "level3/cut/3_05.jpg",
      author: "BLANCHET, Thomas",
      year: "1650-1652"
    },
    words: [
      {
        audioExample: "files/03_1258_example.mp3",
        textExample: "The shepherd moved the sheep to another field",
        textExampleTranslate: "Пастух перенес овец в другое поле",
        id: 1258,
        word: "shepherd",
        wordTranslate: "пасти"
      },
      {
        audioExample: "files/03_1259_example.mp3",
        textExample: "Even though it was dangerous, they ventured up the mountain",
        textExampleTranslate: "Хотя это было опасно, они рискнули подняться на гору",
        id: 1259,
        word: "venture",
        wordTranslate: "предприятие"
      },
      {
        audioExample: "files/03_1260_example.mp3",
        textExample: "The field of golden wheat was ready to be harvested",
        textExampleTranslate: "Поле золотой пшеницы было готово к уборке",
        id: 1260,
        word: "wheat",
        wordTranslate: "пшеница"
      },
      {
        audioExample: "files/04_1261_example.mp3",
        textExample: "The alley behind my house looks dirty",
        textExampleTranslate: "Аллея позади моего дома выглядит грязной",
        id: 1261,
        word: "alley",
        wordTranslate: "аллея"
      },
      {
        audioExample: "files/04_1265_example.mp3",
        textExample: "Eric did a decent job painting the fence",
        textExampleTranslate: "Эрик проделал достойную работу, покрасив забор",
        id: 1265,
        word: "decent",
        wordTranslate: "приличный"
      },
      {
        audioExample: "files/04_1266_example.mp3",
        textExample: "This is a disgraceful waste of money",
        textExampleTranslate: "Это позорная трата денег",
        id: 1266,
        word: "disgraceful",
        wordTranslate: "позорно"
      },
      {
        audioExample: "files/04_1273_example.mp3",
        textExample: "The campers stayed in the tent overnight",
        textExampleTranslate: "Отдыхающие остались в палатке на ночь",
        id: 1273,
        word: "overnight",
        wordTranslate: "с ночевкой"
      },
      {
        audioExample: "files/04_1275_example.mp3",
        textExample: "There were many beautiful pine trees in the forest",
        textExampleTranslate: "В лесу было много прекрасных сосен",
        id: 1275,
        word: "pine",
        wordTranslate: "сосна"
      },
      {
        audioExample: "files/04_1276_example.mp3",
        textExample: "The man had horrible scars on his cheek and forehead",
        textExampleTranslate: "У человека были ужасные шрамы на щеке и лбу",
        id: 1276,
        word: "scar",
        wordTranslate: "шрам"
      },
      {
        audioExample: "files/04_1279_example.mp3",
        textExample: "Jake teased Charlie because he was the new student",
        textExampleTranslate: "Джейк дразнил Чарли, потому что он был новым учеником",
        id: 1279,
        word: "tease",
        wordTranslate: "дразнить"
      }
    ]
  },
  {
    "levelData": {
      id: "3_06",
      name: "Building the Devil's Bridge",
      imageSrc: "level3/3_06.jpg",
      cutSrc: "level3/cut/3_06.jpg",
      author: "BLECHEN, Karl",
      year: "1833"
    },
    words: [
      {
        audioExample: "files/04_1280_example.mp3",
        textExample: "Harry wanted Molly to be his valentine",
        textExampleTranslate: "Гарри хотел, чтобы Молли была его валентинкой",
        id: 1280,
        word: "valentine",
        wordTranslate: "валентин"
      },
      {
        audioExample: "files/05_1281_example.mp3",
        textExample: "Nancy acquainted herself with the new computer",
        textExampleTranslate: "Нэнси познакомилась с новым компьютером",
        id: 1281,
        word: "acquaint",
        wordTranslate: "знакомят"
      },
      {
        audioExample: "files/05_1282_example.mp3",
        textExample: "Some people are scared of cemeteries",
        textExampleTranslate: "Некоторые люди боятся кладбищ",
        id: 1282,
        word: "cemetery",
        wordTranslate: "кладбище"
      },
      {
        audioExample: "files/05_1283_example.mp3",
        textExample: "Those creatures live in Africa",
        textExampleTranslate: "Эти существа живут в Африке",
        id: 1283,
        word: "creature",
        wordTranslate: "существо"
      },
      {
        audioExample: "files/05_1284_example.mp3",
        textExample: "The witch cursed the village",
        textExampleTranslate: "Ведьма прокляла деревню",
        id: 1284,
        word: "curse",
        wordTranslate: "проклясть"
      },
      {
        audioExample: "files/05_1285_example.mp3",
        textExample: "Everyone knew that it was Dad in the Santa disguise",
        textExampleTranslate: "Все знали, что это был папа в маске Санты",
        id: 1285,
        word: "disguise",
        wordTranslate: "маскировка"
      },
      {
        audioExample: "files/05_1286_example.mp3",
        textExample: "Their table was all set for a fancy dinner",
        textExampleTranslate: "Их стол был накрыт для шикарного ужина",
        id: 1286,
        word: "fancy",
        wordTranslate: "фантазия"
      },
      {
        audioExample: "files/05_1287_example.mp3",
        textExample: "We took a flashlight when we went camping",
        textExampleTranslate: "Мы взяли фонарик, когда пошли в поход",
        id: 1287,
        word: "flashlight",
        wordTranslate: "фонарик"
      },
      {
        audioExample: "files/05_1288_example.mp3",
        textExample: "She put on her hood to keep her head warm",
        textExampleTranslate: "Она надела свой капюшон, чтобы держать голову в тепле",
        id: 1288,
        word: "hood",
        wordTranslate: "капот"
      },
      {
        audioExample: "files/05_1289_example.mp3",
        textExample: "The number of inhabitants in the countryside is increasing",
        textExampleTranslate: "Число жителей в сельской местности увеличивается",
        id: 1289,
        word: "inhabitant",
        wordTranslate: "житель"
      }
    ]
  },
  {
    "levelData": {
      id: "3_07",
      name: "Stag Hunting in the Dunes",
      imageSrc: "level3/3_07.jpg",
      cutSrc: "level3/cut/3_07.jpg",
      author: "BLEKER, Gerrit Claesz",
      year: "1625-1629"
    },
    words: [
      {
        audioExample: "files/05_1290_example.mp3",
        textExample: "A good mother will nourish her baby every day",
        textExampleTranslate: "Хорошая мама будет кормить ребенка каждый день",
        id: 1290,
        word: "nourish",
        wordTranslate: "лелеять"
      },
      {
        audioExample: "files/05_1291_example.mp3",
        textExample: "Pirates are very scary characters",
        textExampleTranslate: "Пираты очень страшные персонажи",
        id: 1291,
        word: "pirate",
        wordTranslate: "пират"
      },
      {
        audioExample: "files/05_1294_example.mp3",
        textExample: "The old log began to rot in the forest",
        textExampleTranslate: "Старое бревно начало гнить в лесу",
        id: 1294,
        word: "rot",
        wordTranslate: "гниль"
      },
      {
        audioExample: "files/05_1295_example.mp3",
        textExample: "My workday will end shortly",
        textExampleTranslate: "Мой рабочий день скоро закончится",
        id: 1295,
        word: "shortly",
        wordTranslate: "в ближайшее время"
      },
      {
        audioExample: "files/05_1296_example.mp3",
        textExample: "There is a skeleton in the science classroom",
        textExampleTranslate: "В научном классе есть скелет",
        id: 1296,
        word: "skeleton",
        wordTranslate: "скелет"
      },
      {
        audioExample: "files/05_1297_example.mp3",
        textExample: "We left the fruit out too long, and it spoiled",
        textExampleTranslate: "Мы оставили фрукты слишком долго, и они испортились",
        id: 1297,
        word: "spoil",
        wordTranslate: "портятся"
      },
      {
        audioExample: "files/05_1298_example.mp3",
        textExample: "During the war, many people starved",
        textExampleTranslate: "Во время войны многие люди голодали",
        id: 1298,
        word: "starve",
        wordTranslate: "голодать"
      },
      {
        audioExample: "files/05_1299_example.mp3",
        textExample: "The surfer enjoys the thrill of surfing a big wave",
        textExampleTranslate: "Серфер наслаждается ощущением от серфинга на большой волне",
        id: 1299,
        word: "thrill",
        wordTranslate: "кайф"
      },
      {
        audioExample: "files/05_1300_example.mp3",
        textExample: "My boss is a very wicked man",
        textExampleTranslate: "Мой босс очень злой человек",
        id: 1300,
        word: "wicked",
        wordTranslate: "злой"
      },
      {
        audioExample: "files/06_1301_example.mp3",
        textExample: "The fire alarm alerted us that there was a problem",
        textExampleTranslate: "Пожарная тревога предупредила нас, что возникла проблема",
        id: 1301,
        word: "alert",
        wordTranslate: "тревога"
      }
    ]
  },
  {
    "levelData": {
      id: "3_08",
      name: "Landscape with the Prophet Elijah in the Desert",
      imageSrc: "level3/3_08.jpg",
      cutSrc: "level3/cut/3_08.jpg",
      author: "BLOEMAERT, Abraham",
      year: "1610"
    },
    words: [
      {
        audioExample: "files/06_1302_example.mp3",
        textExample: "We watched the broadcast of the local news on TV",
        textExampleTranslate: "Мы смотрели трансляцию местных новостей по телевизору",
        id: 1302,
        word: "broadcast",
        wordTranslate: "вещание"
      },
      {
        audioExample: "files/06_1305_example.mp3",
        textExample: "Mom chopped some vegetables to put into the stew",
        textExampleTranslate: "Мама нарезала овощи, чтобы положить в рагу",
        id: 1305,
        word: "chop",
        wordTranslate: "рубить"
      },
      {
        audioExample: "files/06_1306_example.mp3",
        textExample: "Marie has many clothes inside of her closet",
        textExampleTranslate: "У Мари много одежды в шкафу",
        id: 1306,
        word: "closet",
        wordTranslate: "стенной шкаф"
      },
      {
        audioExample: "files/06_1307_example.mp3",
        textExample: "When my dog ran away, my dad consoled me",
        textExampleTranslate: "Когда моя собака убежала, папа утешил меня",
        id: 1307,
        word: "console",
        wordTranslate: "приставка"
      },
      {
        audioExample: "files/06_1308_example.mp3",
        textExample: "I live in a residential district of Seattle, Washington",
        textExampleTranslate: "Я живу в жилом районе Сиэтла, штат Вашингтон",
        id: 1308,
        word: "district",
        wordTranslate: "район"
      },
      {
        audioExample: "files/06_1309_example.mp3",
        textExample: "I put my clothes into the empty drawers",
        textExampleTranslate: "Я положил свою одежду в пустые ящики",
        id: 1309,
        word: "drawer",
        wordTranslate: "выдвижной ящик"
      },
      {
        audioExample: "files/06_1310_example.mp3",
        textExample: "She had to endure her husband shouting all day long",
        textExampleTranslate: "Она должна была терпеть, что ее муж весь день кричал",
        id: 1310,
        word: "endure",
        wordTranslate: "терпеть"
      },
      {
        audioExample: "files/06_1311_example.mp3",
        textExample: "Some people are executed for serious crimes",
        textExampleTranslate: "Некоторые люди казнены за серьезные преступления",
        id: 1311,
        word: "execute",
        wordTranslate: "выполнить"
      },
      {
        audioExample: "files/06_1312_example.mp3",
        textExample: "He grasped the bag of money tightly",
        textExampleTranslate: "Он крепко схватил мешок с деньгами",
        id: 1312,
        word: "grasp",
        wordTranslate: "ухватить"
      },
      {
        audioExample: "files/06_1313_example.mp3",
        textExample: "The man loaded the rear of his truck with boxes",
        textExampleTranslate: "Человек загрузил заднюю часть своего грузовика ящиками",
        id: 1313,
        word: "rear",
        wordTranslate: "задний"
      }
    ]
  },
  {
    "levelData": {
      id: "3_09",
      name: "River Landscape with a Town and Fortified Tower",
      imageSrc: "level3/3_09.jpg",
      cutSrc: "level3/cut/3_09.jpg",
      author: "GOYEN, Jan van",
      year: "1633"
    },
    words: [
      {
        audioExample: "files/06_1315_example.mp3",
        textExample: "The brain is protected by the skull",
        textExampleTranslate: "Мозг защищен черепом",
        id: 1315,
        word: "skull",
        wordTranslate: "череп"
      },
      {
        audioExample: "files/06_1316_example.mp3",
        textExample: "Mom stirred the batter until it was smooth",
        textExampleTranslate: "Мама размешивала тесто, пока оно не стало гладким",
        id: 1316,
        word: "stir",
        wordTranslate: "размешать"
      },
      {
        audioExample: "files/06_1319_example.mp3",
        textExample: "The roots of a tree are located underneath the ground",
        textExampleTranslate: "Корни дерева расположены под землей",
        id: 1319,
        word: "underneath",
        wordTranslate: "под"
      },
      {
        audioExample: "files/06_1320_example.mp3",
        textExample: "Worms are often used to help catch fish",
        textExampleTranslate: "Черви часто используются для ловли рыбы",
        id: 1320,
        word: "worm",
        wordTranslate: "червь"
      },
      {
        audioExample: "files/07_1321_example.mp3",
        textExample: "The old room had been abandoned years before",
        textExampleTranslate: "Старая комната была заброшена много лет назад",
        id: 1321,
        word: "abandon",
        wordTranslate: "отказаться"
      },
      {
        audioExample: "files/07_1322_example.mp3",
        textExample: "Kendra had to be ambitious to get into medical school",
        textExampleTranslate: "Кендре нужно было амбициозно поступить в медицинскую школу",
        id: 1322,
        word: "ambitious",
        wordTranslate: "честолюбивый"
      },
      {
        audioExample: "files/07_1323_example.mp3",
        textExample: "The dog barked loudly and frighteningly",
        textExampleTranslate: "Пес лаял громко и пугающе",
        id: 1323,
        word: "bark",
        wordTranslate: "лай"
      },
      {
        audioExample: "files/07_1324_example.mp3",
        textExample: "The Golden Gate Bridge crosses San Francisco Bay",
        textExampleTranslate: "Мост Золотые Ворота пересекает залив Сан-Франциско",
        id: 1324,
        word: "bay",
        wordTranslate: "залив"
      },
      {
        audioExample: "files/07_1325_example.mp3",
        textExample: "My younger sister is brilliant for someone her age",
        textExampleTranslate: "Моя младшая сестра великолепна для своего возраста",
        id: 1325,
        word: "brilliant",
        wordTranslate: "блестящий"
      },
      {
        audioExample: "files/07_1326_example.mp3",
        textExample: "Luke pointed to the hair on his chin",
        textExampleTranslate: "Люк указал на волосы на подбородке",
        id: 1326,
        word: "chin",
        wordTranslate: "подбородок"
      }
    ]
  },
  {
    "levelData": {
      id: "3_10",
      name: "The Champion Single Sculls (Max Schmitt in a Single Scull)",
      imageSrc: "level3/3_10.jpg",
      cutSrc: "level3/cut/3_10.jpg",
      author: "EAKINS, Thomas",
      year: "1871"
    },
    words: [
      {
        audioExample: "files/07_1327_example.mp3",
        textExample: "Mom said she didn’t want to hear my brother’s complaints",
        textExampleTranslate: "Мама сказала, что не хочет слышать жалобы моего брата",
        id: 1327,
        word: "complaint",
        wordTranslate: "жалоба"
      },
      {
        audioExample: "files/07_1328_example.mp3",
        textExample: "Susan uses sign language because she is deaf",
        textExampleTranslate: "Сьюзен использует язык жестов, потому что она глухая",
        id: 1328,
        word: "deaf",
        wordTranslate: "глухой"
      },
      {
        audioExample: "files/07_1329_example.mp3",
        textExample: "The man was enthusiastic about his job",
        textExampleTranslate: "Человек был в восторге от своей работы",
        id: 1329,
        word: "enthusiastic",
        wordTranslate: "энтузиазм"
      },
      {
        audioExample: "files/07_1330_example.mp3",
        textExample: "They got into their spaceship to begin their expedition",
        textExampleTranslate: "Они сели в свой космический корабль, чтобы начать свою экспедицию",
        id: 1330,
        word: "expedition",
        wordTranslate: "экспедиция"
      },
      {
        audioExample: "files/07_1331_example.mp3",
        textExample: "The sun dipped below the horizon",
        textExampleTranslate: "Солнце опустилось за горизонт",
        id: 1331,
        word: "horizon",
        wordTranslate: "горизонт"
      },
      {
        audioExample: "files/07_1332_example.mp3",
        textExample: "The three friends are very loyal to each other",
        textExampleTranslate: "Трое друзей очень преданы друг другу",
        id: 1332,
        word: "loyal",
        wordTranslate: "верный"
      },
      {
        audioExample: "files/07_1333_example.mp3",
        textExample: "The mayor of my hometown is quite a powerful speaker",
        textExampleTranslate: "Мэр моего родного города довольно мощный оратор",
        id: 1333,
        word: "mayor",
        wordTranslate: "мэр"
      },
      {
        audioExample: "files/07_1335_example.mp3",
        textExample: "Lisa eats too much, so now she’s overweight",
        textExampleTranslate: "Лиза ест слишком много, так что теперь она весит больше нормы",
        id: 1335,
        word: "overweight",
        wordTranslate: "избыточный вес"
      },
      {
        audioExample: "files/07_1337_example.mp3",
        textExample: "Victor restored the old car",
        textExampleTranslate: "Виктор восстановил старую машину",
        id: 1337,
        word: "restore",
        wordTranslate: "восстановить"
      },
      {
        audioExample: "files/07_1338_example.mp3",
        textExample: "Mom’s feet were sore, so she rubbed them",
        textExampleTranslate: "У мамы болели ноги, поэтому она потерла их",
        id: 1338,
        word: "rub",
        wordTranslate: "тереть"
      }
    ]
  },
  {
    "levelData": {
      id: "3_11",
      name: "A Frigate, Calm Seas",
      imageSrc: "level3/3_11.jpg",
      cutSrc: "level3/cut/3_11.jpg",
      author: "ECKARDT, Christian Frederik Emil",
      year: "1867"
    },
    words: [
      {
        audioExample: "files/07_1339_example.mp3",
        textExample: "It would be hard to live without your five senses",
        textExampleTranslate: "Было бы трудно жить без твоих пяти чувств",
        id: 1339,
        word: "senses",
        wordTranslate: "чувство"
      },
      {
        audioExample: "files/07_1340_example.mp3",
        textExample: "Wanda became a veterinarian because she loves dogs",
        textExampleTranslate: "Ванда стала ветеринаром, потому что она любит собак",
        id: 1340,
        word: "veterinarian",
        wordTranslate: "ветеринар"
      },
      {
        audioExample: "files/08_1342_example.mp3",
        textExample: "I like to study arithmetic at school",
        textExampleTranslate: "Мне нравится изучать арифметику в школе",
        id: 1342,
        word: "arithmetic",
        wordTranslate: "арифметика"
      },
      {
        audioExample: "files/08_1343_example.mp3",
        textExample: "He was ashamed when he forgot his teacher’s name",
        textExampleTranslate: "Ему было стыдно, когда он забыл имя своего учителя",
        id: 1343,
        word: "ashamed",
        wordTranslate: "стыдно"
      },
      {
        audioExample: "files/08_1344_example.mp3",
        textExample: "The bomb burst over the city",
        textExampleTranslate: "Взрыв бомбы над городом",
        id: 1344,
        word: "burst",
        wordTranslate: "взрыв"
      },
      {
        audioExample: "files/08_1345_example.mp3",
        textExample: "We hired a carpenter to make a cupboard",
        textExampleTranslate: "Мы наняли плотника, чтобы сделать шкаф",
        id: 1345,
        word: "carpenter",
        wordTranslate: "плотник"
      },
      {
        audioExample: "files/08_1346_example.mp3",
        textExample: "Many power stations burn coal to produce energy",
        textExampleTranslate: "Многие электростанции сжигают уголь для производства энергии",
        id: 1346,
        word: "coal",
        wordTranslate: "уголь"
      },
      {
        audioExample: "files/08_1347_example.mp3",
        textExample: "Kim and Martin’s new couch was very expensive",
        textExampleTranslate: "Новый диван Ким и Мартина был очень дорогим",
        id: 1347,
        word: "couch",
        wordTranslate: "диван"
      },
      {
        audioExample: "files/08_1348_example.mp3",
        textExample: "I heard water dripping from the faucet",
        textExampleTranslate: "Я слышал, как вода капала из крана",
        id: 1348,
        word: "drip",
        wordTranslate: "капать"
      },
      {
        audioExample: "files/08_1349_example.mp3",
        textExample: "In Japan, women wear elegant kimonos on special occasions",
        textExampleTranslate: "В Японии женщины носят элегантные кимоно в особых случаях",
        id: 1349,
        word: "elegant",
        wordTranslate: "элегантный"
      }
    ]
  },
  {
    "levelData": {
      id: "3_12",
      name: "A Brig under Sail in Fair Weather",
      imageSrc: "level3/3_12.jpg",
      cutSrc: "level3/cut/3_12.jpg",
      author: "ECKERSBERG, Christoffer Wilhelm",
      year: "1844-1845"
    },
    words: [
      {
        audioExample: "files/08_1350_example.mp3",
        textExample: "The towels were made from a soft fabric",
        textExampleTranslate: "Полотенца были сделаны из мягкой ткани",
        id: 1350,
        word: "fabric",
        wordTranslate: "ткань"
      },
      {
        audioExample: "files/08_1351_example.mp3",
        textExample: "The man had a small home in the highlands",
        textExampleTranslate: "У этого человека был маленький дом в горах",
        id: 1351,
        word: "highlands",
        wordTranslate: "высокогорье"
      },
      {
        audioExample: "files/08_1352_example.mp3",
        textExample: "The elephant’s long ivory tusks looked very impressive",
        textExampleTranslate: "Длинные клыки слона выглядели очень впечатляюще",
        id: 1352,
        word: "ivory",
        wordTranslate: "слоновая кость"
      },
      {
        audioExample: "files/08_1355_example.mp3",
        textExample: "Mark spent all morning polishing his shoes for the wedding",
        textExampleTranslate: "Марк провел все утро, полируя свою обувь для свадьбы",
        id: 1355,
        word: "polish",
        wordTranslate: "польский"
      },
      {
        audioExample: "files/08_1356_example.mp3",
        textExample: "I learned to sew when I was a little girl",
        textExampleTranslate: "Я научился шить, когда был маленькой девочкой",
        id: 1356,
        word: "sew",
        wordTranslate: "шьют"
      },
      {
        audioExample: "files/08_1357_example.mp3",
        textExample: "We have a small shed in the backyard for storage",
        textExampleTranslate: "У нас есть небольшой сарай на заднем дворе для хранения",
        id: 1357,
        word: "shed",
        wordTranslate: "сарай"
      },
      {
        audioExample: "files/08_1358_example.mp3",
        textExample: "I have many different colors of thread at home",
        textExampleTranslate: "У меня дома много разных цветов ниток",
        id: 1358,
        word: "thread",
        wordTranslate: "нить"
      },
      {
        audioExample: "files/08_1359_example.mp3",
        textExample: "I had my hair trimmed this afternoon",
        textExampleTranslate: "Мне подстригли сегодня днем",
        id: 1359,
        word: "trim",
        wordTranslate: "отделка"
      },
      {
        audioExample: "files/08_1360_example.mp3",
        textExample: "The kite went upwards further and further",
        textExampleTranslate: "Воздушный змей шел вверх и дальше",
        id: 1360,
        word: "upwards",
        wordTranslate: "снизу вверх"
      },
      {
        audioExample: "files/09_1363_example.mp3",
        textExample: "Owen bounced the ball on the ground",
        textExampleTranslate: "Оуэн отскочил мяч на землю",
        id: 1363,
        word: "bounce",
        wordTranslate: "подпрыгивать"
      }
    ]
  },
  {
    "levelData": {
      id: "3_13",
      name: "The Cloisters, San Lorenzo fuori le mura",
      imageSrc: "level3/3_13.jpg",
      cutSrc: "level3/cut/3_13.jpg",
      author: "ECKERSBERG, Christoffer Wilhelm",
      year: "1824"
    },
    words: [
      {
        audioExample: "files/09_1364_example.mp3",
        textExample: "The two bullies always picked on the smaller, weaker kids",
        textExampleTranslate: "Два хулигана всегда выбирают более слабых детей",
        id: 1364,
        word: "bully",
        wordTranslate: "хулиган"
      },
      {
        audioExample: "files/09_1366_example.mp3",
        textExample: "The baby crawled across the floor",
        textExampleTranslate: "Ребенок ползал по полу",
        id: 1366,
        word: "crawl",
        wordTranslate: "ползти"
      },
      {
        audioExample: "files/09_1367_example.mp3",
        textExample: "The champion defeated the challenger in the boxing match",
        textExampleTranslate: "Чемпион победил претендента в боксерском поединке",
        id: 1367,
        word: "defeat",
        wordTranslate: "поражение"
      },
      {
        audioExample: "files/09_1370_example.mp3",
        textExample: "The entire table was covered with food",
        textExampleTranslate: "Весь стол был накрыт едой",
        id: 1370,
        word: "entire",
        wordTranslate: "весь"
      },
      {
        audioExample: "files/09_1372_example.mp3",
        textExample: "I nodded my head as I listened to the song",
        textExampleTranslate: "Я кивнул головой, слушая песню",
        id: 1372,
        word: "nod",
        wordTranslate: "кивать головой"
      },
      {
        audioExample: "files/09_1373_example.mp3",
        textExample: "On the field, our opponents were too good for us",
        textExampleTranslate: "На поле наши соперники были слишком хороши для нас",
        id: 1373,
        word: "opponent",
        wordTranslate: "противник"
      },
      {
        audioExample: "files/09_1374_example.mp3",
        textExample: "Billy quarreled with his wife about buying a new house",
        textExampleTranslate: "Билли поссорился со своей женой о покупке нового дома",
        id: 1374,
        word: "quarrel",
        wordTranslate: "ссориться"
      },
      {
        audioExample: "files/09_1375_example.mp3",
        textExample: "The three rivals were all competing for the same job",
        textExampleTranslate: "Все три соперника боролись за одну и ту же работу",
        id: 1375,
        word: "rival",
        wordTranslate: "конкурент"
      },
      {
        audioExample: "files/09_1376_example.mp3",
        textExample: "After lifting the heavy box, Mona’s back was sore",
        textExampleTranslate: "Подняв тяжелый ящик, у Моны болела спина",
        id: 1376,
        word: "sore",
        wordTranslate: "боль"
      },
      {
        audioExample: "files/09_1377_example.mp3",
        textExample: "The needle stung my arm and made me say, “Ouch!”",
        textExampleTranslate: "Игла ужалила мне руку и заставила сказать: 'Ой!'",
        id: 1377,
        word: "sting",
        wordTranslate: "жалить"
      }
    ]
  },
  {
    "levelData": {
      id: "3_14",
      name: "View of Amsterdam",
      imageSrc: "level3/3_14.jpg",
      cutSrc: "level3/cut/3_14.jpg",
      author: "EKELS, Jan the Elder",
      year: "1750-1780"
    },
    words: [
      {
        audioExample: "files/09_1378_example.mp3",
        textExample: "Casey strained to lift the heavy box",
        textExampleTranslate: "Кейси напряглась, чтобы поднять тяжелую коробку",
        id: 1378,
        word: "strain",
        wordTranslate: "напряжение"
      },
      {
        audioExample: "files/09_1379_example.mp3",
        textExample: "Greg thought that writing the essay was torture",
        textExampleTranslate: "Грег думал, что написание эссе было пыткой",
        id: 1379,
        word: "torture",
        wordTranslate: "пытать"
      },
      {
        audioExample: "files/10_1381_example.mp3",
        textExample: "There is an absence of sand in the hourglass",
        textExampleTranslate: "В песочных часах нет песка",
        id: 1381,
        word: "absence",
        wordTranslate: "отсутствие"
      },
      {
        audioExample: "files/10_1383_example.mp3",
        textExample: "My oldest brother is bald",
        textExampleTranslate: "Мой старший брат лысый",
        id: 1383,
        word: "bald",
        wordTranslate: "лысый"
      },
      {
        audioExample: "files/10_1385_example.mp3",
        textExample: "The cat slowly crept down the tree",
        textExampleTranslate: "Кот медленно сполз по дереву",
        id: 1385,
        word: "creep",
        wordTranslate: "ползать"
      },
      {
        audioExample: "files/10_1386_example.mp3",
        textExample: "Divorce rates have increased in the past twenty years",
        textExampleTranslate: "Число разводов возросло за последние двадцать лет",
        id: 1386,
        word: "divorce",
        wordTranslate: "расторжение брака"
      },
      {
        audioExample: "files/10_1387_example.mp3",
        textExample: "He imitated his favorite superhero by putting on a costume",
        textExampleTranslate: "Он подражал своему любимому супергерою, надев костюм",
        id: 1387,
        word: "imitate",
        wordTranslate: "подражать"
      },
      {
        audioExample: "files/10_1388_example.mp3",
        textExample: "The infant cried all night",
        textExampleTranslate: "Младенец плакал всю ночь",
        id: 1388,
        word: "infant",
        wordTranslate: "ребенок"
      },
      {
        audioExample: "files/10_1391_example.mp3",
        textExample: "Unfortunately, water was nowhere to be found",
        textExampleTranslate: "К сожалению, воды нигде не было",
        id: 1391,
        word: "nowhere",
        wordTranslate: "нигде"
      },
      {
        audioExample: "files/10_1392_example.mp3",
        textExample: "I patted some lotion onto my face",
        textExampleTranslate: "Я похлопал немного лосьона по лицу",
        id: 1392,
        word: "pat",
        wordTranslate: "погладить"
      }
    ]
  },
  {
    "levelData": {
      id: "3_15",
      name: "View of the Zuidsingel, Amersfoort",
      imageSrc: "level3/3_15.jpg",
      cutSrc: "level3/cut/3_15.jpg",
      author: "EKELS, Jan the Elder",
      year: "1760-1780"
    },
    words: [
      {
        audioExample: "files/10_1394_example.mp3",
        textExample: "The children tried to reproduce their house using toy blocks",
        textExampleTranslate: "Дети пытались воспроизвести свой дом, используя игрушечные блоки",
        id: 1394,
        word: "reproduce",
        wordTranslate: "воспроизвести"
      },
      {
        audioExample: "files/10_1396_example.mp3",
        textExample: "The baby sucked milk from her bottle",
        textExampleTranslate: "Ребенок сосал молоко из бутылочки",
        id: 1396,
        word: "suck",
        wordTranslate: "сосать"
      },
      {
        audioExample: "files/10_1397_example.mp3",
        textExample: "He had to leave at that moment; it was urgent",
        textExampleTranslate: "Он должен был уйти в тот момент; это было срочно",
        id: 1397,
        word: "urgent",
        wordTranslate: "срочно"
      },
      {
        audioExample: "files/10_1398_example.mp3",
        textExample: "All the passengers vanished from the train station",
        textExampleTranslate: "Все пассажиры исчезли с вокзала",
        id: 1398,
        word: "vanish",
        wordTranslate: "исчезают"
      },
      {
        audioExample: "files/10_1399_example.mp3",
        textExample: "He used his wagon to carry some of his gifts",
        textExampleTranslate: "Он использовал свой фургон, чтобы нести некоторые из своих подарков",
        id: 1399,
        word: "wagon",
        wordTranslate: "универсал"
      },
      {
        audioExample: "files/10_1400_example.mp3",
        textExample: "My grandfather has some wrinkles on his face",
        textExampleTranslate: "У моего дедушки морщины на лице",
        id: 1400,
        word: "wrinkle",
        wordTranslate: "морщины"
      },
      {
        audioExample: "files/11_1402_example.mp3",
        textExample: "He put the vegetables in a basket",
        textExampleTranslate: "Он положил овощи в корзину",
        id: 1402,
        word: "basket",
        wordTranslate: "корзина"
      },
      {
        audioExample: "files/11_1403_example.mp3",
        textExample: "The white daisies were about to bloom",
        textExampleTranslate: "Белые ромашки должны были расцвести",
        id: 1403,
        word: "bloom",
        wordTranslate: "цветение"
      },
      {
        audioExample: "files/11_1404_example.mp3",
        textExample: "He paddled his canoe to the edge of the lake",
        textExampleTranslate: "Он греб на своем каноэ к берегу озера",
        id: 1404,
        word: "canoe",
        wordTranslate: "каноэ"
      },
      {
        audioExample: "files/11_1405_example.mp3",
        textExample: "His white living room carpet was soft",
        textExampleTranslate: "Его белый ковер в гостиной был мягким",
        id: 1405,
        word: "carpet",
        wordTranslate: "ковровая дорожка"
      }
    ]
  },
  {
    "levelData": {
      id: "3_16",
      name: "Seascape",
      imageSrc: "level3/3_16.jpg",
      cutSrc: "level3/cut/3_16.jpg",
      author: "EYCK, Gaspard van",
      year: "1650"
    },
    words: [
      {
        audioExample: "files/11_1406_example.mp3",
        textExample: "My cousin looks just like me",
        textExampleTranslate: "Мой двоюродный брат выглядит так же, как я",
        id: 1406,
        word: "cousin",
        wordTranslate: "двоюродная сестра"
      },
      {
        audioExample: "files/11_1407_example.mp3",
        textExample: "She put the books on her desk",
        textExampleTranslate: "Она положила книги на стол",
        id: 1407,
        word: "desk",
        wordTranslate: "стол письменный"
      },
      {
        audioExample: "files/11_1408_example.mp3",
        textExample: "The art gallery displayed beautiful paintings",
        textExampleTranslate: "В картинной галерее выставлены прекрасные картины",
        id: 1408,
        word: "gallery",
        wordTranslate: "галерея"
      },
      {
        audioExample: "files/11_1409_example.mp3",
        textExample: "Alice invited a special guest for dinner",
        textExampleTranslate: "Алиса пригласила специального гостя на ужин",
        id: 1409,
        word: "guest",
        wordTranslate: "гость"
      },
      {
        audioExample: "files/11_1410_example.mp3",
        textExample: "He was a gracious host",
        textExampleTranslate: "Он был добрым хозяином",
        id: 1410,
        word: "host",
        wordTranslate: "хозяин"
      },
      {
        audioExample: "files/11_1411_example.mp3",
        textExample: "Her birthday is in July",
        textExampleTranslate: "Ее день рождения в июле",
        id: 1411,
        word: "July",
        wordTranslate: "июль"
      },
      {
        audioExample: "files/11_1412_example.mp3",
        textExample: "The kitchen had a modern look",
        textExampleTranslate: "Кухня выглядела современно",
        id: 1412,
        word: "modern",
        wordTranslate: "современный"
      },
      {
        audioExample: "files/11_1413_example.mp3",
        textExample: "The Louvre is a famous museum in France",
        textExampleTranslate: "Лувр - известный музей во Франции",
        id: 1413,
        word: "museum",
        wordTranslate: "музей"
      },
      {
        audioExample: "files/11_1414_example.mp3",
        textExample: "She chose a pink lipstick",
        textExampleTranslate: "Она выбрала розовую помаду",
        id: 1414,
        word: "pink",
        wordTranslate: "розовый"
      },
      {
        audioExample: "files/11_1415_example.mp3",
        textExample: "They took a plane across the ocean to India",
        textExampleTranslate: "Они взяли самолет через океан в Индию",
        id: 1415,
        word: "plane",
        wordTranslate: "самолет"
      }
    ]
  },
  {
    "levelData": {
      id: "3_17",
      name: "Southern Pastoral",
      imageSrc: "level3/3_17.jpg",
      cutSrc: "level3/cut/3_17.jpg",
      author: "BERCHEM, Nicolaes",
      year: "1658"
    },
    words: [
      {
        audioExample: "files/11_1416_example.mp3",
        textExample: "He kept milk, eggs, and butter in the refrigerator",
        textExampleTranslate: "Он хранил молоко, яйца и масло в холодильнике",
        id: 1416,
        word: "refrigerator",
        wordTranslate: "холодильник"
      },
      {
        audioExample: "files/11_1417_example.mp3",
        textExample: "In the winter, the temperature can drop below 0 degrees",
        textExampleTranslate: "Зимой температура может опускаться ниже 0 градусов",
        id: 1417,
        word: "temperature",
        wordTranslate: "температура"
      },
      {
        audioExample: "files/11_1419_example.mp3",
        textExample: "He took the elevator to the upper floor",
        textExampleTranslate: "Он поднялся на лифте на верхний этаж",
        id: 1419,
        word: "upper",
        wordTranslate: "верхний"
      },
      {
        audioExample: "files/11_1420_example.mp3",
        textExample: "She greeted her friends with a warm welcome",
        textExampleTranslate: "Она встретила своих друзей с теплым приемом",
        id: 1420,
        word: "welcome",
        wordTranslate: "добро пожаловать"
      },
      {
        audioExample: "files/12_1421_example.mp3",
        textExample: "Carrie anticipated the arrival of her baby",
        textExampleTranslate: "Кэрри предвосхитила прибытие своего ребенка",
        id: 1421,
        word: "anticipate",
        wordTranslate: "предвидеть"
      },
      {
        audioExample: "files/12_1422_example.mp3",
        textExample: "There was an empty barrel outside the house",
        textExampleTranslate: "У дома была пустая бочка",
        id: 1422,
        word: "barrel",
        wordTranslate: "бочка"
      },
      {
        audioExample: "files/12_1423_example.mp3",
        textExample: "Modern skyscrapers are made with many beams",
        textExampleTranslate: "Современные небоскребы сделаны со многими лучами",
        id: 1423,
        word: "beam",
        wordTranslate: "луч"
      },
      {
        audioExample: "files/12_1424_example.mp3",
        textExample: "You can wear casual clothes, like jeans, to the party",
        textExampleTranslate: "Вы можете носить повседневную одежду, как джинсы, на вечеринку",
        id: 1424,
        word: "casual",
        wordTranslate: "повседневная"
      },
      {
        audioExample: "files/12_1427_example.mp3",
        textExample: "Bernie made a deliberate attempt to injure Andy",
        textExampleTranslate: "Берни сделал преднамеренную попытку ранить Энди",
        id: 1427,
        word: "deliberate",
        wordTranslate: "раздумывать"
      },
      {
        audioExample: "files/12_1428_example.mp3",
        textExample: "I dissolved the pill in a glass of water",
        textExampleTranslate: "Я растворил таблетку в стакане воды",
        id: 1428,
        word: "dissolve",
        wordTranslate: "растворяются"
      }
    ]
  },
  {
    "levelData": {
      id: "3_18",
      name: "Winter Landscape",
      imageSrc: "level3/3_18.jpg",
      cutSrc: "level3/cut/3_18.jpg",
      author: "BERGHE, Christoffel van den",
      year: "1615-1620"
    },
    words: [
      {
        audioExample: "files/12_1429_example.mp3",
        textExample: "The old TV exploded when I plugged it in",
        textExampleTranslate: "Старый телевизор взорвался, когда я подключил его",
        id: 1429,
        word: "explode",
        wordTranslate: "взрываются"
      },
      {
        audioExample: "files/12_1430_example.mp3",
        textExample: "Elizabeth fastened her seat belt",
        textExampleTranslate: "Элизабет пристегнула ремень безопасности",
        id: 1430,
        word: "fasten",
        wordTranslate: "пристегнуть"
      },
      {
        audioExample: "files/12_1431_example.mp3",
        textExample: "Germs are on everything that you touch",
        textExampleTranslate: "Микробы на всем, что вы касаетесь",
        id: 1431,
        word: "germ",
        wordTranslate: "росток"
      },
      {
        audioExample: "files/12_1432_example.mp3",
        textExample: "Is there a first aid kit in your office?",
        textExampleTranslate: "Есть ли аптечка в вашем офисе?",
        id: 1432,
        word: "kit",
        wordTranslate: "комплект"
      },
      {
        audioExample: "files/12_1433_example.mp3",
        textExample: "A puff of smoke came from the burnt match",
        textExampleTranslate: "Сгоревшая спичка вышла из дыма",
        id: 1433,
        word: "puff",
        wordTranslate: "пшик"
      },
      {
        audioExample: "files/12_1435_example.mp3",
        textExample: "I accidentally scattered all of my pills",
        textExampleTranslate: "Я случайно разбросал все свои таблетки",
        id: 1435,
        word: "scatter",
        wordTranslate: "разброс"
      },
      {
        audioExample: "files/12_1436_example.mp3",
        textExample: "Julie enjoyed the scent of the flowers",
        textExampleTranslate: "Джули наслаждалась ароматом цветов",
        id: 1436,
        word: "scent",
        wordTranslate: "запах"
      },
      {
        audioExample: "files/12_1437_example.mp3",
        textExample: "The new apartment building was made with steel",
        textExampleTranslate: "Новый жилой дом сделан из стали",
        id: 1437,
        word: "steel",
        wordTranslate: "стали"
      },
      {
        audioExample: "files/12_1438_example.mp3",
        textExample: "The swift horse easily jumped over the hurdle",
        textExampleTranslate: "Стремительный конь легко перепрыгнул через препятствие",
        id: 1438,
        word: "swift",
        wordTranslate: "быстрые"
      },
      {
        audioExample: "files/12_1439_example.mp3",
        textExample: "He tossed a coin into the air",
        textExampleTranslate: "Он бросил монетку в воздух",
        id: 1439,
        word: "toss",
        wordTranslate: "бросать"
      }
    ]
  },
  {
    "levelData": {
      id: "3_19",
      name: "The Silver Seascape",
      imageSrc: "level3/3_19.jpg",
      cutSrc: "level3/cut/3_19.jpg",
      author: "BEYEREN, Abraham van",
      year: "1640-1650"
    },
    words: [
      {
        audioExample: "files/13_1441_example.mp3",
        textExample: "They climbed aboard the kayak and paddled through the river",
        textExampleTranslate: "Они поднялись на борт каяка и плыли через реку",
        id: 1441,
        word: "aboard",
        wordTranslate: "на борту"
      },
      {
        audioExample: "files/13_1442_example.mp3",
        textExample: "He was extremely bitter when his computer crashed",
        textExampleTranslate: "Он был очень горьким, когда его компьютер сломался",
        id: 1442,
        word: "bitter",
        wordTranslate: "горький"
      },
      {
        audioExample: "files/13_1443_example.mp3",
        textExample: "Bullets come in different sizes for different guns",
        textExampleTranslate: "Пули бывают разных размеров для разных видов оружия",
        id: 1443,
        word: "bullet",
        wordTranslate: "пуля"
      },
      {
        audioExample: "files/13_1444_example.mp3",
        textExample: "The church promised protection from the devil",
        textExampleTranslate: "Церковь обещала защиту от дьявола",
        id: 1444,
        word: "devil",
        wordTranslate: "дьявол"
      },
      {
        audioExample: "files/13_1445_example.mp3",
        textExample: "The large chunk of ice drifted in the water",
        textExampleTranslate: "Большой кусок льда дрейфовал в воде",
        id: 1445,
        word: "drift",
        wordTranslate: "дрейф"
      },
      {
        audioExample: "files/13_1446_example.mp3",
        textExample: "Police enforce traffic laws to keep everyone safe",
        textExampleTranslate: "Полиция обеспечивает соблюдение правил дорожного движения, чтобы обеспечить безопасность всех",
        id: 1446,
        word: "enforce",
        wordTranslate: "соблюдение"
      },
      {
        audioExample: "files/13_1448_example.mp3",
        textExample: "There were a few small boats in the harbor",
        textExampleTranslate: "В гавани было несколько маленьких лодок",
        id: 1448,
        word: "harbor",
        wordTranslate: "гавань"
      },
      {
        audioExample: "files/13_1449_example.mp3",
        textExample: "No one inhabits the ancient city",
        textExampleTranslate: "Никто не населяет древний город",
        id: 1449,
        word: "inhabit",
        wordTranslate: "населяют"
      },
      {
        audioExample: "files/13_1450_example.mp3",
        textExample: "The soldiers marched in straight rows",
        textExampleTranslate: "Солдаты шли прямыми рядами",
        id: 1450,
        word: "march",
        wordTranslate: "марш"
      },
      {
        audioExample: "files/13_1452_example.mp3",
        textExample: "The ship was being loaded with materials at the port",
        textExampleTranslate: "Корабль загружался материалами в порту",
        id: 1452,
        word: "port",
        wordTranslate: "порт"
      }
    ]
  },
  {
    "levelData": {
      id: "3_20",
      name: "View of the Isle of Sora",
      imageSrc: "level3/3_20.jpg",
      cutSrc: "level3/cut/3_20.jpg",
      author: "BIDAULD, Jean-Joseph-Xavier",
      year: "1793"
    },
    words: [
      {
        audioExample: "files/13_1453_example.mp3",
        textExample: "It was the sheriff’s job to make the city safe",
        textExampleTranslate: "Это была работа шерифа, чтобы сделать город безопасным",
        id: 1453,
        word: "sheriff",
        wordTranslate: "шериф"
      },
      {
        audioExample: "files/13_1454_example.mp3",
        textExample: "The loud crash startled the sleeping woman",
        textExampleTranslate: "Громкий грохот поразил спящую женщину",
        id: 1454,
        word: "startle",
        wordTranslate: "испуг"
      },
      {
        audioExample: "files/13_1458_example.mp3",
        textExample: "We toured the area aboard a luxury vessel",
        textExampleTranslate: "Мы совершили поездку по области на борту роскошного судна",
        id: 1458,
        word: "vessel",
        wordTranslate: "судно"
      },
      {
        audioExample: "files/13_1460_example.mp3",
        textExample: "Many people around the world worship in a church",
        textExampleTranslate: "Многие люди по всему миру поклоняются в церкви",
        id: 1460,
        word: "worship",
        wordTranslate: "поклонение"
      },
      {
        audioExample: "files/14_1461_example.mp3",
        textExample: "Mark is an apprentice chef at the restaurant",
        textExampleTranslate: "Марк - ученик шеф-повара в ресторане",
        id: 1461,
        word: "apprentice",
        wordTranslate: "ученик"
      },
      {
        audioExample: "files/14_1465_example.mp3",
        textExample: "The women bonded after several hours of conversation",
        textExampleTranslate: "Женщины сблизились после нескольких часов разговора",
        id: 1465,
        word: "bond",
        wordTranslate: "связь"
      },
      {
        audioExample: "files/14_1466_example.mp3",
        textExample: "Tom is a chef at the restaurant near my house",
        textExampleTranslate: "Том - повар в ресторане около моего дома",
        id: 1466,
        word: "chef",
        wordTranslate: "повар"
      },
      {
        audioExample: "files/14_1467_example.mp3",
        textExample: "The crown is made of gold",
        textExampleTranslate: "Корона сделана из золота",
        id: 1467,
        word: "crown",
        wordTranslate: "корона"
      },
      {
        audioExample: "files/14_1469_example.mp3",
        textExample: "Craig has always been a very diligent person at work",
        textExampleTranslate: "Крейг всегда был очень прилежным человеком на работе",
        id: 1469,
        word: "diligent",
        wordTranslate: "прилежный"
      },
      {
        audioExample: "files/14_1470_example.mp3",
        textExample: "The emperor Julius Caesar was in control of ancient Rome",
        textExampleTranslate: "Император Юлий Цезарь контролировал Древний Рим",
        id: 1470,
        word: "emperor",
        wordTranslate: "император"
      }
    ]
  },
  {
    "levelData": {
      id: "3_21",
      name: "Cavalry Battle Scene",
      imageSrc: "level3/3_21.jpg",
      cutSrc: "level3/cut/3_21.jpg",
      author: "BLEKER, Gerrit Claesz",
      year: "1656"
    },
    words: [
      {
        audioExample: "files/14_1471_example.mp3",
        textExample: "The mat was made from tiny fibers",
        textExampleTranslate: "Коврик был сделан из крошечных волокон",
        id: 1471,
        word: "fiber",
        wordTranslate: "волокно"
      },
      {
        audioExample: "files/14_1472_example.mp3",
        textExample: "The assignment was horrible. I hated it",
        textExampleTranslate: "Назначение было ужасно. Я ненавидел это",
        id: 1472,
        word: "horrible",
        wordTranslate: "какой ужас"
      },
      {
        audioExample: "files/14_1473_example.mp3",
        textExample: "Roger is impolite to everyone he meets",
        textExampleTranslate: "Роджер невежлив со всеми, кого встречает",
        id: 1473,
        word: "impolite",
        wordTranslate: "невежливо"
      },
      {
        audioExample: "files/14_1475_example.mp3",
        textExample: "Our honeymoon resort was a luxury we really enjoyed",
        textExampleTranslate: "Наш медовый месяц был роскошью, которой мы действительно наслаждались",
        id: 1475,
        word: "luxury",
        wordTranslate: "роскошь"
      },
      {
        audioExample: "files/14_1476_example.mp3",
        textExample: "The wheels on his truck were massive",
        textExampleTranslate: "Колеса на его грузовике были массивными",
        id: 1476,
        word: "massive",
        wordTranslate: "массивный"
      },
      {
        audioExample: "files/14_1477_example.mp3",
        textExample: "Everyone panicked when the house caught on fire",
        textExampleTranslate: "Все запаниковали, когда дом загорелся",
        id: 1477,
        word: "panic",
        wordTranslate: "паника"
      },
      {
        audioExample: "files/14_1478_example.mp3",
        textExample: "My priority is to get good grades in school",
        textExampleTranslate: "Мой приоритет - получать хорошие оценки в школе",
        id: 1478,
        word: "priority",
        wordTranslate: "приоритет"
      },
      {
        audioExample: "files/14_1479_example.mp3",
        textExample: "The monks at the temple all wear robes",
        textExampleTranslate: "Монахи в храме все носят одежды",
        id: 1479,
        word: "robe",
        wordTranslate: "халат"
      },
      {
        audioExample: "files/14_1480_example.mp3",
        textExample: "Jesse was scolded by the teacher for not paying attention",
        textExampleTranslate: "Джесси был отчитан учителем за то, что он не обратил внимания",
        id: 1480,
        word: "scold",
        wordTranslate: "ругать"
      },
      {
        audioExample: "files/15_1482_example.mp3",
        textExample: "The students had an assembly to talk about their interests",
        textExampleTranslate: "У студентов было собрание, чтобы поговорить об их интересах",
        id: 1482,
        word: "assembly",
        wordTranslate: "сборка"
      }
    ]
  },
  {
    "levelData": {
      id: "3_22",
      name: "Landscape with the Parable of the Tares among the Wheat",
      imageSrc: "level3/3_22.jpg",
      cutSrc: "level3/cut/3_22.jpg",
      author: "BLOEMAERT, Abraham",
      year: "1624"
    },
    words: [
      {
        audioExample: "files/15_1483_example.mp3",
        textExample: "The angel blessed the newborn baby to keep it safe",
        textExampleTranslate: "Ангел благословил новорожденного, чтобы он был в безопасности",
        id: 1483,
        word: "bless",
        wordTranslate: "благословить"
      },
      {
        audioExample: "files/15_1486_example.mp3",
        textExample: "The diameter of the tree was about 60 centimeters",
        textExampleTranslate: "Диаметр дерева составлял около 60 сантиметров ",
        id: 1486,
        word: "diameter",
        wordTranslate: "диаметр"
      },
      {
        audioExample: "files/15_1489_example.mp3",
        textExample: "They had a lot of wheat from the last harvest",
        textExampleTranslate: "У них было много пшеницы с последнего урожая",
        id: 1489,
        word: "harvest",
        wordTranslate: "уборка урожая"
      },
      {
        audioExample: "files/15_1490_example.mp3",
        textExample: "They felt merry because the weather was great",
        textExampleTranslate: "Им было весело, потому что погода была отличной",
        id: 1490,
        word: "merry",
        wordTranslate: "весёлая"
      },
      {
        audioExample: "files/15_1491_example.mp3",
        textExample: "To eat a nut, you must first crack its shell",
        textExampleTranslate: "Чтобы съесть орех, нужно сначала взломать его скорлупу",
        id: 1491,
        word: "nut",
        wordTranslate: "орех"
      },
      {
        audioExample: "files/15_1493_example.mp3",
        textExample: "The pharaohs ruled Egypt for thousands of years",
        textExampleTranslate: "Фараоны правили Египтом тысячи лет",
        id: 1493,
        word: "pharaoh",
        wordTranslate: "фараон"
      },
      {
        audioExample: "files/15_1494_example.mp3",
        textExample: "The cherries were nice and ripe",
        textExampleTranslate: "Вишни были хорошими и спелыми",
        id: 1494,
        word: "ripe",
        wordTranslate: "созрел"
      },
      {
        audioExample: "files/15_1495_example.mp3",
        textExample: "Mom roasted a turkey for the holiday dinner",
        textExampleTranslate: "Мама жарила индейку на праздничный ужин",
        id: 1495,
        word: "roast",
        wordTranslate: "жареный"
      },
      {
        audioExample: "files/15_1496_example.mp3",
        textExample: "My father’s daily routine includes shaving right before breakfast",
        textExampleTranslate: "Повседневная жизнь моего отца включает бритье прямо перед завтраком",
        id: 1496,
        word: "routine",
        wordTranslate: "рутина"
      },
      {
        audioExample: "files/15_1498_example.mp3",
        textExample: "Look at my new cell phone. It’s very slim",
        textExampleTranslate: "Посмотрите на мой новый сотовый телефон. Он очень тонкий",
        id: 1498,
        word: "slim",
        wordTranslate: "стройное"
      }
    ]
  },
  {
    "levelData": {
      id: "3_23",
      name: "A Scene in the Roman Campagna",
      imageSrc: "level3/3_23.jpg",
      cutSrc: "level3/cut/3_23.jpg",
      author: "BLOEMEN, Jan Frans van",
      year: "1736"
    },
    words: [
      {
        audioExample: "files/16_1502_example.mp3",
        textExample: "He has a natural aptitude for water skiing",
        textExampleTranslate: "У него природная склонность к катанию на водных лыжах",
        id: 1502,
        word: "aptitude",
        wordTranslate: "способность"
      },
      {
        audioExample: "files/16_1503_example.mp3",
        textExample: "Her co-worker complimented her for doing a good job",
        textExampleTranslate: "Ее коллега похвалила ее за хорошую работу",
        id: 1503,
        word: "compliment",
        wordTranslate: "комплимент"
      },
      {
        audioExample: "files/16_1505_example.mp3",
        textExample: "Before becoming a teacher, she worked in journalism",
        textExampleTranslate: "Прежде чем стать учителем, она работала в журналистике",
        id: 1505,
        word: "journalism",
        wordTranslate: "журналистика"
      },
      {
        audioExample: "files/16_1509_example.mp3",
        textExample: "He worked hard to create a successful literary career",
        textExampleTranslate: "Он много работал, чтобы создать успешную литературную карьеру",
        id: 1509,
        word: "literary",
        wordTranslate: "литературный"
      },
      {
        audioExample: "files/16_1510_example.mp3",
        textExample: "My mother sells medicine to people at the pharmacy",
        textExampleTranslate: "Моя мама продает лекарства людям в аптеке",
        id: 1510,
        word: "pharmacy",
        wordTranslate: "аптека"
      },
      {
        audioExample: "files/16_1511_example.mp3",
        textExample: "She took a pill for her headache",
        textExampleTranslate: "Она приняла таблетку от головной боли",
        id: 1511,
        word: "pill",
        wordTranslate: "таблетка"
      },
      {
        audioExample: "files/16_1517_example.mp3",
        textExample: "The girl felt sorrow after her best friend moved away",
        textExampleTranslate: "Девушка скорбела после того, как ее лучшая подруга ушла",
        id: 1517,
        word: "sorrow",
        wordTranslate: "печаль"
      },
      {
        audioExample: "files/16_1518_example.mp3",
        textExample: "I drank the orange juice through a straw",
        textExampleTranslate: "Я пил апельсиновый сок через соломинку",
        id: 1518,
        word: "straw",
        wordTranslate: "солома"
      },
      {
        audioExample: "files/16_1519_example.mp3",
        textExample: "My sister’s stomach began to swell after she got pregnant",
        textExampleTranslate: "Живот моей сестры начал опухать после того, как она забеременела",
        id: 1519,
        word: "swell",
        wordTranslate: "зыбь"
      },
      {
        audioExample: "files/16_1520_example.mp3",
        textExample: "Leon has always been a very tidy boy",
        textExampleTranslate: "Леон всегда был очень аккуратным мальчиком",
        id: 1520,
        word: "tidy",
        wordTranslate: "аккуратный"
      }
    ]
  },
  {
    "levelData": {
      id: "3_24",
      name: "Naples, a View of Mergellina",
      imageSrc: "level3/3_24.jpg",
      cutSrc: "level3/cut/3_24.jpg",
      author: "BLOEMEN, Jan Frans van",
      year: "1777"
    },
    words: [
      {
        audioExample: "files/17_1523_example.mp3",
        textExample: "The end of his cigar was full of ashes",
        textExampleTranslate: "Конец его сигары был полон пепла",
        id: 1523,
        word: "ash",
        wordTranslate: "пепел"
      },
      {
        audioExample: "files/17_1524_example.mp3",
        textExample: "The elephant is confined to a cage in the zoo",
        textExampleTranslate: "Слон ограничен клеткой в зоопарке",
        id: 1524,
        word: "confine",
        wordTranslate: "ограничивать"
      },
      {
        audioExample: "files/17_1525_example.mp3",
        textExample: "He quickly dismissed my idea about the new project",
        textExampleTranslate: "Он быстро отклонил мою идею о новом проекте",
        id: 1525,
        word: "dismiss",
        wordTranslate: "уволить"
      },
      {
        audioExample: "files/17_1526_example.mp3",
        textExample: "The volcano erupted for the first time in ten years",
        textExampleTranslate: "Вулкан извергся впервые за десять лет",
        id: 1526,
        word: "erupt",
        wordTranslate: "вспыхнуть"
      },
      {
        audioExample: "files/17_1528_example.mp3",
        textExample: "The red-hot lava poured from the volcano",
        textExampleTranslate: "Раскаленная лава из вулкана",
        id: 1528,
        word: "lava",
        wordTranslate: "лава"
      },
      {
        audioExample: "files/17_1529_example.mp3",
        textExample: "He was miserable after his dog died",
        textExampleTranslate: "Он был несчастен после того, как его собака умерла",
        id: 1529,
        word: "miserable",
        wordTranslate: "несчастный"
      },
      {
        audioExample: "files/17_1530_example.mp3",
        textExample: "She navigated the ship across the ocean",
        textExampleTranslate: "Она прошла корабль через океан",
        id: 1530,
        word: "navigate",
        wordTranslate: "навигация"
      },
      {
        audioExample: "files/17_1531_example.mp3",
        textExample: "The idea of democracy originated in Ancient Greece",
        textExampleTranslate: "Идея демократии возникла в Древней Греции",
        id: 1531,
        word: "originate",
        wordTranslate: "происходят"
      },
      {
        audioExample: "files/17_1533_example.mp3",
        textExample: "She retrieved her mail from the mailbox",
        textExampleTranslate: "Она получила свою почту из почтового ящика",
        id: 1533,
        word: "retrieve",
        wordTranslate: "получить"
      },
      {
        audioExample: "files/17_1534_example.mp3",
        textExample: "The kids were playing in the shallow water",
        textExampleTranslate: "Дети играли на мелководье",
        id: 1534,
        word: "shallow",
        wordTranslate: "мелкий"
      }
    ]
  },
  {
    "levelData": {
      id: "3_25",
      name: "River Landscape",
      imageSrc: "level3/3_25.jpg",
      cutSrc: "level3/cut/3_25.jpg",
      author: "GAINSBOROUGH, Thomas",
      year: "1768-1770"
    },
    words: [
      {
        audioExample: "files/17_1536_example.mp3",
        textExample: "His work at the bakery has spanned twenty years",
        textExampleTranslate: "Его работа в пекарне длилась двадцать лет",
        id: 1536,
        word: "span",
        wordTranslate: "диапазон"
      },
      {
        audioExample: "files/18_1541_example.mp3",
        textExample: "The soldier wore armor to protect his body",
        textExampleTranslate: "Солдат носил доспехи, чтобы защитить свое тело",
        id: 1541,
        word: "armor",
        wordTranslate: "броня"
      },
      {
        audioExample: "files/18_1542_example.mp3",
        textExample: "The small fire soon blazed into a large, dangerous one",
        textExampleTranslate: "Небольшой пожар вскоре превратился в большой, опасный",
        id: 1542,
        word: "blaze",
        wordTranslate: "сверкать"
      },
      {
        audioExample: "files/18_1543_example.mp3",
        textExample: "The firecrackers made a loud boom when they exploded",
        textExampleTranslate: "Фейерверки громко взорвались, когда взорвались",
        id: 1543,
        word: "boom",
        wordTranslate: "бум"
      },
      {
        audioExample: "files/18_1544_example.mp3",
        textExample: "The wolf stood at the cliff and howled",
        textExampleTranslate: "Волк стоял у скалы и выл",
        id: 1544,
        word: "cliff",
        wordTranslate: "скала"
      },
      {
        audioExample: "files/18_1545_example.mp3",
        textExample: "The torch was filled with yellow and orange flames",
        textExampleTranslate: "Факел был наполнен желтым и оранжевым пламенем",
        id: 1545,
        word: "flame",
        wordTranslate: "пламя"
      },
      {
        audioExample: "files/18_1546_example.mp3",
        textExample: "After leaving home, Sophia had a great feeling of independence",
        textExampleTranslate: "Покинув дом, София почувствовала прекрасное чувство независимости",
        id: 1546,
        word: "independence",
        wordTranslate: "независимость"
      },
      {
        audioExample: "files/18_1549_example.mp3",
        textExample: "The lightning flashed above the water",
        textExampleTranslate: "Молния вспыхнула над водой",
        id: 1549,
        word: "lightning",
        wordTranslate: "молния"
      },
      {
        audioExample: "files/18_1550_example.mp3",
        textExample: "The rebel was angry about the government’s unfair policies",
        textExampleTranslate: "Мятежник был зол на нечестную политику правительства",
        id: 1550,
        word: "rebel",
        wordTranslate: "бунтарь"
      },
      {
        audioExample: "files/18_1551_example.mp3",
        textExample: "The army retreated because they were losing the battle",
        textExampleTranslate: "Армия отступила, потому что они проигрывали битву",
        id: 1551,
        word: "retreat",
        wordTranslate: "отступление"
      }
    ]
  },
  {
    "levelData": {
      id: "3_26",
      name: "The Seine in Paris between the Pont d'Iéna and Pont de Grenelle",
      imageSrc: "level3/3_26.jpg",
      cutSrc: "level3/cut/3_26.jpg",
      author: "GAUGUIN, Paul",
      year: "1875"
    },
    words: [
      {
        audioExample: "files/18_1553_example.mp3",
        textExample: "The soldier was holding a spear in his hand",
        textExampleTranslate: "Солдат держал в руке копье",
        id: 1553,
        word: "spear",
        wordTranslate: "копье"
      },
      {
        audioExample: "files/18_1556_example.mp3",
        textExample: "The sound of the thunder startled me",
        textExampleTranslate: "Звук грома поразил меня",
        id: 1556,
        word: "thunder",
        wordTranslate: "гром"
      },
      {
        audioExample: "files/18_1557_example.mp3",
        textExample: "The troops were all prepared to go into battle",
        textExampleTranslate: "Все войска были готовы идти в бой",
        id: 1557,
        word: "troops",
        wordTranslate: "войско"
      },
      {
        audioExample: "files/19_1561_example.mp3",
        textExample: "Most parks have benches for people to relax upon",
        textExampleTranslate: "В большинстве парков есть скамейки, на которых можно отдохнуть",
        id: 1561,
        word: "bench",
        wordTranslate: "скамейка"
      },
      {
        audioExample: "files/19_1562_example.mp3",
        textExample: "There were a few daisies growing in the field",
        textExampleTranslate: "Там было несколько ромашек, растущих в поле",
        id: 1562,
        word: "daisy",
        wordTranslate: "ромашка"
      },
      {
        audioExample: "files/19_1563_example.mp3",
        textExample: "Karen and Brian often have disputes about silly things",
        textExampleTranslate: "Карен и Брайан часто спорят о глупостях",
        id: 1563,
        word: "dispute",
        wordTranslate: "спор"
      },
      {
        audioExample: "files/19_1564_example.mp3",
        textExample: "The teacher showed the students an empty bottle",
        textExampleTranslate: "Учитель показал ученикам пустую бутылку",
        id: 1564,
        word: "empty",
        wordTranslate: "пустой"
      },
      {
        audioExample: "files/19_1567_example.mp3",
        textExample: "The forest was covered with mist",
        textExampleTranslate: "Лес был покрыт туманом",
        id: 1567,
        word: "mist",
        wordTranslate: "туман"
      },
      {
        audioExample: "files/19_1568_example.mp3",
        textExample: "The shopping cart was filled with objects",
        textExampleTranslate: "Корзина была заполнена предметами",
        id: 1568,
        word: "object",
        wordTranslate: "объект"
      },
      {
        audioExample: "files/19_1569_example.mp3",
        textExample: "The orphan frequently cried during the night",
        textExampleTranslate: "Сирота часто плакала ночью",
        id: 1569,
        word: "orphan",
        wordTranslate: "сирота"
      }
    ]
  },
  {
    "levelData": {
      id: "3_27",
      name: "A Corroboree in Van Diemen's Land",
      imageSrc: "level3/3_27.jpg",
      cutSrc: "level3/cut/3_27.jpg",
      author: "GLOVER, John",
      year: "1840"
    },
    words: [
      {
        audioExample: "files/19_1570_example.mp3",
        textExample: "The group was plotting to ruin the company’s financial reports",
        textExampleTranslate: "Группа планировала испортить финансовые отчеты компании",
        id: 1570,
        word: "plot",
        wordTranslate: "сюжет"
      },
      {
        audioExample: "files/19_1571_example.mp3",
        textExample: "The pregnant woman was shopping for baby clothes",
        textExampleTranslate: "Беременная женщина покупала детскую одежду",
        id: 1571,
        word: "pregnant",
        wordTranslate: "беременный"
      },
      {
        audioExample: "files/19_1574_example.mp3",
        textExample: "The boy felt shame about misplacing his clothes",
        textExampleTranslate: "Мальчику было стыдно за то, что он не положил свою одежду",
        id: 1574,
        word: "shame",
        wordTranslate: "позор"
      },
      {
        audioExample: "files/19_1578_example.mp3",
        textExample: "The rose had a long thin stem",
        textExampleTranslate: "Роза имела длинный тонкий стебель",
        id: 1578,
        word: "stem",
        wordTranslate: "стебель"
      },
      {
        audioExample: "files/19_1579_example.mp3",
        textExample: "We usually have supper around 6 o’clock at my house",
        textExampleTranslate: "У нас обычно ужин около 6 часов в моем доме",
        id: 1579,
        word: "supper",
        wordTranslate: "ужин"
      },
      {
        audioExample: "files/20_1581_example.mp3",
        textExample: "The largest part of an iceberg lies beneath the waterline",
        textExampleTranslate: "Большая часть айсберга лежит под ватерлинией",
        id: 1581,
        word: "beneath",
        wordTranslate: "под"
      },
      {
        audioExample: "files/20_1582_example.mp3",
        textExample: "The lion cub was crying for its mother",
        textExampleTranslate: "Львенок плачет по матери",
        id: 1582,
        word: "cub",
        wordTranslate: "детеныш"
      },
      {
        audioExample: "files/20_1583_example.mp3",
        textExample: "At dawn, the sun gently rose over the farm",
        textExampleTranslate: "На рассвете солнце нежно взошло над фермой",
        id: 1583,
        word: "dawn",
        wordTranslate: "рассвет"
      },
      {
        audioExample: "files/20_1584_example.mp3",
        textExample: "I was dissatisfied with their decision to work on Sunday",
        textExampleTranslate: "Я был недоволен их решением работать в воскресенье",
        id: 1584,
        word: "dissatisfied",
        wordTranslate: "недовольных"
      },
      {
        audioExample: "files/20_1585_example.mp3",
        textExample: "The monkey climbed the tree with ease",
        textExampleTranslate: "Обезьяна с легкостью залезла на дерево",
        id: 1585,
        word: "ease",
        wordTranslate: "легкость"
      }
    ]
  },
  {
    "levelData": {
      id: "3_28",
      name: "Beach at Scheveningen in Stormy Weather",
      imageSrc: "level3/3_28.jpg",
      cutSrc: "level3/cut/3_28.jpg",
      author: "GOGH, Vincent van",
      year: "1882"
    },
    words: [
      {
        audioExample: "files/20_1588_example.mp3",
        textExample: "The wolf howled at the moon",
        textExampleTranslate: "Волк воет на луну",
        id: 1588,
        word: "howl",
        wordTranslate: "вой"
      },
      {
        audioExample: "files/20_1591_example.mp3",
        textExample: "Fresh water is a necessity for life",
        textExampleTranslate: "Пресная вода необходима для жизни",
        id: 1591,
        word: "necessity",
        wordTranslate: "необходимость"
      },
      {
        audioExample: "files/20_1593_example.mp3",
        textExample: "The pile of cups was beginning to lean",
        textExampleTranslate: "Куча чашек начинала наклоняться",
        id: 1593,
        word: "pile",
        wordTranslate: "куча"
      },
      {
        audioExample: "files/20_1594_example.mp3",
        textExample: "For a young man, Jeremy has some profound thoughts",
        textExampleTranslate: "У молодого человека у Джереми есть глубокие мысли",
        id: 1594,
        word: "profound",
        wordTranslate: "глубокий"
      },
      {
        audioExample: "files/20_1598_example.mp3",
        textExample: "My youngest daughter is a terrific painter",
        textExampleTranslate: "Моя младшая дочь - потрясающий художник",
        id: 1598,
        word: "terrific",
        wordTranslate: "потрясающий"
      },
      {
        audioExample: "files/20_1599_example.mp3",
        textExample: "One trait of Salvador’s personality is his cheerfulness",
        textExampleTranslate: "Одна черта личности Сальвадора - его жизнерадостность",
        id: 1599,
        word: "trait",
        wordTranslate: "черта"
      },
      {
        audioExample: "files/20_1600_example.mp3",
        textExample: "The heart is a vital organ",
        textExampleTranslate: "Сердце - это жизненно важный орган",
        id: 1600,
        word: "vital",
        wordTranslate: "жизненно важно"
      },
      {
        audioExample: "files/21_1601_example.mp3",
        textExample: "She watched the lizard attack its prey",
        textExampleTranslate: "Она смотрела, как ящерица нападает на свою жертву",
        id: 1601,
        word: "attack",
        wordTranslate: "атака"
      },
      {
        audioExample: "files/21_1602_example.mp3",
        textExample: "She was diagnosed with breast cancer",
        textExampleTranslate: "У нее был диагностирован рак молочной железы",
        id: 1602,
        word: "breast",
        wordTranslate: "грудь"
      },
      {
        audioExample: "files/21_1604_example.mp3",
        textExample: "The exam found cancerous cells in the patient’s blood",
        textExampleTranslate: "При обследовании обнаружены раковые клетки в крови пациента",
        id: 1604,
        word: "cancerous",
        wordTranslate: "злокачественный"
      }
    ]
  },
  {
    "levelData": {
      id: "3_29",
      name: "Farmhouses among Trees",
      imageSrc: "level3/3_29.jpg",
      cutSrc: "level3/cut/3_29.jpg",
      author: "GOGH, Vincent van",
      year: "1883"
    },
    words: [
      {
        audioExample: "files/21_1605_example.mp3",
        textExample: "A red blood cell carries oxygen",
        textExampleTranslate: "Эритроцит несет кислород",
        id: 1605,
        word: "cell",
        wordTranslate: "клетка"
      },
      {
        audioExample: "files/21_1606_example.mp3",
        textExample: "Cigarette smoking is terrible for your health",
        textExampleTranslate: "Курение сигарет вредно для вашего здоровья",
        id: 1606,
        word: "cigarette",
        wordTranslate: "сигарета"
      },
      {
        audioExample: "files/21_1607_example.mp3",
        textExample: "She used the code to solve the puzzle",
        textExampleTranslate: "Она использовала код для решения головоломки",
        id: 1607,
        word: "code",
        wordTranslate: "код"
      },
      {
        audioExample: "files/21_1608_example.mp3",
        textExample: "Scientists are still working on finding a cure for diabetes",
        textExampleTranslate: "Ученые все еще работают над поиском лекарства от диабета",
        id: 1608,
        word: "cure",
        wordTranslate: "лечение"
      },
      {
        audioExample: "files/21_1609_example.mp3",
        textExample: "The wildfires left the forest in a state of destruction",
        textExampleTranslate: "Лесные пожары покинули лес в состоянии разрушения",
        id: 1609,
        word: "destruction",
        wordTranslate: "разрушение"
      },
      {
        audioExample: "files/21_1610_example.mp3",
        textExample: "The police sometimes use DNA to solve crime",
        textExampleTranslate: "Полиция иногда использует ДНК для раскрытия преступлений",
        id: 1610,
        word: "DNA",
        wordTranslate: "ДНК"
      },
      {
        audioExample: "files/21_1611_example.mp3",
        textExample: "The game drew extensive media coverage",
        textExampleTranslate: "Игра привлекла широкое освещение в СМИ",
        id: 1611,
        word: "extensive",
        wordTranslate: "обширный"
      },
      {
        audioExample: "files/21_1613_example.mp3",
        textExample: "She’s clever, and furthermore, she is not afraid of work",
        textExampleTranslate: "Она умная, а кроме того, она не боится работы",
        id: 1613,
        word: "furthermore",
        wordTranslate: "более того"
      },
      {
        audioExample: "files/21_1614_example.mp3",
        textExample: "Gene therapy is sometimes used to treat an illness",
        textExampleTranslate: "Генная терапия иногда используется для лечения болезни",
        id: 1614,
        word: "gene",
        wordTranslate: "ген"
      },
      {
        audioExample: "files/21_1616_example.mp3",
        textExample: "The two lines in the poem share a common link",
        textExampleTranslate: "Две строки в стихотворении имеют общую ссылку",
        id: 1616,
        word: "link",
        wordTranslate: "ссылка на сайт"
      }
    ]
  },
  {
    "levelData": {
      id: "3_30",
      name: "Two Peasant Women in the Peat Field",
      imageSrc: "level3/3_30.jpg",
      cutSrc: "level3/cut/3_30.jpg",
      author: "GOGH, Vincent van",
      year: "1883"
    },
    words: [
      {
        audioExample: "files/21_1617_example.mp3",
        textExample: "He was the only male in the store",
        textExampleTranslate: "Он был единственным мужчиной в магазине",
        id: 1617,
        word: "male",
        wordTranslate: "мужчина"
      },
      {
        audioExample: "files/21_1618_example.mp3",
        textExample: "The population of our city is steadily growing",
        textExampleTranslate: "Население нашего города неуклонно растет",
        id: 1618,
        word: "population",
        wordTranslate: "население"
      },
      {
        audioExample: "files/21_1619_example.mp3",
        textExample: "The result of her experiment was surprising",
        textExampleTranslate: "Результат ее эксперимента был удивительным",
        id: 1619,
        word: "result",
        wordTranslate: "результат"
      },
      {
        audioExample: "files/21_1620_example.mp3",
        textExample: "She added extra sugar to her tea",
        textExampleTranslate: "Она добавила дополнительный сахар в свой чай",
        id: 1620,
        word: "sugar",
        wordTranslate: "сахар"
      },
      {
        audioExample: "files/22_1621_example.mp3",
        textExample: "The meeting room can accommodate nine people",
        textExampleTranslate: "Конференц-зал может вместить девять человек",
        id: 1621,
        word: "accommodate",
        wordTranslate: "вмещать"
      },
      {
        audioExample: "files/22_1623_example.mp3",
        textExample: "My birthday coincides with Christmas",
        textExampleTranslate: "Мой день рождения совпадает с Рождеством",
        id: 1623,
        word: "coincide",
        wordTranslate: "совпадают"
      },
      {
        audioExample: "files/22_1624_example.mp3",
        textExample: "The artist was commissioned to create a picture",
        textExampleTranslate: "Художнику было поручено создать картину",
        id: 1624,
        word: "commission",
        wordTranslate: "комиссия"
      },
      {
        audioExample: "files/22_1626_example.mp3",
        textExample: "Valery got her hair dyed at the salon yesterday",
        textExampleTranslate: "Валерия вчера покрасила волосы в салоне",
        id: 1626,
        word: "dye",
        wordTranslate: "краситель"
      },
      {
        audioExample: "files/22_1627_example.mp3",
        textExample: "He ate to such an extent that he became overweight",
        textExampleTranslate: "Он ел до такой степени, что стал лишним весом",
        id: 1627,
        word: "extent",
        wordTranslate: "степень"
      },
      {
        audioExample: "files/22_1628_example.mp3",
        textExample: "Do you know the gender of her new baby?",
        textExampleTranslate: "Вы знаете пол ее нового ребенка?",
        id: 1628,
        word: "gender",
        wordTranslate: "пол"
      }
    ]
  },
  {
    "levelData": {
      id: "3_31",
      name: "The Parsonage Garden at Nuenen in Spring",
      imageSrc: "level3/3_31.jpg",
      cutSrc: "level3/cut/3_31.jpg",
      author: "GOGH, Vincent van",
      year: "1884"
    },
    words: [
      {
        audioExample: "files/22_1629_example.mp3",
        textExample: "The headline on the front page was about the economy",
        textExampleTranslate: "Заголовок на первой странице был об экономике",
        id: 1629,
        word: "headline",
        wordTranslate: "заголовок"
      },
      {
        audioExample: "files/22_1630_example.mp3",
        textExample: "They had an informal meeting to talk about their experiences",
        textExampleTranslate: "У них была неформальная встреча, чтобы рассказать о своем опыте",
        id: 1630,
        word: "informal",
        wordTranslate: "неофициальный"
      },
      {
        audioExample: "files/22_1632_example.mp3",
        textExample: "The messenger delivered an important document to the office",
        textExampleTranslate: "Курьер доставил важный документ в офис",
        id: 1632,
        word: "messenger",
        wordTranslate: "гонец"
      },
      {
        audioExample: "files/22_1633_example.mp3",
        textExample: "She peered at people through the window",
        textExampleTranslate: "Она смотрела на людей через окно",
        id: 1633,
        word: "peer",
        wordTranslate: "равный"
      },
      {
        audioExample: "files/22_1635_example.mp3",
        textExample: "The kids and their dog posed for a picture",
        textExampleTranslate: "Дети и их собака позировали для картины",
        id: 1635,
        word: "pose",
        wordTranslate: "поза"
      },
      {
        audioExample: "files/22_1636_example.mp3",
        textExample: "My uncle has many horses on his ranch",
        textExampleTranslate: "У моего дяди много лошадей на ранчо",
        id: 1636,
        word: "ranch",
        wordTranslate: "ранчо"
      },
      {
        audioExample: "files/22_1637_example.mp3",
        textExample: "He steered the go-cart around the track",
        textExampleTranslate: "Он вел повозку по трассе",
        id: 1637,
        word: "steer",
        wordTranslate: "бычок"
      },
      {
        audioExample: "files/22_1639_example.mp3",
        textExample: "The tame bird rested in his hand",
        textExampleTranslate: "Ручная птица покоилась в его руке",
        id: 1639,
        word: "tame",
        wordTranslate: "приручить"
      },
      {
        audioExample: "files/23_1641_example.mp3",
        textExample: "Smoking is banned in this building",
        textExampleTranslate: "Курение запрещено в этом здании",
        id: 1641,
        word: "ban",
        wordTranslate: "запретить"
      },
      {
        audioExample: "files/23_1642_example.mp3",
        textExample: "Be very cautious as you stack those boxes",
        textExampleTranslate: "Будьте очень осторожны, когда складываете эти коробки",
        id: 1642,
        word: "cautious",
        wordTranslate: "осторожный"
      }
    ]
  },
  {
    "levelData": {
      id: "3_32",
      name: "In the Jardin du Luxembourg",
      imageSrc: "level3/3_32.jpg",
      cutSrc: "level3/cut/3_32.jpg",
      author: "GOGH, Vincent van",
      year: "1886"
    },
    words: [
      {
        audioExample: "files/23_1643_example.mp3",
        textExample: "The woman confessed that she had stolen the money",
        textExampleTranslate: "Женщина призналась, что украла деньги",
        id: 1643,
        word: "confess",
        wordTranslate: "признания"
      },
      {
        audioExample: "files/23_1644_example.mp3",
        textExample: "My aunt lives in a pretty cottage in the mountains",
        textExampleTranslate: "Моя тетя живет в красивом коттедже в горах",
        id: 1644,
        word: "cottage",
        wordTranslate: "коттедж"
      },
      {
        audioExample: "files/23_1646_example.mp3",
        textExample: "I’m desperate to find a new job",
        textExampleTranslate: "Я отчаянно пытаюсь найти новую работу",
        id: 1646,
        word: "desperate",
        wordTranslate: "отчаянный"
      },
      {
        audioExample: "files/23_1647_example.mp3",
        textExample: "After an exhausting journey, we finally arrived",
        textExampleTranslate: "После утомительного путешествия мы наконец прибыли",
        id: 1647,
        word: "exhausting",
        wordTranslate: "исчерпать"
      },
      {
        audioExample: "files/23_1648_example.mp3",
        textExample: "The piece of cloth I found was old and faded",
        textExampleTranslate: "Кусок ткани, который я нашел, был старым и выцветшим",
        id: 1648,
        word: "fade",
        wordTranslate: "исчезают"
      },
      {
        audioExample: "files/23_1649_example.mp3",
        textExample: "Wolves are fierce animals. Do not disturb them",
        textExampleTranslate: "Волки - жестокие животные. Не беспокой их",
        id: 1649,
        word: "fierce",
        wordTranslate: "свирепый"
      },
      {
        audioExample: "files/23_1650_example.mp3",
        textExample: "Many people like to go to casinos to gamble",
        textExampleTranslate: "Многие люди любят ходить в казино, чтобы играть в азартные игры",
        id: 1650,
        word: "gamble",
        wordTranslate: "играть в азартные игры"
      },
      {
        audioExample: "files/23_1652_example.mp3",
        textExample: "I mow our lawn every weekend",
        textExampleTranslate: "Я подстригаю газон каждые выходные",
        id: 1652,
        word: "mow",
        wordTranslate: "косить"
      },
      {
        audioExample: "files/23_1655_example.mp3",
        textExample: "My sister likes to buy designer purses",
        textExampleTranslate: "Моя сестра любит покупать дизайнерские кошельки",
        id: 1655,
        word: "purse",
        wordTranslate: "кошелек"
      },
      {
        audioExample: "files/23_1657_example.mp3",
        textExample: "It seldom rains in southern Arizona",
        textExampleTranslate: "На юге Аризоны редко идут дожди",
        id: 1657,
        word: "seldom",
        wordTranslate: "редко"
      }
    ]
  },
  {
    "levelData": {
      id: "3_33",
      name: "View of Paris from Montmartre",
      imageSrc: "level3/3_33.jpg",
      cutSrc: "level3/cut/3_33.jpg",
      author: "GOGH, Vincent van",
      year: "1886"
    },
    words: [
      {
        audioExample: "files/23_1659_example.mp3",
        textExample: "When I saw the ghost, I was absolutely terrified!",
        textExampleTranslate: "Когда я увидел призрака, я был в ужасе!",
        id: 1659,
        word: "terrified",
        wordTranslate: "ужас"
      },
      {
        audioExample: "files/23_1660_example.mp3",
        textExample: "The wizard made gold fall from the sky",
        textExampleTranslate: "Волшебник заставил золото упасть с неба",
        id: 1660,
        word: "wizard",
        wordTranslate: "мастер"
      },
      {
        audioExample: "files/24_1661_example.mp3",
        textExample: "My friend is going on a summer trip abroad",
        textExampleTranslate: "Мой друг отправляется в летнюю поездку за границу",
        id: 1661,
        word: "abroad",
        wordTranslate: "за рубежом"
      },
      {
        audioExample: "files/24_1662_example.mp3",
        textExample: "The airline has excellent customer service",
        textExampleTranslate: "Авиакомпания имеет отличное обслуживание клиентов",
        id: 1662,
        word: "airline",
        wordTranslate: "авиакомпания"
      },
      {
        audioExample: "files/24_1663_example.mp3",
        textExample: "He was excited to be part of the audience",
        textExampleTranslate: "Он был взволнован, чтобы быть частью аудитории",
        id: 1663,
        word: "audience",
        wordTranslate: "зрительская аудитория"
      },
      {
        audioExample: "files/24_1665_example.mp3",
        textExample: "The lawyers took a brief break",
        textExampleTranslate: "Адвокаты сделали небольшой перерыв",
        id: 1665,
        word: "brief",
        wordTranslate: "краткий"
      },
      {
        audioExample: "files/24_1666_example.mp3",
        textExample: "The currency in China is different from that in Australia",
        textExampleTranslate: "Валюта в Китае отличается от валюты в Австралии",
        id: 1666,
        word: "currency",
        wordTranslate: "валюта"
      },
      {
        audioExample: "files/24_1667_example.mp3",
        textExample: "He saved all the data on his computer",
        textExampleTranslate: "Он сохранил все данные на своем компьютере",
        id: 1667,
        word: "data",
        wordTranslate: "данные"
      },
      {
        audioExample: "files/24_1668_example.mp3",
        textExample: "The airline has fifty domestic flights daily",
        textExampleTranslate: "Авиакомпания ежедневно совершает пятьдесят внутренних рейсов",
        id: 1668,
        word: "domestic",
        wordTranslate: "внутренний"
      },
      {
        audioExample: "files/24_1669_example.mp3",
        textExample: "He was writing his first draft",
        textExampleTranslate: "Он писал свой первый набросок",
        id: 1669,
        word: "draft",
        wordTranslate: "черновой вариант"
      }
    ]
  },
  {
    "levelData": {
      id: "3_34",
      name: "Olive Picking",
      imageSrc: "level3/3_34.jpg",
      cutSrc: "level3/cut/3_34.jpg",
      author: "GOGH, Vincent van",
      year: "1889"
    },
    words: [
      {
        audioExample: "files/24_1670_example.mp3",
        textExample: "We will gather the children before the meeting",
        textExampleTranslate: "Мы соберем детей до встречи",
        id: 1670,
        word: "gather",
        wordTranslate: "собирать"
      },
      {
        audioExample: "files/24_1671_example.mp3",
        textExample: "She liked to paint as a hobby",
        textExampleTranslate: "Она любила рисовать как хобби",
        id: 1671,
        word: "hobby",
        wordTranslate: "хобби"
      },
      {
        audioExample: "files/24_1672_example.mp3",
        textExample: "She was saving her income to buy a house",
        textExampleTranslate: "Она копила деньги на покупку дома",
        id: 1672,
        word: "income",
        wordTranslate: "доход"
      },
      {
        audioExample: "files/24_1673_example.mp3",
        textExample: "Her company owns a private jet",
        textExampleTranslate: "Ее компания владеет частным самолетом",
        id: 1673,
        word: "jet",
        wordTranslate: "струя"
      },
      {
        audioExample: "files/24_1674_example.mp3",
        textExample: "The maximum driving speed here is 80 km/h",
        textExampleTranslate: "Максимальная скорость движения здесь составляет 80 км / ч ",
        id: 1674,
        word: "maximum",
        wordTranslate: "максимум"
      },
      {
        audioExample: "files/24_1675_example.mp3",
        textExample: "Her official degree was being transferred",
        textExampleTranslate: "Ее официальная степень переводилась",
        id: 1675,
        word: "official",
        wordTranslate: "официальный"
      },
      {
        audioExample: "files/24_1676_example.mp3",
        textExample: "His doctor will recommend the best medicine for her cough",
        textExampleTranslate: "Его доктор порекомендует лучшее лекарство от ее кашля",
        id: 1676,
        word: "recommend",
        wordTranslate: "рекомендую"
      },
      {
        audioExample: "files/24_1678_example.mp3",
        textExample: "He lived in a remote village in the Himalayas",
        textExampleTranslate: "Он жил в глухой деревне в Гималаях",
        id: 1678,
        word: "remote",
        wordTranslate: "дистанционный пульт"
      },
      {
        audioExample: "files/25_1681_example.mp3",
        textExample: "The fan helped to circulate cool air through the room",
        textExampleTranslate: "Вентилятор помог распространить прохладный воздух через комнату",
        id: 1681,
        word: "circulate",
        wordTranslate: "циркулировать"
      },
      {
        audioExample: "files/25_1682_example.mp3",
        textExample: "Her consequent rash came after she touched the poisonous plant",
        textExampleTranslate: "Ее последующая сыпь появилась после того, как она коснулась ядовитого растения",
        id: 1682,
        word: "consequent",
        wordTranslate: "последовательный"
      }
    ]
  },
  {
    "levelData": {
      id: "3_35",
      name: "Landscape with Carriage and Train in the Background",
      imageSrc: "level3/3_35.jpg",
      cutSrc: "level3/cut/3_35.jpg",
      author: "GOGH, Vincent van",
      year: "1890"
    },
    words: [
      {
        audioExample: "files/25_1683_example.mp3",
        textExample: "Red’s nickname was derived from the color of her hair",
        textExampleTranslate: "Прозвище Рэд произошло от цвета ее волос",
        id: 1683,
        word: "derive",
        wordTranslate: "вывести"
      },
      {
        audioExample: "files/25_1686_example.mp3",
        textExample: "Only a fraction of the cake was gone",
        textExampleTranslate: "Только часть пирога пропала",
        id: 1686,
        word: "fraction",
        wordTranslate: "доля"
      },
      {
        audioExample: "files/25_1687_example.mp3",
        textExample: "In the morning, the trees were all covered with frost",
        textExampleTranslate: "Утром деревья были покрыты инеем",
        id: 1687,
        word: "frost",
        wordTranslate: "мороз"
      },
      {
        audioExample: "files/25_1688_example.mp3",
        textExample: "Some pictures create an illusion for the eyes",
        textExampleTranslate: "Некоторые картины создают иллюзию для глаз",
        id: 1688,
        word: "illusion",
        wordTranslate: "иллюзия"
      },
      {
        audioExample: "files/25_1691_example.mp3",
        textExample: "A healthy ocean is full of marine animals",
        textExampleTranslate: "Здоровый океан полон морских животных",
        id: 1691,
        word: "marine",
        wordTranslate: "морской"
      },
      {
        audioExample: "files/25_1693_example.mp3",
        textExample: "My country is known for our strong navy",
        textExampleTranslate: "Моя страна известна нашим сильным флотом",
        id: 1693,
        word: "navy",
        wordTranslate: "флот"
      },
      {
        audioExample: "files/25_1695_example.mp3",
        textExample: "The sun’s warm rays covered the beach",
        textExampleTranslate: "Солнечные теплые лучи покрыли пляж",
        id: 1695,
        word: "ray",
        wordTranslate: "луч"
      },
      {
        audioExample: "files/25_1699_example.mp3",
        textExample: "Her underlying fear of flying reduced her traveling options",
        textExampleTranslate: "Ее страх перед полетом уменьшил ее возможности путешествовать",
        id: 1699,
        word: "underlying",
        wordTranslate: "лежащие"
      },
      {
        audioExample: "files/26_1702_example.mp3",
        textExample: "The man stood aside and opened the door for me",
        textExampleTranslate: "Человек стоял в стороне и открыл мне дверь",
        id: 1702,
        word: "aside",
        wordTranslate: "в стороне"
      },
      {
        audioExample: "files/26_1705_example.mp3",
        textExample: "The tree collapsed right in front of our house",
        textExampleTranslate: "Дерево рухнуло прямо перед нашим домом",
        id: 1705,
        word: "collapse",
        wordTranslate: "коллапс"
      }
    ]
  },
  {
    "levelData": {
      id: "3_36",
      name: "Wheat Field under Clouded Sky",
      imageSrc: "level3/3_36.jpg",
      cutSrc: "level3/cut/3_36.jpg",
      author: "GOGH, Vincent van",
      year: "1890"
    },
    words: [
      {
        audioExample: "files/26_1707_example.mp3",
        textExample: "The road curves to the left and to the right",
        textExampleTranslate: "Дорога изгибается влево и вправо",
        id: 1707,
        word: "curve",
        wordTranslate: "кривой"
      },
      {
        audioExample: "files/26_1708_example.mp3",
        textExample: "After running all day, Greg’s feet had a disgusting odor",
        textExampleTranslate: "После бега весь день у ног Грега был отвратительный запах",
        id: 1708,
        word: "disgusting",
        wordTranslate: "отвратительный"
      },
      {
        audioExample: "files/26_1710_example.mp3",
        textExample: "When they saw each other again, the happy couple embraced",
        textExampleTranslate: "Когда они снова увидели друг друга, счастливая пара обнялась",
        id: 1710,
        word: "embrace",
        wordTranslate: "принять"
      },
      {
        audioExample: "files/26_1711_example.mp3",
        textExample: "Sally envied the happy couple",
        textExampleTranslate: "Салли позавидовала счастливая пара",
        id: 1711,
        word: "envy",
        wordTranslate: "зависть"
      },
      {
        audioExample: "files/26_1712_example.mp3",
        textExample: "The display of fireworks was so beautiful",
        textExampleTranslate: "Фейерверк был так прекрасен",
        id: 1712,
        word: "fireworks",
        wordTranslate: "фейерверк"
      },
      {
        audioExample: "files/26_1713_example.mp3",
        textExample: "I wanted to bake a pie, but I needed flour",
        textExampleTranslate: "Я хотел испечь пирог, но мне нужна была мука",
        id: 1713,
        word: "flour",
        wordTranslate: "мука"
      },
      {
        audioExample: "files/26_1715_example.mp3",
        textExample: "Ginger is a common ingredient in many dishes from India",
        textExampleTranslate: "Имбирь является распространенным ингредиентом во многих блюдах из Индии",
        id: 1715,
        word: "ginger",
        wordTranslate: "имбирь"
      },
      {
        audioExample: "files/26_1717_example.mp3",
        textExample: "My son needed some paste for a school project",
        textExampleTranslate: "Моему сыну нужна паста для школьного проекта",
        id: 1717,
        word: "paste",
        wordTranslate: "вставить"
      },
      {
        audioExample: "files/26_1719_example.mp3",
        textExample: "She wiped the dust from the windows",
        textExampleTranslate: "Она вытерла пыль с окон",
        id: 1719,
        word: "wipe",
        wordTranslate: "стереть"
      },
      {
        audioExample: "files/27_1721_example.mp3",
        textExample: "The teacher acknowledged that the young student was hungry",
        textExampleTranslate: "Учитель признал, что молодой студент был голоден",
        id: 1721,
        word: "acknowledge",
        wordTranslate: "признают"
      }
    ]
  },
  {
    "levelData": {
      id: "3_37",
      name: "Wheat Field with Crows",
      imageSrc: "level3/3_37.jpg",
      cutSrc: "level3/cut/3_37.jpg",
      author: "GOGH, Vincent van",
      year: "1890"
    },
    words: [
      {
        audioExample: "files/27_1722_example.mp3",
        textExample: "The ambassador from Korea was in charge of the conference",
        textExampleTranslate: "Посол из Кореи руководил конференцией",
        id: 1722,
        word: "ambassador",
        wordTranslate: "посол"
      },
      {
        audioExample: "files/27_1723_example.mp3",
        textExample: "My cousin is a blonde with blue eyes",
        textExampleTranslate: "Мой двоюродный брат - блондинка с голубыми глазами",
        id: 1723,
        word: "blonde",
        wordTranslate: "блондинка"
      },
      {
        audioExample: "files/27_1724_example.mp3",
        textExample: "The soldiers were trying to conquer the world",
        textExampleTranslate: "Солдаты пытались покорить мир",
        id: 1724,
        word: "conquer",
        wordTranslate: "покорять"
      },
      {
        audioExample: "files/27_1725_example.mp3",
        textExample: "The dog was dragging his owner down the street",
        textExampleTranslate: "Пес тащил своего хозяина по улице",
        id: 1725,
        word: "drag",
        wordTranslate: "тянуть"
      },
      {
        audioExample: "files/27_1726_example.mp3",
        textExample: "Jimmy wasn’t exaggerating about the seriousness of his injury",
        textExampleTranslate: "Джимми не преувеличивал серьезность своей травмы",
        id: 1726,
        word: "exaggerate",
        wordTranslate: "преувеличивать"
      },
      {
        audioExample: "files/27_1728_example.mp3",
        textExample: "The girls insulted each other all afternoon",
        textExampleTranslate: "Девушки оскорбляли друг друга весь день",
        id: 1728,
        word: "insult",
        wordTranslate: "оскорбление"
      },
      {
        audioExample: "files/27_1730_example.mp3",
        textExample: "Joyce received a lovely pearl necklace for her wedding anniversary",
        textExampleTranslate: "Джойс получила прекрасное жемчужное ожерелье на годовщину свадьбы",
        id: 1730,
        word: "necklace",
        wordTranslate: "ожерелье"
      },
      {
        audioExample: "files/27_1732_example.mp3",
        textExample: "In a desert, water can be more precious than money",
        textExampleTranslate: "В пустыне вода может быть дороже денег",
        id: 1732,
        word: "precious",
        wordTranslate: "драгоценный"
      },
      {
        audioExample: "files/27_1733_example.mp3",
        textExample: "The company’s rules against gender prejudice must be enforced",
        textExampleTranslate: "Должны соблюдаться правила компании против гендерных предрассудков",
        id: 1733,
        word: "prejudice",
        wordTranslate: "предубеждение"
      },
      {
        audioExample: "files/27_1734_example.mp3",
        textExample: "Carla was spreading rumors around the office",
        textExampleTranslate: "Карла распространяла слухи по офису",
        id: 1734,
        word: "rumor",
        wordTranslate: "слух"
      }
    ]
  },
  {
    "levelData": {
      id: "3_38",
      name: "The Meadow of San Isidro on his Feast Day",
      imageSrc: "level3/3_38.jpg",
      cutSrc: "level3/cut/3_38.jpg",
      author: "GOYA Y LUCIENTES, Francisco de",
      year: "1788"
    },
    words: [
      {
        audioExample: "files/27_1735_example.mp3",
        textExample: "Taking something that doesn’t belong to you is a sin",
        textExampleTranslate: "Принимать то, что тебе не принадлежит, - грех",
        id: 1735,
        word: "sin",
        wordTranslate: "грех"
      },
      {
        audioExample: "files/27_1736_example.mp3",
        textExample: "Niagara Falls is quite a spectacle",
        textExampleTranslate: "Ниагарский водопад - настоящее зрелище",
        id: 1736,
        word: "spectacle",
        wordTranslate: "зрелище"
      },
      {
        audioExample: "files/27_1738_example.mp3",
        textExample: "Dad was suspicious of the caller on the line",
        textExampleTranslate: "Папа с подозрением относился к абоненту на линии",
        id: 1738,
        word: "suspicious",
        wordTranslate: "подозрительный"
      },
      {
        audioExample: "files/27_1740_example.mp3",
        textExample: "The vase was filled with such lovely flowers",
        textExampleTranslate: "Ваза была наполнена такими прекрасными цветами",
        id: 1740,
        word: "vase",
        wordTranslate: "ваза"
      },
      {
        audioExample: "files/28_1741_example.mp3",
        textExample: "Mindy’s head ached because she bumped it against the wall",
        textExampleTranslate: "Голова Минди болела, потому что она ударилась об стену",
        id: 1741,
        word: "ache",
        wordTranslate: "боль"
      },
      {
        audioExample: "files/28_1742_example.mp3",
        textExample: "It is cold when the arctic winds blow",
        textExampleTranslate: "Холодно, когда дуют арктические ветры",
        id: 1742,
        word: "arctic",
        wordTranslate: "арктический"
      },
      {
        audioExample: "files/28_1743_example.mp3",
        textExample: "The city of Venice, Italy, has many canals",
        textExampleTranslate: "Город Венеция, Италия, имеет много каналов",
        id: 1743,
        word: "canal",
        wordTranslate: "канал"
      },
      {
        audioExample: "files/28_1745_example.mp3",
        textExample: "The chill from the cold wind made Bill shiver",
        textExampleTranslate: "Холод от холодного ветра заставил Билла дрожать",
        id: 1745,
        word: "chill",
        wordTranslate: "простуда"
      },
      {
        audioExample: "files/28_1746_example.mp3",
        textExample: "Congress makes laws for people to follow",
        textExampleTranslate: "Конгресс издает законы, которым люди должны следовать",
        id: 1746,
        word: "congress",
        wordTranslate: "конгресс"
      },
      {
        audioExample: "files/28_1747_example.mp3",
        textExample: "Things like milk and cheese are dairy foods",
        textExampleTranslate: "Такие вещи, как молоко и сыр, являются молочными продуктами",
        id: 1747,
        word: "dairy",
        wordTranslate: "молочный"
      }
    ]
  },
  {
    "levelData": {
      id: "3_39",
      name: "Dune Landscape",
      imageSrc: "level3/3_39.jpg",
      cutSrc: "level3/cut/3_39.jpg",
      author: "GOYEN, Jan van",
      year: "1631"
    },
    words: [
      {
        audioExample: "files/28_1748_example.mp3",
        textExample: "I descended the stairs to get out of the building",
        textExampleTranslate: "Я спустился по лестнице, чтобы выйти из здания",
        id: 1748,
        word: "descend",
        wordTranslate: "спуск"
      },
      {
        audioExample: "files/28_1749_example.mp3",
        textExample: "Our grocer, Mr. Smith, is a very kind man",
        textExampleTranslate: "Наш бакалейщик, мистер Смит, очень добрый человек",
        id: 1749,
        word: "grocer",
        wordTranslate: "бакалейщик"
      },
      {
        audioExample: "files/28_1752_example.mp3",
        textExample: "He jogs every day so he can be healthier",
        textExampleTranslate: "Он бегает трусцой каждый день, чтобы стать здоровее",
        id: 1752,
        word: "jog",
        wordTranslate: "пробежка"
      },
      {
        audioExample: "files/28_1753_example.mp3",
        textExample: "The merchant was selling used cars",
        textExampleTranslate: "Купец продавал подержанные автомобили",
        id: 1753,
        word: "merchant",
        wordTranslate: "коммерсант"
      },
      {
        audioExample: "files/28_1754_example.mp3",
        textExample: "I poked my finger on a thumb tack",
        textExampleTranslate: "Я ткнул пальцем в гвоздь большого пальца",
        id: 1754,
        word: "poke",
        wordTranslate: "тыкать"
      },
      {
        audioExample: "files/28_1755_example.mp3",
        textExample: "They postponed the meeting until Elena arrived",
        textExampleTranslate: "Они отложили встречу до прибытия Елены",
        id: 1755,
        word: "postpone",
        wordTranslate: "отложить"
      },
      {
        audioExample: "files/28_1756_example.mp3",
        textExample: "Some green paint splashed upon the floor",
        textExampleTranslate: "На пол брызнула зеленая краска",
        id: 1756,
        word: "splash",
        wordTranslate: "всплеск"
      },
      {
        audioExample: "files/29_1761_example.mp3",
        textExample: "The bomb will destroy anything that is nearby",
        textExampleTranslate: "Бомба уничтожит все, что находится рядом",
        id: 1761,
        word: "bomb",
        wordTranslate: "бомбить"
      },
      {
        audioExample: "files/29_1762_example.mp3",
        textExample: "I was given a certificate for completing the computer course",
        textExampleTranslate: "Мне дали сертификат на прохождение компьютерного курса",
        id: 1762,
        word: "certificate",
        wordTranslate: "сертификат"
      },
      {
        audioExample: "files/29_1763_example.mp3",
        textExample: "There were many circumstances behind their success, like hard work",
        textExampleTranslate: "За их успехом стояли многие обстоятельства, такие как тяжелая работа",
        id: 1763,
        word: "circumstance",
        wordTranslate: "обстоятельство"
      }
    ]
  },
  {
    "levelData": {
      id: "3_40",
      name: "Haymaking",
      imageSrc: "level3/3_40.jpg",
      cutSrc: "level3/cut/3_40.jpg",
      author: "GOYEN, Jan van",
      year: "1630"
    },
    words: [
      {
        audioExample: "files/29_1766_example.mp3",
        textExample: "She had a lot of criticism about their new plan",
        textExampleTranslate: "У нее было много критики по поводу их нового плана",
        id: 1766,
        word: "criticism",
        wordTranslate: "критика"
      },
      {
        audioExample: "files/29_1767_example.mp3",
        textExample: "The entire wall was devastated",
        textExampleTranslate: "Вся стена была опустошена",
        id: 1767,
        word: "devastate",
        wordTranslate: "сокрушение"
      },
      {
        audioExample: "files/29_1774_example.mp3",
        textExample: "Germs cannot be seen without a microscope",
        textExampleTranslate: "Микробов нельзя увидеть без микроскопа",
        id: 1774,
        word: "microscope",
        wordTranslate: "микроскоп"
      },
      {
        audioExample: "files/29_1775_example.mp3",
        textExample: "Nuclear power plants provide inexpensive energy to cities",
        textExampleTranslate: "Атомные электростанции обеспечивают города недорогой энергией",
        id: 1775,
        word: "nuclear",
        wordTranslate: "ядерный"
      },
      {
        audioExample: "files/29_1777_example.mp3",
        textExample: "An airplane’s propellers rotate quickly to help it fly",
        textExampleTranslate: "Винты самолета быстро вращаются, чтобы помочь ему летать",
        id: 1777,
        word: "rotate",
        wordTranslate: "поворот"
      },
      {
        audioExample: "files/29_1780_example.mp3",
        textExample: "He traced over the graph with his finger",
        textExampleTranslate: "Он провел пальцем по графику",
        id: 1780,
        word: "trace",
        wordTranslate: "след"
      },
      {
        audioExample: "files/30_1782_example.mp3",
        textExample: "Icy roads deter people from driving their cars",
        textExampleTranslate: "Ледяные дороги удерживают людей от вождения их автомобилей",
        id: 1782,
        word: "deter",
        wordTranslate: "сдерживания"
      },
      {
        audioExample: "files/30_1783_example.mp3",
        textExample: "The thieves devised a plan to steal the diamonds",
        textExampleTranslate: "Воры разработали план, чтобы украсть алмазы",
        id: 1783,
        word: "devise",
        wordTranslate: "завещание"
      },
      {
        audioExample: "files/30_1784_example.mp3",
        textExample: "The distance between America and Russia is about 8,000 km",
        textExampleTranslate: "Расстояние между Америкой и Россией составляет около 8000 км ",
        id: 1784,
        word: "distance",
        wordTranslate: "расстояние"
      },
      {
        audioExample: "files/30_1788_example.mp3",
        textExample: "The school decided to implement a new teaching strategy",
        textExampleTranslate: "Школа решила внедрить новую стратегию обучения",
        id: 1788,
        word: "implement",
        wordTranslate: "воплощать в жизнь"
      }
    ]
  },
  {
    "levelData": {
      id: "4_01",
      name: "The Korte Vijverberg at The Hague Seen from the Tournooiveld",
      imageSrc: "level4/4_01.jpg",
      cutSrc: "level4/cut/4_01.jpg",
      author: "FARGUE, Jacob Elias La",
      year: "1761"
    },
    words: [
      {
        audioExample: "files/01_1801_example.mp3",
        textExample: "Political leaders are accountable to the people they represent",
        textExampleTranslate: "Политические лидеры ответственны перед людьми, которых они представляют",
        id: 1801,
        word: "accountable",
        wordTranslate: "подотчетны"
      },
      {
        audioExample: "files/01_1802_example.mp3",
        textExample: "I think this game is very addictive",
        textExampleTranslate: "Я думаю, что эта игра очень затягивает",
        id: 1802,
        word: "addictive",
        wordTranslate: "привыкание"
      },
      {
        audioExample: "files/01_1803_example.mp3",
        textExample: "The man is pushing his questionable agenda on his colleagues",
        textExampleTranslate: "Человек выдвигает свою сомнительную повестку дня на своих коллег",
        id: 1803,
        word: "agenda",
        wordTranslate: "повестка дня"
      },
      {
        audioExample: "files/01_1805_example.mp3",
        textExample: "Scientists believe that brain size might correlate with intelligence",
        textExampleTranslate: "Ученые считают, что размер мозга может коррелировать с интеллектом",
        id: 1805,
        word: "correlate",
        wordTranslate: "коррелят"
      },
      {
        audioExample: "files/01_1806_example.mp3",
        textExample: "Ron decided to get help for his depression",
        textExampleTranslate: "Рон решил получить помощь от депрессии",
        id: 1806,
        word: "depression",
        wordTranslate: "депрессия"
      },
      {
        audioExample: "files/01_1809_example.mp3",
        textExample: "Paul spilled coffee all over his keyboard",
        textExampleTranslate: "Пол разлил кофе по всей клавиатуре",
        id: 1809,
        word: "keyboard",
        wordTranslate: "клавиатура"
      },
      {
        audioExample: "files/01_1810_example.mp3",
        textExample: "Many people join social clubs to escape loneliness",
        textExampleTranslate: "Многие люди вступают в социальные клубы, чтобы избежать одиночества",
        id: 1810,
        word: "loneliness",
        wordTranslate: "одиночество"
      },
      {
        audioExample: "files/01_1813_example.mp3",
        textExample: "The condition of the sidewalk is very poor",
        textExampleTranslate: "Состояние тротуара очень плохое",
        id: 1813,
        word: "poor",
        wordTranslate: "бедных"
      },
      {
        audioExample: "files/01_1818_example.mp3",
        textExample: "Scientists are looking for new drugs to target cancer cells",
        textExampleTranslate: "Ученые ищут новые лекарства для нацеливания на раковые клетки",
        id: 1818,
        word: "target",
        wordTranslate: "мишень"
      },
      {
        audioExample: "files/01_1819_example.mp3",
        textExample: "Lucy likes to think she started this fashion trend",
        textExampleTranslate: "Люси нравится думать, что она начала эту модную тенденцию",
        id: 1819,
        word: "trend",
        wordTranslate: "тренд"
      }
    ]
  },
  {
    "levelData": {
      id: "4_02",
      name: "Ideal Landscape near Rocca Canterana",
      imageSrc: "level4/4_02.jpg",
      cutSrc: "level4/cut/4_02.jpg",
      author: "FOHR, Carl Philipp",
      year: "1818"
    },
    words: [
      {
        audioExample: "files/01_1820_example.mp3",
        textExample: "Winning first prize will validate all of Tony’s hard work",
        textExampleTranslate: "Получение первого приза подтвердит всю тяжелую работу Тони",
        id: 1820,
        word: "validate",
        wordTranslate: "проверка"
      },
      {
        audioExample: "files/02_1821_example.mp3",
        textExample: "Carbon is found in coal",
        textExampleTranslate: "Уголь найден в угле",
        id: 1821,
        word: "carbon",
        wordTranslate: "углерод"
      },
      {
        audioExample: "files/02_1824_example.mp3",
        textExample: "This iron emits steam",
        textExampleTranslate: "Это железо испускает пар",
        id: 1824,
        word: "emit",
        wordTranslate: "испускают"
      },
      {
        audioExample: "files/02_1826_example.mp3",
        textExample: "We grind wheat to make flour",
        textExampleTranslate: "Мы перемалываем пшеницу, чтобы сделать муку",
        id: 1826,
        word: "grind",
        wordTranslate: "шлифовать"
      },
      {
        audioExample: "files/02_1827_example.mp3",
        textExample: "This ointment will help heal your wounds",
        textExampleTranslate: "Эта мазь поможет залечить ваши раны",
        id: 1827,
        word: "heal",
        wordTranslate: "залечить"
      },
      {
        audioExample: "files/02_1828_example.mp3",
        textExample: "More women are being integrated into the military",
        textExampleTranslate: "Больше женщин интегрируется в армию",
        id: 1828,
        word: "integrate",
        wordTranslate: "интегрировать"
      },
      {
        audioExample: "files/02_1829_example.mp3",
        textExample: "Teresa is the leading expert on brain surgery for dogs",
        textExampleTranslate: "Тереза является ведущим специалистом по хирургии головного мозга для собак",
        id: 1829,
        word: "leading",
        wordTranslate: "ведущий"
      },
      {
        audioExample: "files/02_1831_example.mp3",
        textExample: "The students object to raising the tuition",
        textExampleTranslate: "Студенты возражают против повышения платы за обучение",
        id: 1831,
        word: "object",
        wordTranslate: "объект"
      },
      {
        audioExample: "files/02_1832_example.mp3",
        textExample: "A pollutant in the water killed this fish",
        textExampleTranslate: "Загрязнитель в воде убил эту рыбу",
        id: 1832,
        word: "pollutant",
        wordTranslate: "загрязнитель"
      },
      {
        audioExample: "files/02_1833_example.mp3",
        textExample: "Turmeric is a yellow powder used in cooking",
        textExampleTranslate: "Куркума - желтый порошок, используемый в кулинарии",
        id: 1833,
        word: "powder",
        wordTranslate: "порошок"
      }
    ]
  },
  {
    "levelData": {
      id: "4_03",
      name: "Young Woman and a Herdsman in a Landscape",
      imageSrc: "level4/4_03.jpg",
      cutSrc: "level4/cut/4_03.jpg",
      author: "FRAGONARD, Jean-Honore",
      year: "1765"
    },
    words: [
      {
        audioExample: "files/02_1835_example.mp3",
        textExample: "I’m afraid the teacher will reject my new idea",
        textExampleTranslate: "Боюсь, учитель отвергнет мою новую идею",
        id: 1835,
        word: "reject",
        wordTranslate: "отклонить"
      },
      {
        audioExample: "files/02_1837_example.mp3",
        textExample: "Arsenic is a poisonous substance",
        textExampleTranslate: "Мышьяк - ядовитое вещество",
        id: 1837,
        word: "substance",
        wordTranslate: "вещество"
      },
      {
        audioExample: "files/02_1838_example.mp3",
        textExample: "The price of the apartment went up substantially",
        textExampleTranslate: "Цена квартиры существенно выросла",
        id: 1838,
        word: "substantially",
        wordTranslate: "по существу"
      },
      {
        audioExample: "files/02_1839_example.mp3",
        textExample: "This dump truck can carry up to 25 tons",
        textExampleTranslate: "Этот самосвал может перевозить до 25 тонн",
        id: 1839,
        word: "ton",
        wordTranslate: "тонна"
      },
      {
        audioExample: "files/02_1840_example.mp3",
        textExample: "Cargo ships are used for the transport of manufactured goods",
        textExampleTranslate: "Грузовые суда используются для перевозки промышленных товаров",
        id: 1840,
        word: "transport",
        wordTranslate: "транспорт"
      },
      {
        audioExample: "files/03_1841_example.mp3",
        textExample: "The crowd seemed to align themselves with the protestors",
        textExampleTranslate: "Толпа, казалось, присоединилась к протестующим",
        id: 1841,
        word: "align",
        wordTranslate: "выравнивание"
      },
      {
        audioExample: "files/03_1843_example.mp3",
        textExample: "My grandparents keep hay in their red barn",
        textExampleTranslate: "Мои бабушка и дедушка держат сено в своем красном сарае",
        id: 1843,
        word: "barn",
        wordTranslate: "сарай"
      },
      {
        audioExample: "files/03_1844_example.mp3",
        textExample: "The four friends would never betray each other’s trust",
        textExampleTranslate: "Четыре друга никогда бы не предали доверие друг друга",
        id: 1844,
        word: "betray",
        wordTranslate: "предавать"
      },
      {
        audioExample: "files/03_1846_example.mp3",
        textExample: "Rosanne is Catholic, so she goes to church every Sunday",
        textExampleTranslate: "Розанна католичка, поэтому она ходит в церковь каждое воскресенье",
        id: 1846,
        word: "Catholic",
        wordTranslate: "католический"
      },
      {
        audioExample: "files/03_1848_example.mp3",
        textExample: "The police had to detain the thief for shoplifting",
        textExampleTranslate: "Полиции пришлось задержать вора за кражу в магазине",
        id: 1848,
        word: "detain",
        wordTranslate: "задержать"
      }
    ]
  },
  {
    "levelData": {
      id: "4_04",
      name: "View of the Falls at Tivoli",
      imageSrc: "level4/4_04.jpg",
      cutSrc: "level4/cut/4_04.jpg",
      author: "FREY, Johannes Jakob",
      year: "1840s"
    },
    words: [
      {
        audioExample: "files/03_1849_example.mp3",
        textExample: "The green sign shows where the exit is located",
        textExampleTranslate: "Зеленый знак показывает, где находится выход",
        id: 1849,
        word: "exit",
        wordTranslate: "выход"
      },
      {
        audioExample: "files/03_1850_example.mp3",
        textExample: "Holly is an exceptional student",
        textExampleTranslate: "Холли - исключительная ученица",
        id: 1850,
        word: "exceptional",
        wordTranslate: "исключительный"
      },
      {
        audioExample: "files/03_1851_example.mp3",
        textExample: "When a predator approaches a deer, the deer will flee",
        textExampleTranslate: "Когда хищник приближается к оленю, олень убежит",
        id: 1851,
        word: "flee",
        wordTranslate: "бежать"
      },
      {
        audioExample: "files/03_1853_example.mp3",
        textExample: "He was outraged when his proposal was turned down",
        textExampleTranslate: "Он был возмущен, когда его предложение было отклонено",
        id: 1853,
        word: "outrage",
        wordTranslate: "безобразие"
      },
      {
        audioExample: "files/03_1854_example.mp3",
        textExample: "Greg’s parish has grown over the past year",
        textExampleTranslate: "Приход Грега вырос за последний год",
        id: 1854,
        word: "parish",
        wordTranslate: "приход"
      },
      {
        audioExample: "files/03_1855_example.mp3",
        textExample: "Follow the passage down the stairs",
        textExampleTranslate: "Следуйте по проходу вниз по лестнице",
        id: 1855,
        word: "passage",
        wordTranslate: "проход"
      },
      {
        audioExample: "files/03_1856_example.mp3",
        textExample: "The pastor speaks to the members of the church",
        textExampleTranslate: "Пастор говорит с членами церкви",
        id: 1856,
        word: "pastor",
        wordTranslate: "пастор"
      },
      {
        audioExample: "files/03_1857_example.mp3",
        textExample: "The military patrol is responsible for keeping the area safe",
        textExampleTranslate: "Военный патруль несет ответственность за безопасность района",
        id: 1857,
        word: "patrol",
        wordTranslate: "патруль"
      },
      {
        audioExample: "files/03_1860_example.mp3",
        textExample: "The tunnel will lead you to the next city",
        textExampleTranslate: "Туннель приведет вас в следующий город",
        id: 1860,
        word: "tunnel",
        wordTranslate: "туннель"
      },
      {
        audioExample: "files/04_1861_example.mp3",
        textExample: "Will loves his comfortable new sofa",
        textExampleTranslate: "Уилл любит свой новый удобный диван",
        id: 1861,
        word: "comfortable",
        wordTranslate: "комфортно"
      }
    ]
  },
  {
    "levelData": {
      id: "4_05",
      name: "Village Landscape in Morning Light (The Lone Tree)",
      imageSrc: "level4/4_05.jpg",
      cutSrc: "level4/cut/4_05.jpg",
      author: "FRIEDRICH, Caspar David",
      year: "1822"
    },
    words: [
      {
        audioExample: "files/04_1862_example.mp3",
        textExample: "These students are receiving their education at a private school",
        textExampleTranslate: "Эти студенты получают образование в частной школе",
        id: 1862,
        word: "education",
        wordTranslate: "образование"
      },
      {
        audioExample: "files/04_1863_example.mp3",
        textExample: "The mother gives constant encouragement to her son",
        textExampleTranslate: "Мать постоянно поддерживает сына",
        id: 1863,
        word: "encouragement",
        wordTranslate: "поощрение"
      },
      {
        audioExample: "files/04_1864_example.mp3",
        textExample: "The committee will endorse their leader for the upcoming election",
        textExampleTranslate: "Комитет утвердит своего лидера на предстоящих выборах",
        id: 1864,
        word: "endorse",
        wordTranslate: "одобрить"
      },
      {
        audioExample: "files/04_1865_example.mp3",
        textExample: "The apple and orange are equal in weight",
        textExampleTranslate: "Яблоко и апельсин равны по весу",
        id: 1865,
        word: "equal",
        wordTranslate: "равно"
      },
      {
        audioExample: "files/04_1866_example.mp3",
        textExample: "Justin will face many challenges at work",
        textExampleTranslate: "Джастин столкнется со многими проблемами на работе",
        id: 1866,
        word: "face",
        wordTranslate: "лицо"
      },
      {
        audioExample: "files/04_1867_example.mp3",
        textExample: "Jane works in the healthcare field",
        textExampleTranslate: "Джейн работает в сфере здравоохранения",
        id: 1867,
        word: "field",
        wordTranslate: "поле"
      },
      {
        audioExample: "files/04_1869_example.mp3",
        textExample: "Ms. Smith provided valuable guidance to all her students",
        textExampleTranslate: "Г-жа Смит дала ценные советы всем своим ученикам",
        id: 1869,
        word: "guidance",
        wordTranslate: "руководство"
      },
      {
        audioExample: "files/04_1870_example.mp3",
        textExample: "Damian will soon hold a degree in business administration",
        textExampleTranslate: "Дамиан скоро получит степень в области делового администрирования",
        id: 1870,
        word: "hold",
        wordTranslate: "держать"
      },
      {
        audioExample: "files/04_1873_example.mp3",
        textExample: "Scott lost the race by a mere two seconds",
        textExampleTranslate: "Скотт проиграл гонку всего за две секунды",
        id: 1873,
        word: "mere",
        wordTranslate: "всего лишь"
      },
      {
        audioExample: "files/04_1874_example.mp3",
        textExample: "Kyle is interviewing for a marketing position",
        textExampleTranslate: "Кайл проводит собеседование на маркетинговую позицию",
        id: 1874,
        word: "position",
        wordTranslate: "должность"
      }
    ]
  },
  {
    "levelData": {
      id: "4_06",
      name: "Dolmen in the Snow",
      imageSrc: "level4/4_06.jpg",
      cutSrc: "level4/cut/4_06.jpg",
      author: "FRIEDRICH, Caspar David",
      year: "1807"
    },
    words: [
      {
        audioExample: "files/04_1876_example.mp3",
        textExample: "Parents have the responsibility to raise their children with love",
        textExampleTranslate: "Родители обязаны воспитывать своих детей с любовью",
        id: 1876,
        word: "responsibility",
        wordTranslate: "обязанность"
      },
      {
        audioExample: "files/04_1878_example.mp3",
        textExample: "Presentation skills are an important tool for communication",
        textExampleTranslate: "Навыки презентации - важный инструмент для общения",
        id: 1878,
        word: "tool",
        wordTranslate: "орудие труда"
      },
      {
        audioExample: "files/04_1879_example.mp3",
        textExample: "Shawn gets vocal when someone disagrees with his opinions",
        textExampleTranslate: "Шон получает вокал, когда кто-то не согласен с его мнением",
        id: 1879,
        word: "vocal",
        wordTranslate: "вокал"
      },
      {
        audioExample: "files/04_1880_example.mp3",
        textExample: "Diversity is important in the workplace",
        textExampleTranslate: "Разнообразие важно на рабочем месте",
        id: 1880,
        word: "workplace",
        wordTranslate: "рабочее место"
      },
      {
        audioExample: "files/05_1881_example.mp3",
        textExample: "Alex received an award for his academic achievements",
        textExampleTranslate: "Алекс получил награду за свои академические достижения",
        id: 1881,
        word: "academic",
        wordTranslate: "академический"
      },
      {
        audioExample: "files/05_1882_example.mp3",
        textExample: "Mr. Song celebrated his acceptance into the political party",
        textExampleTranslate: "Мистер Сонг отметил свое принятие в политическую партию",
        id: 1882,
        word: "acceptance",
        wordTranslate: "принятие"
      },
      {
        audioExample: "files/05_1883_example.mp3",
        textExample: "The toy cars are available in an array of colors",
        textExampleTranslate: "Игрушечные машины доступны во множестве цветов",
        id: 1883,
        word: "array",
        wordTranslate: "массив"
      },
      {
        audioExample: "files/05_1884_example.mp3",
        textExample: "The photographer can blur the bright lights into the background",
        textExampleTranslate: "Фотограф может размыть яркие огни на заднем плане",
        id: 1884,
        word: "blur",
        wordTranslate: "размытость"
      },
      {
        audioExample: "files/05_1885_example.mp3",
        textExample: "Monica works part-time at a café",
        textExampleTranslate: "Моника работает неполный рабочий день в кафе",
        id: 1885,
        word: "café",
        wordTranslate: "кафе"
      },
      {
        audioExample: "files/05_1886_example.mp3",
        textExample: "The artist paints bright colors on a canvas",
        textExampleTranslate: "Художник рисует яркие краски на холсте",
        id: 1886,
        word: "canvas",
        wordTranslate: "холст"
      }
    ]
  },
  {
    "levelData": {
      id: "4_07",
      name: "The Liris Waterfalls near Isola di Sora",
      imageSrc: "level4/4_07.jpg",
      cutSrc: "level4/cut/4_07.jpg",
      author: "FRIES, Ernst",
      year: "1830"
    },
    words: [
      {
        audioExample: "files/05_1887_example.mp3",
        textExample: "My sister enjoys watching movies at the cinema",
        textExampleTranslate: "Моя сестра любит смотреть фильмы в кино",
        id: 1887,
        word: "cinema",
        wordTranslate: "кинотеатр"
      },
      {
        audioExample: "files/05_1888_example.mp3",
        textExample: "This upper-class family travels on a private jet",
        textExampleTranslate: "Эта семья высшего класса путешествует на частном самолете",
        id: 1888,
        word: "class",
        wordTranslate: "учебный класс"
      },
      {
        audioExample: "files/05_1889_example.mp3",
        textExample: "Olives have a distinctive flavor",
        textExampleTranslate: "Оливки имеют отличительный вкус",
        id: 1889,
        word: "distinctive",
        wordTranslate: "отличительная"
      },
      {
        audioExample: "files/05_1890_example.mp3",
        textExample: "Marco is a key player on the country’s national team",
        textExampleTranslate: "Марко - ключевой игрок сборной страны",
        id: 1890,
        word: "key",
        wordTranslate: "ключ"
      },
      {
        audioExample: "files/05_1893_example.mp3",
        textExample: "Dorothy is painting realistic images of fish",
        textExampleTranslate: "Дороти рисует реалистичные изображения рыб",
        id: 1893,
        word: "realistic",
        wordTranslate: "реалистичный"
      },
      {
        audioExample: "files/05_1894_example.mp3",
        textExample: "The man stared at his reflection in the mirror",
        textExampleTranslate: "Человек уставился на свое отражение в зеркале",
        id: 1894,
        word: "reflection",
        wordTranslate: "отражение"
      },
      {
        audioExample: "files/05_1896_example.mp3",
        textExample: "The artist began with a yellow stroke on his painting",
        textExampleTranslate: "Художник начал с желтого мазка на своей картине",
        id: 1896,
        word: "stroke",
        wordTranslate: "инсульт"
      },
      {
        audioExample: "files/05_1897_example.mp3",
        textExample: "The sunlight shines through the trees",
        textExampleTranslate: "Солнечный свет светит сквозь деревья",
        id: 1897,
        word: "sunlight",
        wordTranslate: "солнечный лучик"
      },
      {
        audioExample: "files/05_1898_example.mp3",
        textExample: "I prefer traditional furniture",
        textExampleTranslate: "Я предпочитаю традиционную мебель",
        id: 1898,
        word: "traditional",
        wordTranslate: "традиционные"
      },
      {
        audioExample: "files/05_1899_example.mp3",
        textExample: "Unlike his older brother, Jim is short",
        textExampleTranslate: "В отличие от своего старшего брата, Джим короткий",
        id: 1899,
        word: "unlike",
        wordTranslate: "в отличие от"
      }
    ]
  },
  {
    "levelData": {
      id: "4_08",
      name: "River Landscape",
      imageSrc: "level4/4_08.jpg",
      cutSrc: "level4/cut/4_08.jpg",
      author: "GAINSBOROUGH, Thomas",
      year: "1770"
    },
    words: [
      {
        audioExample: "files/05_1900_example.mp3",
        textExample: "The man is measuring the width of the box",
        textExampleTranslate: "Человек измеряет ширину коробки",
        id: 1900,
        word: "width",
        wordTranslate: "ширина"
      },
      {
        audioExample: "files/06_1901_example.mp3",
        textExample: "Everyone sings the national anthem before the baseball game starts",
        textExampleTranslate: "Все поют гимн перед началом игры в бейсбол",
        id: 1901,
        word: "anthem",
        wordTranslate: "гимн"
      },
      {
        audioExample: "files/06_1902_example.mp3",
        textExample: "The job is beyond the man’s ability",
        textExampleTranslate: "Работа вне возможностей человека",
        id: 1902,
        word: "beyond",
        wordTranslate: "за"
      },
      {
        audioExample: "files/06_1904_example.mp3",
        textExample: "Heavy fighting continued for days",
        textExampleTranslate: "Тяжелые бои продолжались несколько дней",
        id: 1904,
        word: "fighting",
        wordTranslate: "борьба"
      },
      {
        audioExample: "files/06_1905_example.mp3",
        textExample: "Mike and Joanna are joint owners of a coffee shop",
        textExampleTranslate: "Майк и Джоанна являются совладельцами кафе",
        id: 1905,
        word: "joint",
        wordTranslate: "совместное"
      },
      {
        audioExample: "files/06_1908_example.mp3",
        textExample: "Thousands of soldiers were ready to mobilize for the fight",
        textExampleTranslate: "Тысячи солдат были готовы мобилизоваться для борьбы",
        id: 1908,
        word: "mobilize",
        wordTranslate: "мобилизация"
      },
      {
        audioExample: "files/06_1909_example.mp3",
        textExample: "India is a nation that is developing rapidly",
        textExampleTranslate: "Индия - это страна, которая быстро развивается",
        id: 1909,
        word: "nation",
        wordTranslate: "нация"
      },
      {
        audioExample: "files/06_1910_example.mp3",
        textExample: "This building was originally a bank",
        textExampleTranslate: "Это здание изначально было банком",
        id: 1910,
        word: "originally",
        wordTranslate: "первоначально"
      },
      {
        audioExample: "files/06_1911_example.mp3",
        textExample: "The scientists prepared for an outbreak of a dangerous virus",
        textExampleTranslate: "Ученые подготовились к вспышке опасного вируса",
        id: 1911,
        word: "outbreak",
        wordTranslate: "вспышка"
      },
      {
        audioExample: "files/06_1912_example.mp3",
        textExample: "The girl likes to pray for world peace",
        textExampleTranslate: "Девушка любит молиться за мир во всем мире",
        id: 1912,
        word: "pray",
        wordTranslate: "молись"
      }
    ]
  },
  {
    "levelData": {
      id: "4_09",
      name: "Marine View (Seascape with Porpoises)",
      imageSrc: "level4/4_09.jpg",
      cutSrc: "level4/cut/4_09.jpg",
      author: "MANET, Edouard",
      year: "1864"
    },
    words: [
      {
        audioExample: "files/06_1913_example.mp3",
        textExample: "He has been a prisoner for many years",
        textExampleTranslate: "Он был в плену много лет",
        id: 1913,
        word: "prisoner",
        wordTranslate: "заключенный"
      },
      {
        audioExample: "files/06_1914_example.mp3",
        textExample: "Karen has had to sacrifice a lot for her children",
        textExampleTranslate: "Карен пришлось многим пожертвовать ради своих детей",
        id: 1914,
        word: "sacrifice",
        wordTranslate: "приносить в жертву"
      },
      {
        audioExample: "files/06_1915_example.mp3",
        textExample: "I can only sleep in complete silence",
        textExampleTranslate: "Я могу спать только в полной тишине",
        id: 1915,
        word: "silence",
        wordTranslate: "молчание"
      },
      {
        audioExample: "files/06_1918_example.mp3",
        textExample: "The man was thrilled with his victory",
        textExampleTranslate: "Человек был в восторге от его победы",
        id: 1918,
        word: "victory",
        wordTranslate: "победа"
      },
      {
        audioExample: "files/06_1919_example.mp3",
        textExample: "Dandelions grow wild in the cracks of the streets",
        textExampleTranslate: "Одуванчики растут дико в трещинах улиц",
        id: 1919,
        word: "wild",
        wordTranslate: "дикий"
      },
      {
        audioExample: "files/07_1922_example.mp3",
        textExample: "This is Ben’s second attempt to climb Mt. Everest",
        textExampleTranslate: "Это вторая попытка Бена подняться на Эверест",
        id: 1922,
        word: "attempt",
        wordTranslate: "попытка"
      },
      {
        audioExample: "files/07_1924_example.mp3",
        textExample: "The rain will cease in the afternoon",
        textExampleTranslate: "Дождь прекратится днем",
        id: 1924,
        word: "cease",
        wordTranslate: "прекратить"
      },
      {
        audioExample: "files/07_1925_example.mp3",
        textExample: "Smoking cigarettes is a danger to health",
        textExampleTranslate: "Курение сигарет - это опасность для здоровья",
        id: 1925,
        word: "danger",
        wordTranslate: "опасность"
      },
      {
        audioExample: "files/07_1926_example.mp3",
        textExample: "The tsunami had devastating effects on the seaside village",
        textExampleTranslate: "Цунами оказало разрушительное воздействие на приморскую деревню",
        id: 1926,
        word: "devastating",
        wordTranslate: "разрушительный"
      },
      {
        audioExample: "files/07_1928_example.mp3",
        textExample: "The earthquake caused the road to crack in multiple places",
        textExampleTranslate: "Землетрясение вызвало трещину в нескольких местах",
        id: 1928,
        word: "earthquake",
        wordTranslate: "землетрясение"
      }
    ]
  },
  {
    "levelData": {
      id: "4_10",
      name: "Country House in Rueil",
      imageSrc: "level4/4_10.jpg",
      cutSrc: "level4/cut/4_10.jpg",
      author: "MANET, Edouard",
      year: "1882"
    },
    words: [
      {
        audioExample: "files/07_1929_example.mp3",
        textExample: "The whooping crane is an endangered species",
        textExampleTranslate: "Американский журавль является исчезающим видом",
        id: 1929,
        word: "endangered",
        wordTranslate: "находящихся под угрозой исчезновения"
      },
      {
        audioExample: "files/07_1930_example.mp3",
        textExample: "The extinction of the dodo bird occurred in the 1600s",
        textExampleTranslate: "Вымирание птицы додо произошло в 1600-х годах",
        id: 1930,
        word: "extinction",
        wordTranslate: "вымирание"
      },
      {
        audioExample: "files/07_1931_example.mp3",
        textExample: "Michelle and Tanya want to be best friends forever",
        textExampleTranslate: "Мишель и Таня хотят быть лучшими друзьями навсегда",
        id: 1931,
        word: "forever",
        wordTranslate: "навсегда"
      },
      {
        audioExample: "files/07_1934_example.mp3",
        textExample: "The ship was hit by a violent storm",
        textExampleTranslate: "Корабль был поражен сильным штормом",
        id: 1934,
        word: "hit",
        wordTranslate: "ударил"
      },
      {
        audioExample: "files/07_1935_example.mp3",
        textExample: "The family never thought they’d lose everything to fire",
        textExampleTranslate: "Семья никогда не думала, что потеряет все из-за огня",
        id: 1935,
        word: "lose",
        wordTranslate: "потерять"
      },
      {
        audioExample: "files/07_1936_example.mp3",
        textExample: "Carlos is a hero in his native country of Brazil",
        textExampleTranslate: "Карлос герой в своей родной стране Бразилии",
        id: 1936,
        word: "native",
        wordTranslate: "родной"
      },
      {
        audioExample: "files/07_1939_example.mp3",
        textExample: "My supervisor made a reference to the data I’d collected",
        textExampleTranslate: "Мой руководитель сделал ссылку на данные, которые я собрал",
        id: 1939,
        word: "reference",
        wordTranslate: "ссылка"
      },
      {
        audioExample: "files/07_1940_example.mp3",
        textExample: "It is common to see tall buildings in urban areas",
        textExampleTranslate: "В городских районах часто можно увидеть высокие здания",
        id: 1940,
        word: "urban",
        wordTranslate: "городской"
      },
      {
        audioExample: "files/08_1943_example.mp3",
        textExample: "A coconut produces a healthy oil",
        textExampleTranslate: "Кокос производит здоровое масло",
        id: 1943,
        word: "coconut",
        wordTranslate: "кокос"
      },
      {
        audioExample: "files/08_1944_example.mp3",
        textExample: "The doctor diagnosed the patient with epilepsy",
        textExampleTranslate: "Врач поставил диагноз пациенту с эпилепсией",
        id: 1944,
        word: "epilepsy",
        wordTranslate: "эпилепсия"
      }
    ]
  },
  {
    "levelData": {
      id: "4_11",
      name: "The Rialto Bridge from the Riva del Vin",
      imageSrc: "level4/4_11.jpg",
      cutSrc: "level4/cut/4_11.jpg",
      author: "MARIESCHI, Michele",
      year: "1740s"
    },
    words: [
      {
        audioExample: "files/08_1945_example.mp3",
        textExample: "The fat contained in salmon, avocados, and nuts is healthy",
        textExampleTranslate: "Жир, содержащийся в лососе, авокадо и орехах, полезен для здоровья",
        id: 1945,
        word: "fat",
        wordTranslate: "жир"
      },
      {
        audioExample: "files/08_1946_example.mp3",
        textExample: "Winning the award will help Steven gain confidence",
        textExampleTranslate: "Получение награды поможет Стивену обрести уверенность",
        id: 1946,
        word: "gain",
        wordTranslate: "усиление"
      },
      {
        audioExample: "files/08_1947_example.mp3",
        textExample: "People with diabetes need to check their glucose levels",
        textExampleTranslate: "Люди с диабетом должны проверять уровень глюкозы в крови",
        id: 1947,
        word: "glucose",
        wordTranslate: "глюкоза"
      },
      {
        audioExample: "files/08_1948_example.mp3",
        textExample: "The thermometer shows a high body temperature",
        textExampleTranslate: "Термометр показывает высокую температуру тела",
        id: 1948,
        word: "high",
        wordTranslate: "высокая"
      },
      {
        audioExample: "files/08_1950_example.mp3",
        textExample: "Bob is known throughout the neighborhood as a burglars",
        textExampleTranslate: "Боб известен во всем районе как грабители",
        id: 1950,
        word: "known",
        wordTranslate: "известный"
      },
      {
        audioExample: "files/08_1951_example.mp3",
        textExample: "The professor showed us what the human liver looks like",
        textExampleTranslate: "Профессор показал нам, как выглядит человеческая печень",
        id: 1951,
        word: "liver",
        wordTranslate: "печень"
      },
      {
        audioExample: "files/08_1952_example.mp3",
        textExample: "The temperature gets very low in the winter",
        textExampleTranslate: "Температура зимой очень низкая",
        id: 1952,
        word: "low",
        wordTranslate: "низкий"
      },
      {
        audioExample: "files/08_1953_example.mp3",
        textExample: "Practicing yoga is good for stress management",
        textExampleTranslate: "Практика йоги полезна для управления стрессом",
        id: 1953,
        word: "management",
        wordTranslate: "управление"
      },
      {
        audioExample: "files/08_1954_example.mp3",
        textExample: "Fish have a very high metabolic rate",
        textExampleTranslate: "У рыб очень высокий уровень метаболизма",
        id: 1954,
        word: "metabolic",
        wordTranslate: "метаболический"
      },
      {
        audioExample: "files/08_1956_example.mp3",
        textExample: "I prepared a bowl of olives for my guests",
        textExampleTranslate: "Я приготовил миску оливок для моих гостей",
        id: 1956,
        word: "olive",
        wordTranslate: "оливковый"
      }
    ]
  },
  {
    "levelData": {
      id: "4_12",
      name: "Santa Maria della Salute, Venice",
      imageSrc: "level4/4_12.jpg",
      cutSrc: "level4/cut/4_12.jpg",
      author: "MARIESCHI, Michele",
      year: "1740"
    },
    words: [
      {
        audioExample: "files/08_1957_example.mp3",
        textExample: "Liam’s performance in the race was not his best",
        textExampleTranslate: "Выступление Лиама в гонке было не лучшим",
        id: 1957,
        word: "performance",
        wordTranslate: "представление"
      },
      {
        audioExample: "files/08_1958_example.mp3",
        textExample: "This perfume has a powerful scent",
        textExampleTranslate: "Этот парфюм обладает сильным ароматом",
        id: 1958,
        word: "powerful",
        wordTranslate: "мощный"
      },
      {
        audioExample: "files/08_1959_example.mp3",
        textExample: "Pasta is high in starch",
        textExampleTranslate: "Макароны с высоким содержанием крахмала",
        id: 1959,
        word: "starch",
        wordTranslate: "крахмал"
      },
      {
        audioExample: "files/08_1960_example.mp3",
        textExample: "Cindy concluded the meeting with a summary of the project",
        textExampleTranslate: "Синди завершила встречу с кратким изложением проекта",
        id: 1960,
        word: "summary",
        wordTranslate: "резюме"
      },
      {
        audioExample: "files/09_1962_example.mp3",
        textExample: "He was very familiar with the local area",
        textExampleTranslate: "Он был очень хорошо знаком с местностью",
        id: 1962,
        word: "area",
        wordTranslate: "площадь"
      },
      {
        audioExample: "files/09_1964_example.mp3",
        textExample: "After her physical examination, her cognitive skills were tested",
        textExampleTranslate: "После ее физического обследования ее когнитивные способности были проверены",
        id: 1964,
        word: "cognitive",
        wordTranslate: "познавательный"
      },
      {
        audioExample: "files/09_1965_example.mp3",
        textExample: "The collision between the two cars created a loud noise",
        textExampleTranslate: "Столкновение двух машин вызвало громкий шум",
        id: 1965,
        word: "collision",
        wordTranslate: "столкновение"
      },
      {
        audioExample: "files/09_1966_example.mp3",
        textExample: "Competent employees are much better than unknowledgeable ones",
        textExampleTranslate: "Компетентные сотрудники намного лучше, чем непознаваемые",
        id: 1966,
        word: "competent",
        wordTranslate: "компетентный"
      },
      {
        audioExample: "files/09_1967_example.mp3",
        textExample: "After four years of college, Mary finally had a diploma",
        textExampleTranslate: "После четырех лет колледжа Мэри наконец получила диплом",
        id: 1967,
        word: "diploma",
        wordTranslate: "диплом"
      },
      {
        audioExample: "files/09_1968_example.mp3",
        textExample: "Jenny excels at playing the piano",
        textExampleTranslate: "Дженни отлично играет на пианино",
        id: 1968,
        word: "excel",
        wordTranslate: "превосходно"
      }
    ]
  },
  {
    "levelData": {
      id: "4_13",
      name: "Landscape with Charcoal Burners",
      imageSrc: "level4/4_13.jpg",
      cutSrc: "level4/cut/4_13.jpg",
      author: "MARKÓ, András",
      year: "1861"
    },
    words: [
      {
        audioExample: "files/09_1970_example.mp3",
        textExample: "She is an integral member of our team",
        textExampleTranslate: "Она является неотъемлемым членом нашей команды",
        id: 1970,
        word: "integral",
        wordTranslate: "интеграл"
      },
      {
        audioExample: "files/09_1972_example.mp3",
        textExample: "He now has a high-paying job",
        textExampleTranslate: "У него сейчас высокооплачиваемая работа",
        id: 1972,
        word: "job",
        wordTranslate: "работа"
      },
      {
        audioExample: "files/09_1973_example.mp3",
        textExample: "Only a keen student could have solved that math problem",
        textExampleTranslate: "Только увлеченный ученик мог решить эту математическую задачу",
        id: 1973,
        word: "keen",
        wordTranslate: "острый"
      },
      {
        audioExample: "files/09_1974_example.mp3",
        textExample: "What is the minimum temperature in winter in this area?",
        textExampleTranslate: "Какая минимальная температура зимой в этом районе?",
        id: 1974,
        word: "minimum",
        wordTranslate: "минимум"
      },
      {
        audioExample: "files/09_1975_example.mp3",
        textExample: "The psychology of seeing is a fascinating subject",
        textExampleTranslate: "Психология видения - захватывающий предмет",
        id: 1975,
        word: "psychology",
        wordTranslate: "психология"
      },
      {
        audioExample: "files/09_1976_example.mp3",
        textExample: "Radioactive states can be very bad for anyone’s health",
        textExampleTranslate: "Радиоактивные состояния могут быть очень вредны для здоровья любого человека",
        id: 1976,
        word: "radioactive",
        wordTranslate: "радиоактивный"
      },
      {
        audioExample: "files/09_1980_example.mp3",
        textExample: "She is still weak after the illness",
        textExampleTranslate: "Она все еще слаба после болезни",
        id: 1980,
        word: "weak",
        wordTranslate: "слабый"
      },
      {
        audioExample: "files/10_1984_example.mp3",
        textExample: "When the bank automated, it started installing ATM machines",
        textExampleTranslate: "Когда банк автоматизировался, он начал устанавливать банкоматы",
        id: 1984,
        word: "automate",
        wordTranslate: "автоматизировать"
      },
      {
        audioExample: "files/10_1990_example.mp3",
        textExample: "Power lines are important parts of a city’s infrastructure",
        textExampleTranslate: "Линии электропередачи являются важной частью городской инфраструктуры",
        id: 1990,
        word: "infrastructure",
        wordTranslate: "инфраструктура"
      },
      {
        audioExample: "files/10_1994_example.mp3",
        textExample: "The store added more merchandise because there were more shoppers",
        textExampleTranslate: "Магазин добавил больше товаров, потому что было больше покупателей",
        id: 1994,
        word: "merchandise",
        wordTranslate: "товар"
      }
    ]
  },
  {
    "levelData": {
      id: "4_14",
      name: "Italian Landscape with Viaduct and Rainbow",
      imageSrc: "level4/4_14.jpg",
      cutSrc: "level4/cut/4_14.jpg",
      author: "MARKÓ, Károly the Elder",
      year: "1838"
    },
    words: [
      {
        audioExample: "files/10_1996_example.mp3",
        textExample: "The new products really increased the business’s monthly revenue",
        textExampleTranslate: "Новые продукты действительно увеличили ежемесячный доход бизнеса",
        id: 1996,
        word: "revenue",
        wordTranslate: "доходы"
      },
      {
        audioExample: "files/11_2006_example.mp3",
        textExample: "This strawberry is the best I’ve ever had. It’s fabulous",
        textExampleTranslate: "Эта клубника - лучшее, что я когда-либо пробовал. Это невероятно",
        id: 2006,
        word: "fabulous",
        wordTranslate: "сказочные"
      },
      {
        audioExample: "files/12_2022_example.mp3",
        textExample: "The problem was only made worse by Mark’s aggression",
        textExampleTranslate: "Проблема только усугубилась агрессией Марка",
        id: 2022,
        word: "aggression",
        wordTranslate: "агрессия"
      },
      {
        audioExample: "files/12_2023_example.mp3",
        textExample: "We read a biography about Charles Darwin in science class",
        textExampleTranslate: "Мы читаем биографию Чарльза Дарвина на уроке науки",
        id: 2023,
        word: "biography",
        wordTranslate: "биография"
      },
      {
        audioExample: "files/12_2024_example.mp3",
        textExample: "Lowering prices boosts customers’ interest in shopping",
        textExampleTranslate: "Снижение цен повышает интерес покупателей к покупкам",
        id: 2024,
        word: "boost",
        wordTranslate: "увеличение"
      },
      {
        audioExample: "files/12_2026_example.mp3",
        textExample: "Beethoven is a composer of classical music",
        textExampleTranslate: "Бетховен - композитор классической музыки",
        id: 2026,
        word: "classical",
        wordTranslate: "классический"
      },
      {
        audioExample: "files/12_2027_example.mp3",
        textExample: "Traffic signs compel drivers to drive safely",
        textExampleTranslate: "Дорожные знаки заставляют водителей безопасно ездить",
        id: 2027,
        word: "compel",
        wordTranslate: "принуждать"
      },
      {
        audioExample: "files/12_2028_example.mp3",
        textExample: "We saw the creation of a new political party",
        textExampleTranslate: "Мы увидели создание новой политической партии",
        id: 2028,
        word: "creation",
        wordTranslate: "создание"
      },
      {
        audioExample: "files/12_2034_example.mp3",
        textExample: "When the stunt went wrong, the man suffered multiple injuries",
        textExampleTranslate: "Когда трюк пошел не так, человек получил множественные травмы",
        id: 2034,
        word: "multiple",
        wordTranslate: "несколько"
      },
      {
        audioExample: "files/12_2036_example.mp3",
        textExample: "This area of town is notorious for gang activity",
        textExampleTranslate: "Этот район города известен своей бандитской активностью",
        id: 2036,
        word: "notorious",
        wordTranslate: "печально известный"
      }
    ]
  },
  {
    "levelData": {
      id: "4_15",
      name: "In the Vicinity of Pisa",
      imageSrc: "level4/4_15.jpg",
      cutSrc: "level4/cut/4_15.jpg",
      author: "MARKÓ, Károly the Younger",
      year: "1878"
    },
    words: [
      {
        audioExample: "files/12_2037_example.mp3",
        textExample: "Overall, the party was a huge success",
        textExampleTranslate: "В целом, вечеринка имела огромный успех",
        id: 2037,
        word: "overall",
        wordTranslate: "в целом"
      },
      {
        audioExample: "files/12_2040_example.mp3",
        textExample: "My best virtue is forgiveness",
        textExampleTranslate: "Моя лучшая добродетель - прощение",
        id: 2040,
        word: "virtue",
        wordTranslate: "добродетель"
      },
      {
        audioExample: "files/13_2041_example.mp3",
        textExample: "I thought about the different aspects of owning two dogs",
        textExampleTranslate: "Я думал о разных аспектах владения двумя собаками",
        id: 2041,
        word: "aspect",
        wordTranslate: "аспект"
      },
      {
        audioExample: "files/13_2044_example.mp3",
        textExample: "She has little awareness of what needs to be done",
        textExampleTranslate: "Она мало осведомлена о том, что нужно сделать",
        id: 2044,
        word: "awareness",
        wordTranslate: "осознание"
      },
      {
        audioExample: "files/13_2045_example.mp3",
        textExample: "Two weeks after planting the seed, a small bud appeared",
        textExampleTranslate: "Через две недели после посадки семян появился маленький бутон",
        id: 2045,
        word: "bud",
        wordTranslate: "бутон"
      },
      {
        audioExample: "files/13_2049_example.mp3",
        textExample: "After the flood, several humanitarian organizations offered help",
        textExampleTranslate: "После потопа несколько гуманитарных организаций предложили помощь",
        id: 2049,
        word: "humanitarian",
        wordTranslate: "гуманитарный"
      },
      {
        audioExample: "files/13_2054_example.mp3",
        textExample: "He stored his tools on a rack",
        textExampleTranslate: "Он хранил свои инструменты на стойке",
        id: 2054,
        word: "rack",
        wordTranslate: "стойка"
      },
      {
        audioExample: "files/13_2055_example.mp3",
        textExample: "Leonardo da Vinci was a popular artist of the Renaissance",
        textExampleTranslate: "Леонардо да Винчи был популярным художником эпохи Возрождения",
        id: 2055,
        word: "Renaissance",
        wordTranslate: "эпоха Возрождения"
      },
      {
        audioExample: "files/13_2057_example.mp3",
        textExample: "The poster didn’t specify where the concert was taking place",
        textExampleTranslate: "На плакате не было указано, где проходил концерт",
        id: 2057,
        word: "specify",
        wordTranslate: "уточнить"
      },
      {
        audioExample: "files/13_2058_example.mp3",
        textExample: "The dog is used to being tied up",
        textExampleTranslate: "Собака привыкла быть привязанной",
        id: 2058,
        word: "tie",
        wordTranslate: "галстук"
      }
    ]
  },
  {
    "levelData": {
      id: "4_16",
      name: "Ile de Bréhat",
      imageSrc: "level4/4_16.jpg",
      cutSrc: "level4/cut/4_16.jpg",
      author: "MAUFRA, Maxime",
      year: "1892"
    },
    words: [
      {
        audioExample: "files/13_2060_example.mp3",
        textExample: "The candles are made of wax",
        textExampleTranslate: "Свечи сделаны из воска",
        id: 2060,
        word: "wax",
        wordTranslate: "воск"
      },
      {
        audioExample: "files/14_2062_example.mp3",
        textExample: "They found archeological evidence of an ancient species of man",
        textExampleTranslate: "Они нашли археологические свидетельства древнего вида человека",
        id: 2062,
        word: "archeological",
        wordTranslate: "археологический"
      },
      {
        audioExample: "files/14_2063_example.mp3",
        textExample: "He studied archeology to learn more about ancient Egyptian culture",
        textExampleTranslate: "Он изучал археологию, чтобы узнать больше о древнеегипетской культуре",
        id: 2063,
        word: "archeology",
        wordTranslate: "археология"
      },
      {
        audioExample: "files/14_2065_example.mp3",
        textExample: "His budget for food was very tight",
        textExampleTranslate: "Его бюджет на еду был очень ограничен",
        id: 2065,
        word: "budget",
        wordTranslate: "бюджет"
      },
      {
        audioExample: "files/14_2068_example.mp3",
        textExample: "The boy’s story didn’t correspond with his mother’s version",
        textExampleTranslate: "История мальчика не соответствовала версии его матери",
        id: 2068,
        word: "correspond",
        wordTranslate: "соответствовать"
      },
      {
        audioExample: "files/14_2070_example.mp3",
        textExample: "He lived on his father’s estate in the country",
        textExampleTranslate: "Он жил в поместье своего отца в деревне",
        id: 2070,
        word: "estate",
        wordTranslate: "недвижимость"
      },
      {
        audioExample: "files/14_2071_example.mp3",
        textExample: "Experts say that credit card fraud increases around the holidays",
        textExampleTranslate: "Эксперты говорят, что мошенничество с кредитными картами увеличивается в праздничные дни",
        id: 2071,
        word: "fraud",
        wordTranslate: "мошенничество"
      },
      {
        audioExample: "files/14_2073_example.mp3",
        textExample: "The principal had a lot of integrity",
        textExampleTranslate: "У директора было много честности",
        id: 2073,
        word: "integrity",
        wordTranslate: "целостность"
      },
      {
        audioExample: "files/14_2077_example.mp3",
        textExample: "He was a proponent of using environmentally-friendly products",
        textExampleTranslate: "Он был сторонником использования экологически чистых продуктов",
        id: 2077,
        word: "proponent",
        wordTranslate: "инициатор"
      },
      {
        audioExample: "files/14_2079_example.mp3",
        textExample: "The club restricted the amount of members",
        textExampleTranslate: "Клуб ограничил количество членов",
        id: 2079,
        word: "restrict",
        wordTranslate: "ограничить"
      }
    ]
  },
  {
    "levelData": {
      id: "4_17",
      name: "Kilchurn Castle, Loch Awe",
      imageSrc: "level4/4_17.jpg",
      cutSrc: "level4/cut/4_17.jpg",
      author: "MCCULLOCH, Horatio",
      year: "1854"
    },
    words: [
      {
        audioExample: "files/14_2080_example.mp3",
        textExample: "The All Blacks are my favorite sports team",
        textExampleTranslate: "Все черные - моя любимая спортивная команда",
        id: 2080,
        word: "team",
        wordTranslate: "команда"
      },
      {
        audioExample: "files/15_2081_example.mp3",
        textExample: "The company totaled its aggregate sales for the entire year",
        textExampleTranslate: "Компания подвела итоги продаж за весь год",
        id: 2081,
        word: "aggregate",
        wordTranslate: "агрегат"
      },
      {
        audioExample: "files/15_2084_example.mp3",
        textExample: "The wool scarf complemented her lovely eyes",
        textExampleTranslate: "Шерстяной шарф дополнял ее прекрасные глаза",
        id: 2084,
        word: "complement",
        wordTranslate: "дополнить"
      },
      {
        audioExample: "files/15_2085_example.mp3",
        textExample: "I compressed my clothes to fit into a single suitcase",
        textExampleTranslate: "Я сжал свою одежду, чтобы поместиться в один чемодан",
        id: 2085,
        word: "compress",
        wordTranslate: "компресс"
      },
      {
        audioExample: "files/15_2087_example.mp3",
        textExample: "I worked the equivalent of sixty hours this week",
        textExampleTranslate: "Я работал эквивалент шестьдесят часов на этой неделе",
        id: 2087,
        word: "equivalent",
        wordTranslate: "эквивалент"
      },
      {
        audioExample: "files/15_2089_example.mp3",
        textExample: "Type the input into the computer program",
        textExampleTranslate: "Введите ввод в компьютерную программу",
        id: 2089,
        word: "input",
        wordTranslate: "вход"
      },
      {
        audioExample: "files/15_2090_example.mp3",
        textExample: "I only tell my secrets to my most intimate friends",
        textExampleTranslate: "Я делюсь своими секретами только с самыми близкими друзьями",
        id: 2090,
        word: "intimate",
        wordTranslate: "намекнуть"
      },
      {
        audioExample: "files/15_2092_example.mp3",
        textExample: "If you exercise every day, your metabolism speeds up",
        textExampleTranslate: "Если вы тренируетесь каждый день, ваш метаболизм ускоряется",
        id: 2092,
        word: "metabolism",
        wordTranslate: "метаболизм"
      },
      {
        audioExample: "files/15_2097_example.mp3",
        textExample: "The physics student studied quantum mechanics",
        textExampleTranslate: "Студент-физик изучал квантовую механику",
        id: 2097,
        word: "quantum",
        wordTranslate: "квант"
      },
      {
        audioExample: "files/15_2098_example.mp3",
        textExample: "The boy-to-girl ratio is one to three",
        textExampleTranslate: "Соотношение мальчиков и девочек составляет один к трем",
        id: 2098,
        word: "ratio",
        wordTranslate: "отношение"
      }
    ]
  },
  {
    "levelData": {
      id: "4_18",
      name: "Under the Cross",
      imageSrc: "level4/4_18.jpg",
      cutSrc: "level4/cut/4_18.jpg",
      author: "MEDNYÁNSZKY, László",
      year: "1892"
    },
    words: [
      {
        audioExample: "files/15_2099_example.mp3",
        textExample: "A strand of DNA looks like two interlocking spirals",
        textExampleTranslate: "Нить ДНК выглядит как две взаимосвязанные спирали",
        id: 2099,
        word: "spiral",
        wordTranslate: "спираль"
      },
      {
        audioExample: "files/16_2104_example.mp3",
        textExample: "Researchers at the biotechnology company use bacteria to make medicine",
        textExampleTranslate: "Исследователи в биотехнологической компании используют бактерии для производства лекарств",
        id: 2104,
        word: "biotechnology",
        wordTranslate: "биотехнология"
      },
      {
        audioExample: "files/16_2106_example.mp3",
        textExample: "The companies formed a coalition to make trade less expensive",
        textExampleTranslate: "Компании создали коалицию, чтобы сделать торговлю менее дорогой",
        id: 2106,
        word: "coalition",
        wordTranslate: "коалиция"
      },
      {
        audioExample: "files/16_2110_example.mp3",
        textExample: "Canyons are formed because rivers of fast-moving water caused erosion",
        textExampleTranslate: "Каньоны образовались из-за того, что реки быстро движущейся воды вызвали эрозию",
        id: 2110,
        word: "erosion",
        wordTranslate: "эрозия"
      },
      {
        audioExample: "files/16_2114_example.mp3",
        textExample: "My father’s company manufactures steel building materials",
        textExampleTranslate: "Компания моего отца производит стальные строительные материалы",
        id: 2114,
        word: "manufacture",
        wordTranslate: "производство"
      },
      {
        audioExample: "files/16_2117_example.mp3",
        textExample: "Bees use nectar to make their honey",
        textExampleTranslate: "Пчелы используют нектар для приготовления своего меда",
        id: 2117,
        word: "nectar",
        wordTranslate: "нектар"
      },
      {
        audioExample: "files/16_2120_example.mp3",
        textExample: "The teacher’s grading system was straightforward and fair",
        textExampleTranslate: "Система оценок учителя была простой и честной",
        id: 2120,
        word: "straightforward",
        wordTranslate: "простой"
      },
      {
        audioExample: "files/17_2121_example.mp3",
        textExample: "The store had few customers and soon went bankrupt",
        textExampleTranslate: "У магазина было мало покупателей, и вскоре он обанкротился",
        id: 2121,
        word: "bankrupt",
        wordTranslate: "банкрот"
      },
      {
        audioExample: "files/17_2123_example.mp3",
        textExample: "The bookstore employed two full-time clerks",
        textExampleTranslate: "В книжном магазине работали два штатных клерка",
        id: 2123,
        word: "employ",
        wordTranslate: "нанимают"
      },
      {
        audioExample: "files/17_2127_example.mp3",
        textExample: "Most homes are furnished with tables, chairs, and beds",
        textExampleTranslate: "Большинство домов обставлены столами, стульями и кроватями",
        id: 2127,
        word: "furnish",
        wordTranslate: "отделка"
      }
    ]
  },
  {
    "levelData": {
      id: "4_19",
      name: "Landscape Inspired by the View of Frascati",
      imageSrc: "level4/4_19.jpg",
      cutSrc: "level4/cut/4_19.jpg",
      author: "MICHALLON, Achille-Etna",
      year: "1822"
    },
    words: [
      {
        audioExample: "files/17_2135_example.mp3",
        textExample: "When business increased, we had to hire more personnel",
        textExampleTranslate: "Когда бизнес увеличился, нам пришлось нанять больше персонала",
        id: 2135,
        word: "personnel",
        wordTranslate: "персонал"
      },
      {
        audioExample: "files/17_2137_example.mp3",
        textExample: "His writing was full of quotes from Shakespeare",
        textExampleTranslate: "Его письмо было полно цитат из Шекспира",
        id: 2137,
        word: "quote",
        wordTranslate: "цитировать"
      },
      {
        audioExample: "files/17_2138_example.mp3",
        textExample: "The new tenants moved into the house across the street",
        textExampleTranslate: "Новые жильцы переехали в дом через улицу",
        id: 2138,
        word: "tenant",
        wordTranslate: "арендатор"
      },
      {
        audioExample: "files/18_2145_example.mp3",
        textExample: "Becoming an astronaut is a fantasy shared by many children",
        textExampleTranslate: "Стать космонавтом - это фантазия, которую разделяют многие дети",
        id: 2145,
        word: "fantasy",
        wordTranslate: "фантазия"
      },
      {
        audioExample: "files/18_2149_example.mp3",
        textExample: "He was a pioneer of computer programming",
        textExampleTranslate: "Он был пионером компьютерного программирования",
        id: 2149,
        word: "pioneer",
        wordTranslate: "пионер"
      },
      {
        audioExample: "files/18_2151_example.mp3",
        textExample: "The boxers were told to return to their respective corners",
        textExampleTranslate: "Боксерам сказали вернуться на свои углы",
        id: 2151,
        word: "respective",
        wordTranslate: "соответствующий"
      },
      {
        audioExample: "files/18_2153_example.mp3",
        textExample: "The dominos fell in a sequence of one after another",
        textExampleTranslate: "Домино упали в последовательности один за другим",
        id: 2153,
        word: "sequence",
        wordTranslate: "последовательность"
      },
      {
        audioExample: "files/18_2156_example.mp3",
        textExample: "The surgeon operated on the old man’s heart",
        textExampleTranslate: "Хирург прооперировал сердце старика",
        id: 2156,
        word: "surgeon",
        wordTranslate: "хирург"
      },
      {
        audioExample: "files/18_2160_example.mp3",
        textExample: "The sick child needed a heart transplant to live",
        textExampleTranslate: "Больному ребенку нужна была пересадка сердца, чтобы жить",
        id: 2160,
        word: "transplant",
        wordTranslate: "трансплантат"
      },
      {
        audioExample: "files/19_2162_example.mp3",
        textExample: "There were a couple of problems I had to solve",
        textExampleTranslate: "Мне пришлось решить пару проблем",
        id: 2162,
        word: "couple",
        wordTranslate: "пара"
      }
    ]
  },
  {
    "levelData": {
      id: "4_20",
      name: "The Handelskom at Bruges",
      imageSrc: "level4/4_20.jpg",
      cutSrc: "level4/cut/4_20.jpg",
      author: "MINDERHOUT, Hendrik van",
      year: "1665"
    },
    words: [
      {
        audioExample: "files/19_2163_example.mp3",
        textExample: "Very few deviate much from the average",
        textExampleTranslate: "Очень немногие сильно отклоняются от среднего",
        id: 2163,
        word: "deviate",
        wordTranslate: "отклоняться"
      },
      {
        audioExample: "files/19_2164_example.mp3",
        textExample: "It was hard to differentiate between the identical twins",
        textExampleTranslate: "Было трудно различить одинаковых близнецов",
        id: 2164,
        word: "differentiate",
        wordTranslate: "дифференцировать"
      },
      {
        audioExample: "files/19_2165_example.mp3",
        textExample: "The loud crash disrupted the class lecture",
        textExampleTranslate: "Громкая авария сорвала лекцию класса",
        id: 2165,
        word: "disrupt",
        wordTranslate: "сорвать"
      },
      {
        audioExample: "files/19_2166_example.mp3",
        textExample: "I used the Pythagorean theorem to solve the equation",
        textExampleTranslate: "Я использовал теорему Пифагора для решения уравнения",
        id: 2166,
        word: "equation",
        wordTranslate: "уравнение"
      },
      {
        audioExample: "files/19_2173_example.mp3",
        textExample: "The old mariner used his telescope to find the shore",
        textExampleTranslate: "Старый моряк использовал свой телескоп, чтобы найти берег",
        id: 2173,
        word: "mariner",
        wordTranslate: "моряк"
      },
      {
        audioExample: "files/19_2174_example.mp3",
        textExample: "A multitude of people were waiting at the airport",
        textExampleTranslate: "Множество людей ждали в аэропорту",
        id: 2174,
        word: "multitude",
        wordTranslate: "множество"
      },
      {
        audioExample: "files/19_2176_example.mp3",
        textExample: "Poor results threaten the permanence of the new system",
        textExampleTranslate: "Плохие результаты угрожают постоянству новой системы",
        id: 2176,
        word: "permanence",
        wordTranslate: "неизменность"
      },
      {
        audioExample: "files/19_2177_example.mp3",
        textExample: "My life revolves around sports",
        textExampleTranslate: "Моя жизнь вращается вокруг спорта",
        id: 2177,
        word: "revolve",
        wordTranslate: "вращаются"
      },
      {
        audioExample: "files/20_2181_example.mp3",
        textExample: "That group of people making animal noises sounds completely absurd",
        textExampleTranslate: "Эта группа людей, издающих звуки животных, звучит совершенно абсурдно",
        id: 2181,
        word: "absurd",
        wordTranslate: "абсурдным"
      },
      {
        audioExample: "files/20_2182_example.mp3",
        textExample: "Most members of the aristocracy were very well fed",
        textExampleTranslate: "Большинство членов аристократии были очень хорошо накормлены",
        id: 2182,
        word: "aristocracy",
        wordTranslate: "аристократия"
      }
    ]
  },
  {
    "levelData": {
      id: "4_21",
      name: "Extensive Rhenish Landscape",
      imageSrc: "level4/4_21.jpg",
      cutSrc: "level4/cut/4_21.jpg",
      author: "MINDERHOUT, Hendrik van",
      year: "1653"
    },
    words: [
      {
        audioExample: "files/20_2184_example.mp3",
        textExample: "Everyone wore their best attire to the president’s daughter’s wedding",
        textExampleTranslate: "Все носили свои лучшие наряды на свадьбу дочери президента",
        id: 2184,
        word: "attire",
        wordTranslate: "наряд"
      },
      {
        audioExample: "files/20_2186_example.mp3",
        textExample: "Quotation marks are used to denote speech",
        textExampleTranslate: "Кавычки используются для обозначения речи",
        id: 2186,
        word: "denote",
        wordTranslate: "обозначает"
      },
      {
        audioExample: "files/20_2190_example.mp3",
        textExample: "Everyone knows where they fit in the hierarchy",
        textExampleTranslate: "Все знают, где они вписываются в иерархию",
        id: 2190,
        word: "hierarchy",
        wordTranslate: "иерархия"
      },
      {
        audioExample: "files/20_2191_example.mp3",
        textExample: "Football players wear shoulder pads to keep them safe",
        textExampleTranslate: "Футболисты носят наплечники, чтобы держать их в безопасности",
        id: 2191,
        word: "pad",
        wordTranslate: "подушка"
      },
      {
        audioExample: "files/20_2192_example.mp3",
        textExample: "Ladies and gentlemen, take your partners for the next dance",
        textExampleTranslate: "Дамы и господа, возьмите ваших партнеров для следующего танца",
        id: 2192,
        word: "partner",
        wordTranslate: "партнер"
      },
      {
        audioExample: "files/20_2194_example.mp3",
        textExample: "The introduction of the guests followed the normal protocol",
        textExampleTranslate: "Представление гостей следовало нормальному протоколу",
        id: 2194,
        word: "protocol",
        wordTranslate: "протокол"
      },
      {
        audioExample: "files/20_2195_example.mp3",
        textExample: "The service from the less-than-reputable company made her angry",
        textExampleTranslate: "Сервис от менее уважаемой компании разозлил ее",
        id: 2195,
        word: "reputable",
        wordTranslate: "авторитетный"
      },
      {
        audioExample: "files/20_2198_example.mp3",
        textExample: "Her clothes were all in the latest style",
        textExampleTranslate: "Её одежда была вся в последнем стиле",
        id: 2198,
        word: "style",
        wordTranslate: "стиль"
      },
      {
        audioExample: "files/21_2203_example.mp3",
        textExample: "Our manager will meet our rival company’s counterpart later today",
        textExampleTranslate: "Наш менеджер встретится с коллегой нашей конкурирующей компании позже сегодня",
        id: 2203,
        word: "counterpart",
        wordTranslate: "двойник"
      },
      {
        audioExample: "files/21_2207_example.mp3",
        textExample: "We finally reached our destination",
        textExampleTranslate: "Мы наконец достигли нашей цели",
        id: 2207,
        word: "finally",
        wordTranslate: "наконец-то"
      }
    ]
  },
  {
    "levelData": {
      id: "4_22",
      name: "River Landscape",
      imageSrc: "level4/4_22.jpg",
      cutSrc: "level4/cut/4_22.jpg",
      author: "MIROU, Anton",
      year: "1610s"
    },
    words: [
      {
        audioExample: "files/21_2208_example.mp3",
        textExample: "Alice wants to write for a gazette when she’s older",
        textExampleTranslate: "Алиса хочет написать для газеты, когда она станет старше",
        id: 2208,
        word: "gazette",
        wordTranslate: "вестник"
      },
      {
        audioExample: "files/21_2210_example.mp3",
        textExample: "Each individual is responsible for themselves",
        textExampleTranslate: "Каждый человек несет ответственность за себя",
        id: 2210,
        word: "individual",
        wordTranslate: "физическое лицо"
      },
      {
        audioExample: "files/21_2211_example.mp3",
        textExample: "There had been a major shift in government policy",
        textExampleTranslate: "Произошло серьезное изменение в правительственной политике",
        id: 2211,
        word: "major",
        wordTranslate: "крупный"
      },
      {
        audioExample: "files/21_2215_example.mp3",
        textExample: "The company publicized the job positions in the newspaper",
        textExampleTranslate: "Компания обнародовала вакансии в газете",
        id: 2215,
        word: "publicize",
        wordTranslate: "гласность"
      },
      {
        audioExample: "files/21_2216_example.mp3",
        textExample: "The store sold their surplus items on sale",
        textExampleTranslate: "Магазин продал свои излишки на распродаже",
        id: 2216,
        word: "surplus",
        wordTranslate: "излишки"
      },
      {
        audioExample: "files/21_2217_example.mp3",
        textExample: "She survived a heart attack",
        textExampleTranslate: "Она пережила сердечный приступ",
        id: 2217,
        word: "survive",
        wordTranslate: "выжить"
      },
      {
        audioExample: "files/21_2218_example.mp3",
        textExample: "They enjoyed theorizing about how things worked",
        textExampleTranslate: "Они наслаждались рассуждениями о том, как все работает",
        id: 2218,
        word: "theorize",
        wordTranslate: "теоретизировать"
      },
      {
        audioExample: "files/21_2220_example.mp3",
        textExample: "Henry uses vigorous exercise to keep himself in shape",
        textExampleTranslate: "Генри использует энергичные упражнения, чтобы держать себя в форме",
        id: 2220,
        word: "vigorous",
        wordTranslate: "энергичный"
      },
      {
        audioExample: "files/22_2221_example.mp3",
        textExample: "The altar had many lit candles on it",
        textExampleTranslate: "На алтаре было много зажженных свечей",
        id: 2221,
        word: "altar",
        wordTranslate: "алтарь"
      },
      {
        audioExample: "files/22_2222_example.mp3",
        textExample: "Agatha couldn’t play the piano anymore because of her arthritis",
        textExampleTranslate: "Агата больше не могла играть на пианино из-за своего артрита",
        id: 2222,
        word: "arthritis",
        wordTranslate: "артрит"
      }
    ]
  },
  {
    "levelData": {
      id: "4_23",
      name: "Woman in the Garden",
      imageSrc: "level4/4_23.jpg",
      cutSrc: "level4/cut/4_23.jpg",
      author: "MONET, Claude",
      year: "1866"
    },
    words: [
      {
        audioExample: "files/22_2223_example.mp3",
        textExample: "Gardens are the best places for botany",
        textExampleTranslate: "Сады - лучшие места для ботаники",
        id: 2223,
        word: "botany",
        wordTranslate: "ботаника"
      },
      {
        audioExample: "files/22_2225_example.mp3",
        textExample: "We visited the graves of our deceased grandparents",
        textExampleTranslate: "Мы посетили могилы наших умерших бабушек и дедушек",
        id: 2225,
        word: "deceased",
        wordTranslate: "умерший"
      },
      {
        audioExample: "files/22_2226_example.mp3",
        textExample: "The magic looked very real, but it was only deception",
        textExampleTranslate: "Магия выглядела очень реальной, но это был только обман",
        id: 2226,
        word: "deception",
        wordTranslate: "обман"
      },
      {
        audioExample: "files/22_2227_example.mp3",
        textExample: "Please scan this document so we have an electronic copy",
        textExampleTranslate: "Пожалуйста, отсканируйте этот документ, чтобы у нас была электронная копия",
        id: 2227,
        word: "document",
        wordTranslate: "документ"
      },
      {
        audioExample: "files/22_2228_example.mp3",
        textExample: "There was cow dung all over the field",
        textExampleTranslate: "По всему полю был коровий навоз",
        id: 2228,
        word: "dung",
        wordTranslate: "навоз"
      },
      {
        audioExample: "files/22_2229_example.mp3",
        textExample: "After dusk, Hannah went to catch fireflies in the park",
        textExampleTranslate: "После заката Ханна пошла ловить светлячков в парке",
        id: 2229,
        word: "dusk",
        wordTranslate: "сумерки"
      },
      {
        audioExample: "files/22_2230_example.mp3",
        textExample: "Bonnie was gratified after receiving her gift from her parents",
        textExampleTranslate: "Бонни была удовлетворена после получения подарка от родителей",
        id: 2230,
        word: "gratify",
        wordTranslate: "ублажать"
      },
      {
        audioExample: "files/22_2232_example.mp3",
        textExample: "It is difficult to interpret while someone is speaking",
        textExampleTranslate: "Трудно интерпретировать, когда кто-то говорит",
        id: 2232,
        word: "interpret",
        wordTranslate: "интерпретировать"
      },
      {
        audioExample: "files/22_2236_example.mp3",
        textExample: "The psychotic patient believed he saw things that weren’t real",
        textExampleTranslate: "Психотический пациент верил, что видел вещи, которые не были реальны",
        id: 2236,
        word: "psychotic",
        wordTranslate: "психотическое"
      },
      {
        audioExample: "files/22_2237_example.mp3",
        textExample: "Modern history has a wide scope",
        textExampleTranslate: "Современная история имеет широкий простор",
        id: 2237,
        word: "scope",
        wordTranslate: "объем"
      }
    ]
  },
  {
    "levelData": {
      id: "4_24",
      name: "On the Bank of the Seine, Bennecourt",
      imageSrc: "level4/4_24.jpg",
      cutSrc: "level4/cut/4_24.jpg",
      author: "MONET, Claude",
      year: "1868"
    },
    words: [
      {
        audioExample: "files/22_2238_example.mp3",
        textExample: "Bad guys in most movies have sinister laughs",
        textExampleTranslate: "У плохих парней в большинстве фильмов зловещий смех",
        id: 2238,
        word: "sinister",
        wordTranslate: "зловещий"
      },
      {
        audioExample: "files/23_2243_example.mp3",
        textExample: "The elusive fish only came out at night",
        textExampleTranslate: "Неуловимая рыба выходила только ночью",
        id: 2243,
        word: "elusive",
        wordTranslate: "неуловимый"
      },
      {
        audioExample: "files/23_2245_example.mp3",
        textExample: "Running without good shoes may induce leg pain",
        textExampleTranslate: "Бег без хорошей обуви может вызвать боль в ногах",
        id: 2245,
        word: "induce",
        wordTranslate: "индуцируют"
      },
      {
        audioExample: "files/23_2246_example.mp3",
        textExample: "Denise and Diana have been inseparable since they first met",
        textExampleTranslate: "Дениз и Диана были неразлучны с тех пор, как они впервые встретились",
        id: 2246,
        word: "inseparable",
        wordTranslate: "неотделимы друг от друга"
      },
      {
        audioExample: "files/23_2247_example.mp3",
        textExample: "The way to winning debates is to avoid invalid arguments",
        textExampleTranslate: "Путь к победе в дебатах - избежать недопустимых аргументов",
        id: 2247,
        word: "invalid",
        wordTranslate: "недействительным"
      },
      {
        audioExample: "files/23_2248_example.mp3",
        textExample: "Astronomers use telescopes to magnify faraway stars",
        textExampleTranslate: "Астрономы используют телескопы для увеличения дальних звезд",
        id: 2248,
        word: "magnify",
        wordTranslate: "увеличить"
      },
      {
        audioExample: "files/23_2251_example.mp3",
        textExample: "This is a minor problem",
        textExampleTranslate: "Это небольшая проблема",
        id: 2251,
        word: "minor",
        wordTranslate: "незначительный"
      },
      {
        audioExample: "files/23_2255_example.mp3",
        textExample: "Unfortunately, injustice still prevails in the country’s court system",
        textExampleTranslate: "К сожалению, в судебной системе страны по-прежнему царит несправедливость",
        id: 2255,
        word: "prevail",
        wordTranslate: "превалируют"
      },
      {
        audioExample: "files/23_2256_example.mp3",
        textExample: "The pursuit of happiness is a basic human right",
        textExampleTranslate: "Стремление к счастью является основным правом человека",
        id: 2256,
        word: "pursuit",
        wordTranslate: "погоня"
      },
      {
        audioExample: "files/23_2258_example.mp3",
        textExample: "Wild animals are very savage when defending their babies",
        textExampleTranslate: "Дикие животные очень дикие, когда защищают своих детей",
        id: 2258,
        word: "savage",
        wordTranslate: "дикарь"
      }
    ]
  },
  {
    "levelData": {
      id: "4_25",
      name: "Monet's Garden at Argenteuil",
      imageSrc: "level4/4_25.jpg",
      cutSrc: "level4/cut/4_25.jpg",
      author: "MONET, Claude",
      year: "1873"
    },
    words: [
      {
        audioExample: "files/24_2261_example.mp3",
        textExample: "The group advocated increased spending on education and schools",
        textExampleTranslate: "Группа выступает за увеличение расходов на образование и школы",
        id: 2261,
        word: "advocate",
        wordTranslate: "адвокат"
      },
      {
        audioExample: "files/24_2262_example.mp3",
        textExample: "She was happy, albeit briefly",
        textExampleTranslate: "Она была счастлива, хотя и ненадолго",
        id: 2262,
        word: "albeit",
        wordTranslate: "хотя"
      },
      {
        audioExample: "files/24_2265_example.mp3",
        textExample: "Fran’s uncle made most of his money trading commodities",
        textExampleTranslate: "Дядя Фрэн сделал большую часть своих денег, торгуя товарами",
        id: 2265,
        word: "commodity",
        wordTranslate: "товар"
      },
      {
        audioExample: "files/24_2266_example.mp3",
        textExample: "He was unable to communicate his feelings clearly",
        textExampleTranslate: "Он не мог четко выразить свои чувства",
        id: 2266,
        word: "communicate",
        wordTranslate: "общаться"
      },
      {
        audioExample: "files/24_2271_example.mp3",
        textExample: "They were envious of their neighbor’s front yard",
        textExampleTranslate: "Они завидовали переднему двору своего соседа",
        id: 2271,
        word: "envious",
        wordTranslate: "завидуют"
      },
      {
        audioExample: "files/24_2273_example.mp3",
        textExample: "They indicated that things would be likely to improve soon",
        textExampleTranslate: "Они указали, что ситуация, скорее всего, скоро улучшится",
        id: 2273,
        word: "indicate",
        wordTranslate: "показывают"
      },
      {
        audioExample: "files/24_2275_example.mp3",
        textExample: "The students were marshaled outside and put into groups",
        textExampleTranslate: "Студенты были собраны на улице и разбиты на группы",
        id: 2275,
        word: "marshal",
        wordTranslate: "предводитель"
      },
      {
        audioExample: "files/24_2277_example.mp3",
        textExample: "My boss is in a really bad mood today",
        textExampleTranslate: "У моего босса сегодня действительно плохое настроение",
        id: 2277,
        word: "mood",
        wordTranslate: "настроение"
      },
      {
        audioExample: "files/24_2278_example.mp3",
        textExample: "Some people believe that prophecies are actually true",
        textExampleTranslate: "Некоторые люди верят, что пророчества действительно верны",
        id: 2278,
        word: "prophecy",
        wordTranslate: "пророчество"
      },
      {
        audioExample: "files/25_2282_example.mp3",
        textExample: "This was a coherent program for solving the flooding problem",
        textExampleTranslate: "Это была последовательная программа для решения проблемы затопления",
        id: 2282,
        word: "coherent",
        wordTranslate: "последовательный"
      }
    ]
  },
  {
    "levelData": {
      id: "4_26",
      name: "Three Fishing Boats",
      imageSrc: "level4/4_26.jpg",
      cutSrc: "level4/cut/4_26.jpg",
      author: "MONET, Claude",
      year: "1886"
    },
    words: [
      {
        audioExample: "files/25_2283_example.mp3",
        textExample: "When they collaborated, they managed to finish their chores early",
        textExampleTranslate: "Когда они сотрудничали, им удалось закончить свои дела рано",
        id: 2283,
        word: "collaborate",
        wordTranslate: "сотрудничать"
      },
      {
        audioExample: "files/25_2285_example.mp3",
        textExample: "She curbed her anger by listening to a relaxing song",
        textExampleTranslate: "Она сдерживала свой гнев, слушая расслабляющую песню",
        id: 2285,
        word: "curb",
        wordTranslate: "снаряженная"
      },
      {
        audioExample: "files/25_2286_example.mp3",
        textExample: "Several of the children were diagnosed with the flu",
        textExampleTranslate: "У нескольких детей был диагностирован грипп",
        id: 2286,
        word: "diagnose",
        wordTranslate: "диагностировать"
      },
      {
        audioExample: "files/25_2290_example.mp3",
        textExample: "Helping build homes for poor people is very humane",
        textExampleTranslate: "Помогать строить дома для бедных людей очень гуманно",
        id: 2290,
        word: "humane",
        wordTranslate: "гуманный"
      },
      {
        audioExample: "files/25_2291_example.mp3",
        textExample: "After he lost his job, he became very needy",
        textExampleTranslate: "После того, как он потерял работу, он стал очень нуждающимся",
        id: 2291,
        word: "needy",
        wordTranslate: "нуждающимся"
      },
      {
        audioExample: "files/25_2297_example.mp3",
        textExample: "The education system has been completely transformed",
        textExampleTranslate: "Система образования полностью преобразована",
        id: 2297,
        word: "transform",
        wordTranslate: "преобразование"
      },
      {
        audioExample: "files/26_2302_example.mp3",
        textExample: "The teacher’s assistant will administer the test",
        textExampleTranslate: "Помощник учителя проведет тест",
        id: 2302,
        word: "administer",
        wordTranslate: "администрирование"
      },
      {
        audioExample: "files/26_2304_example.mp3",
        textExample: "The lake was contaminated when pollutants entered the water",
        textExampleTranslate: "Озеро было загрязнено при попадании загрязняющих веществ в воду",
        id: 2304,
        word: "contaminate",
        wordTranslate: "загрязнить"
      },
      {
        audioExample: "files/26_2305_example.mp3",
        textExample: "Your snack has a deficiency of any real nutrients",
        textExampleTranslate: "Ваша закуска имеет дефицит каких-либо реальных питательных веществ",
        id: 2305,
        word: "deficiency",
        wordTranslate: "дефицит"
      },
      {
        audioExample: "files/26_2306_example.mp3",
        textExample: "The government placed a strong emphasis on educational reform",
        textExampleTranslate: "Правительство уделяло большое внимание реформе образования",
        id: 2306,
        word: "emphasis",
        wordTranslate: "акцент"
      }
    ]
  },
  {
    "levelData": {
      id: "4_27",
      name: "Haystacks at Giverny",
      imageSrc: "level4/4_27.jpg",
      cutSrc: "level4/cut/4_27.jpg",
      author: "MONET, Claude",
      year: "1886"
    },
    words: [
      {
        audioExample: "files/26_2307_example.mp3",
        textExample: "It was difficult to stop the flu epidemic",
        textExampleTranslate: "Было трудно остановить эпидемию гриппа",
        id: 2307,
        word: "epidemic",
        wordTranslate: "эпидемия"
      },
      {
        audioExample: "files/26_2308_example.mp3",
        textExample: "Smoking cigarettes poses many health hazards",
        textExampleTranslate: "Курение сигарет создает много опасностей для здоровья",
        id: 2308,
        word: "hazard",
        wordTranslate: "опасность"
      },
      {
        audioExample: "files/26_2309_example.mp3",
        textExample: "It was imperative for him to find a job",
        textExampleTranslate: "Ему необходимо было найти работу",
        id: 2309,
        word: "imperative",
        wordTranslate: "императив"
      },
      {
        audioExample: "files/26_2310_example.mp3",
        textExample: "Whatever you eat goes into your intestines",
        textExampleTranslate: "Все, что вы едите, попадает в ваш кишечник",
        id: 2310,
        word: "intestines",
        wordTranslate: "кишка"
      },
      {
        audioExample: "files/26_2312_example.mp3",
        textExample: "The lobby was overcrowded with people",
        textExampleTranslate: "Вестибюль был переполнен людьми",
        id: 2312,
        word: "overcrowded",
        wordTranslate: "переполнена"
      },
      {
        audioExample: "files/26_2314_example.mp3",
        textExample: "That department is responsible for the provision of emergency supplies",
        textExampleTranslate: "Этот департамент отвечает за предоставление предметов первой необходимости",
        id: 2314,
        word: "provision",
        wordTranslate: "обеспечение"
      },
      {
        audioExample: "files/26_2317_example.mp3",
        textExample: "The hospital room looked quite sterile",
        textExampleTranslate: "Больничная палата выглядела довольно стерильной",
        id: 2317,
        word: "sterile",
        wordTranslate: "стерильные"
      },
      {
        audioExample: "files/26_2318_example.mp3",
        textExample: "He upgraded to a real fancy car",
        textExampleTranslate: "Он перешел на настоящий модный автомобиль",
        id: 2318,
        word: "upgrade",
        wordTranslate: "обновить"
      },
      {
        audioExample: "files/26_2319_example.mp3",
        textExample: "Her method of solving the math problem seemed viable",
        textExampleTranslate: "Ее метод решения математической задачи казался жизнеспособным",
        id: 2319,
        word: "viable",
        wordTranslate: "жизнеспособный"
      },
      {
        audioExample: "files/26_2320_example.mp3",
        textExample: "Many people attended the voluntary boat safety class",
        textExampleTranslate: "Многие люди посещали добровольный класс безопасности лодки",
        id: 2320,
        word: "voluntary",
        wordTranslate: "добровольное"
      }
    ]
  },
  {
    "levelData": {
      id: "4_28",
      name: "Water Lily Pond, Harmony in Rose",
      imageSrc: "level4/4_28.jpg",
      cutSrc: "level4/cut/4_28.jpg",
      author: "MONET, Claude",
      year: "1900"
    },
    words: [
      {
        audioExample: "files/27_2322_example.mp3",
        textExample: "Before eating, they thanked the Almighty for their food",
        textExampleTranslate: "Перед едой они поблагодарили Всевышнего за пищу",
        id: 2322,
        word: "Almighty",
        wordTranslate: "всемогущий"
      },
      {
        audioExample: "files/27_2331_example.mp3",
        textExample: "During a lunar eclipse, Earth’s shadow darkens the moon’s surface",
        textExampleTranslate: "Во время лунного затмения тень Земли затемняет поверхность луны",
        id: 2331,
        word: "lunar",
        wordTranslate: "лунный"
      },
      {
        audioExample: "files/27_2333_example.mp3",
        textExample: "Black and white television sets are outmoded",
        textExampleTranslate: "Черно-белые телевизоры устарели",
        id: 2333,
        word: "outmoded",
        wordTranslate: "устаревшее"
      },
      {
        audioExample: "files/27_2335_example.mp3",
        textExample: "The doctor said the patient might have a psychiatric problem",
        textExampleTranslate: "Врач сказал, что у пациента может быть психиатрическая проблема",
        id: 2335,
        word: "psychiatric",
        wordTranslate: "психиатрические"
      },
      {
        audioExample: "files/27_2336_example.mp3",
        textExample: "Studying psychiatry has taught me a lot about mental illness",
        textExampleTranslate: "Изучение психиатрии многому научило меня в отношении психических заболеваний",
        id: 2336,
        word: "psychiatry",
        wordTranslate: "психиатрия"
      },
      {
        audioExample: "files/27_2338_example.mp3",
        textExample: "Bright fashing lights can cause seizures in children",
        textExampleTranslate: "Яркие мигающие огни могут вызвать судороги у детей",
        id: 2338,
        word: "seizure",
        wordTranslate: "захват"
      },
      {
        audioExample: "files/28_2345_example.mp3",
        textExample: "Turn the screw clockwise to tighten it",
        textExampleTranslate: "Поверните винт по часовой стрелке, чтобы затянуть его",
        id: 2345,
        word: "clockwise",
        wordTranslate: "по часовой стрелке"
      },
      {
        audioExample: "files/28_2346_example.mp3",
        textExample: "The target was a series of concentric circles",
        textExampleTranslate: "Целью была серия концентрических кругов",
        id: 2346,
        word: "concentric",
        wordTranslate: "концентрический"
      },
      {
        audioExample: "files/28_2352_example.mp3",
        textExample: "There was an interchange of ideas between the groups",
        textExampleTranslate: "Был обмен идеями между группами",
        id: 2352,
        word: "interchange",
        wordTranslate: "обмен"
      },
      {
        audioExample: "files/28_2353_example.mp3",
        textExample: "Everyone was welcome to attend the multicultural celebration",
        textExampleTranslate: "Приглашаем всех посетить мультикультурный праздник",
        id: 2353,
        word: "multicultural",
        wordTranslate: "мультикультурный"
      }
    ]
  },
  {
    "levelData": {
      id: "4_29",
      name: "Water Lilies",
      imageSrc: "level4/4_29.jpg",
      cutSrc: "level4/cut/4_29.jpg",
      author: "MONET, Claude",
      year: "1914"
    },
    words: [
      {
        audioExample: "files/28_2356_example.mp3",
        textExample: "The arrow pierced the target in the very center",
        textExampleTranslate: "Стрела пронзила цель в самом центре",
        id: 2356,
        word: "pierce",
        wordTranslate: "прокалывать"
      },
      {
        audioExample: "files/28_2357_example.mp3",
        textExample: "They had to select textbooks for each class",
        textExampleTranslate: "Они должны были выбрать учебники для каждого класса",
        id: 2357,
        word: "select",
        wordTranslate: "выбрать"
      },
      {
        audioExample: "files/28_2358_example.mp3",
        textExample: "There are big differences in family structure in different cultures",
        textExampleTranslate: "Существуют большие различия в структуре семьи в разных культурах",
        id: 2358,
        word: "structure",
        wordTranslate: "структура"
      },
      {
        audioExample: "files/28_2359_example.mp3",
        textExample: "The visual displays were very attractive",
        textExampleTranslate: "Визуальные дисплеи были очень привлекательными",
        id: 2359,
        word: "visual",
        wordTranslate: "визуальный"
      },
      {
        audioExample: "files/29_2364_example.mp3",
        textExample: "The United States exports many cereals and grains",
        textExampleTranslate: "Соединенные Штаты экспортируют много зерновых и зерновых",
        id: 2364,
        word: "export",
        wordTranslate: "экспорт"
      },
      {
        audioExample: "files/29_2365_example.mp3",
        textExample: "The engine put unpleasant, black fumes into the air",
        textExampleTranslate: "Двигатель выбрасывает неприятные, черные пары в воздух",
        id: 2365,
        word: "fume",
        wordTranslate: "дымить"
      },
      {
        audioExample: "files/29_2370_example.mp3",
        textExample: "The organization is concerned with the overpopulation of the world",
        textExampleTranslate: "Организация обеспокоена перенаселением мира",
        id: 2370,
        word: "overpopulation",
        wordTranslate: "перенаселение"
      },
      {
        audioExample: "files/29_2371_example.mp3",
        textExample: "He quickly established a patent for his brilliant invention",
        textExampleTranslate: "Он быстро установил патент на свое блестящее изобретение",
        id: 2371,
        word: "patent",
        wordTranslate: "патент"
      },
      {
        audioExample: "files/29_2372_example.mp3",
        textExample: "The team was penalized when they broke the rules",
        textExampleTranslate: "Команда была оштрафована, когда они нарушили правила",
        id: 2372,
        word: "penalize",
        wordTranslate: "оштрафовать"
      },
      {
        audioExample: "files/29_2373_example.mp3",
        textExample: "The petroleum at that factory is used to make gasoline",
        textExampleTranslate: "Нефть на этом заводе используется для производства бензина",
        id: 2373,
        word: "petroleum",
        wordTranslate: "нефть"
      }
    ]
  },
  {
    "levelData": {
      id: "5_01",
      name: "A Garden Party",
      imageSrc: "level5/5_01.jpg",
      cutSrc: "level5/cut/5_01.jpg",
      author: "HALS, Dirck",
      year: "1627"
    },
    words: [
      {
        audioExample: "files/01_2401_example.mp3",
        textExample: "I love the aroma of coffee in the morning",
        textExampleTranslate: "Я люблю аромат кофе по утрам",
        id: 2401,
        word: "aroma",
        wordTranslate: "аромат"
      },
      {
        audioExample: "files/01_2403_example.mp3",
        textExample: "She held a large cluster of grapes in her hand",
        textExampleTranslate: "Она держала в руке большую гроздь винограда",
        id: 2403,
        word: "cluster",
        wordTranslate: "кластер"
      },
      {
        audioExample: "files/01_2404_example.mp3",
        textExample: "Mina combined peanut butter and jelly to make a sandwich",
        textExampleTranslate: "Мина объединила арахисовое масло и желе, чтобы сделать бутерброд",
        id: 2404,
        word: "combine",
        wordTranslate: "объединить"
      },
      {
        audioExample: "files/01_2406_example.mp3",
        textExample: "Contemporary scientists have learned quite a bit about DNA",
        textExampleTranslate: "Современные ученые узнали совсем немного о ДНК",
        id: 2406,
        word: "contemporary",
        wordTranslate: "современный"
      },
      {
        audioExample: "files/01_2409_example.mp3",
        textExample: "It is very humid inside a sauna",
        textExampleTranslate: "В сауне очень влажно",
        id: 2409,
        word: "humid",
        wordTranslate: "влажный"
      },
      {
        audioExample: "files/01_2411_example.mp3",
        textExample: "You can touch your palate with your tongue",
        textExampleTranslate: "Вы можете коснуться своего неба своим языком",
        id: 2411,
        word: "palate",
        wordTranslate: "небо"
      },
      {
        audioExample: "files/01_2412_example.mp3",
        textExample: "My vacation in Hawaii was like being in paradise",
        textExampleTranslate: "Мой отпуск на Гавайях был как в раю",
        id: 2412,
        word: "paradise",
        wordTranslate: "рай"
      },
      {
        audioExample: "files/01_2414_example.mp3",
        textExample: "His mother was surprised by her son’s rapid growth",
        textExampleTranslate: "Его мать была удивлена быстрым ростом ее сына",
        id: 2414,
        word: "rapid",
        wordTranslate: "быстрый"
      },
      {
        audioExample: "files/01_2415_example.mp3",
        textExample: "Grass tends to grow at a very slow rate",
        textExampleTranslate: "Трава имеет тенденцию расти очень медленно",
        id: 2415,
        word: "rate",
        wordTranslate: "ставка"
      },
      {
        audioExample: "files/01_2416_example.mp3",
        textExample: "The soothing music helped the baby fall asleep",
        textExampleTranslate: "Успокаивающая музыка помогла ребенку уснуть",
        id: 2416,
        word: "soothing",
        wordTranslate: "успокаивать"
      }
    ]
  },
  {
    "levelData": {
      id: "5_02",
      name: "Family Group in a Landscape",
      imageSrc: "level5/5_02.jpg",
      cutSrc: "level5/cut/5_02.jpg",
      author: "HALS, Frans",
      year: "c. 1648"
    },
    words: [
      {
        audioExample: "files/01_2417_example.mp3",
        textExample: "The handsome man has a subtle smile",
        textExampleTranslate: "У красавца тонкая улыбка",
        id: 2417,
        word: "subtle",
        wordTranslate: "тонкий"
      },
      {
        audioExample: "files/02_2423_example.mp3",
        textExample: "My sister’s character is fun and very outgoing",
        textExampleTranslate: "Персонаж моей сестры веселый и общительный",
        id: 2423,
        word: "character",
        wordTranslate: "персонаж"
      },
      {
        audioExample: "files/02_2424_example.mp3",
        textExample: "I recycle everything I can, so my conscience is clear!",
        textExampleTranslate: "Я перерабатываю все, что могу, поэтому моя совесть чиста!",
        id: 2424,
        word: "conscience",
        wordTranslate: "совесть"
      },
      {
        audioExample: "files/02_2425_example.mp3",
        textExample: "She tried to escape from the building",
        textExampleTranslate: "Она пыталась сбежать из здания",
        id: 2425,
        word: "escape",
        wordTranslate: "побег"
      },
      {
        audioExample: "files/02_2426_example.mp3",
        textExample: "The fiery blaze burned all night long",
        textExampleTranslate: "Огненное пламя горело всю ночь",
        id: 2426,
        word: "fiery",
        wordTranslate: "огненный"
      },
      {
        audioExample: "files/02_2427_example.mp3",
        textExample: "The zebra’s flesh is covered by black and white skin",
        textExampleTranslate: "Плоть зебры покрыта черно-белой кожей",
        id: 2427,
        word: "flesh",
        wordTranslate: "плоть"
      },
      {
        audioExample: "files/02_2428_example.mp3",
        textExample: "Would you like a grapefruit with your breakfast?",
        textExampleTranslate: "Хотели бы вы грейпфрут с завтраком?",
        id: 2428,
        word: "grapefruit",
        wordTranslate: "грейпфрут"
      },
      {
        audioExample: "files/02_2431_example.mp3",
        textExample: "Many people in poor countries cook on kerosene stoves",
        textExampleTranslate: "Многие люди в бедных странах готовят на керосиновых печах",
        id: 2431,
        word: "kerosene",
        wordTranslate: "керосин"
      },
      {
        audioExample: "files/02_2433_example.mp3",
        textExample: "I suddenly woke up in the middle of the night",
        textExampleTranslate: "Я внезапно проснулся среди ночи",
        id: 2433,
        word: "middle",
        wordTranslate: "средний"
      },
      {
        audioExample: "files/02_2436_example.mp3",
        textExample: "We marked our property by placing stakes into the ground",
        textExampleTranslate: "Мы пометили нашу собственность, поставив колья в землю",
        id: 2436,
        word: "stake",
        wordTranslate: "доля"
      }
    ]
  },
  {
    "levelData": {
      id: "5_03",
      name: "View of the Island of Capri",
      imageSrc: "level5/5_03.jpg",
      cutSrc: "level5/cut/5_03.jpg",
      author: "HARPIGNIES, Henri-Joseph",
      year: "1853"
    },
    words: [
      {
        audioExample: "files/02_2437_example.mp3",
        textExample: "The steward is bringing some tea",
        textExampleTranslate: "Стюард приносит чай",
        id: 2437,
        word: "steward",
        wordTranslate: "стюард"
      },
      {
        audioExample: "files/02_2438_example.mp3",
        textExample: "I found a large ball of string",
        textExampleTranslate: "Я нашел большой клубок ниток",
        id: 2438,
        word: "string",
        wordTranslate: "строка"
      },
      {
        audioExample: "files/02_2440_example.mp3",
        textExample: "The teenagers wrecked the house for no reason at all",
        textExampleTranslate: "Подростки разрушили дом без всякой причины",
        id: 2440,
        word: "wreck",
        wordTranslate: "крушение"
      },
      {
        audioExample: "files/03_2442_example.mp3",
        textExample: "The sound of the drums was audible from miles away",
        textExampleTranslate: "Звук барабанов был слышен издалека",
        id: 2442,
        word: "audible",
        wordTranslate: "слышимый"
      },
      {
        audioExample: "files/03_2443_example.mp3",
        textExample: "The huge military plane was an awesome sight",
        textExampleTranslate: "Огромный военный самолет был потрясающим зрелищем",
        id: 2443,
        word: "awesome",
        wordTranslate: "классно"
      },
      {
        audioExample: "files/03_2444_example.mp3",
        textExample: "You should beware of driving fast on wet roads",
        textExampleTranslate: "Вам следует остерегаться быстрой езды по мокрым дорогам",
        id: 2444,
        word: "beware",
        wordTranslate: "берегись"
      },
      {
        audioExample: "files/03_2455_example.mp3",
        textExample: "In the US, baseball is considered a national pastime",
        textExampleTranslate: "В США бейсбол считается национальным времяпрепровождением",
        id: 2455,
        word: "pastime",
        wordTranslate: "времяпрепровождение"
      },
      {
        audioExample: "files/03_2460_example.mp3",
        textExample: "She tormented her little brother by taking his favorite toy",
        textExampleTranslate: "Она мучила своего младшего брата, забирая его любимую игрушку",
        id: 2460,
        word: "torment",
        wordTranslate: "мучение"
      },
      {
        audioExample: "files/04_2462_example.mp3",
        textExample: "The boy yelled in agony when the puppy bit him",
        textExampleTranslate: "Мальчик кричал в агонии, когда щенок укусил его",
        id: 2462,
        word: "agony",
        wordTranslate: "агония"
      },
      {
        audioExample: "files/04_2463_example.mp3",
        textExample: "An assassin killed Martin Luther King on April 4, 1968",
        textExampleTranslate: "Убийца убил Мартина Лютера Кинга 4 апреля 1968 года",
        id: 2463,
        word: "assassin",
        wordTranslate: "ассасин"
      }
    ]
  },
  {
    "levelData": {
      id: "5_04",
      name: "The Return from the War",
      imageSrc: "level5/5_04.jpg",
      cutSrc: "level5/cut/5_04.jpg",
      author: "HARPIGNIES, Henri-Joseph",
      year: "1859"
    },
    words: [
      {
        audioExample: "files/04_2464_example.mp3",
        textExample: "The farmer had a long beard, as white as snow",
        textExampleTranslate: "У фермера была длинная борода, белая, как снег",
        id: 2464,
        word: "beard",
        wordTranslate: "борода"
      },
      {
        audioExample: "files/04_2469_example.mp3",
        textExample: "The consensus among the children was that ghosts exist",
        textExampleTranslate: "Все дети согласились с тем, что призраки существуют",
        id: 2469,
        word: "consensus",
        wordTranslate: "консенсус"
      },
      {
        audioExample: "files/04_2472_example.mp3",
        textExample: "The man became cynical after being lied to many times",
        textExampleTranslate: "Человек стал циничным после того, как его много раз обманули",
        id: 2472,
        word: "cynical",
        wordTranslate: "циничным"
      },
      {
        audioExample: "files/04_2473_example.mp3",
        textExample: "I looked up at the dome to admire its beauty",
        textExampleTranslate: "Я посмотрел на купол, чтобы полюбоваться его красотой",
        id: 2473,
        word: "dome",
        wordTranslate: "купол"
      },
      {
        audioExample: "files/04_2477_example.mp3",
        textExample: "The young girl would often harass her baby brother",
        textExampleTranslate: "Молодая девушка часто изводила своего младшего брата",
        id: 2477,
        word: "harass",
        wordTranslate: "харассы"
      },
      {
        audioExample: "files/05_2481_example.mp3",
        textExample: "Wait here awhile, and I’ll bring some tea",
        textExampleTranslate: "Подождите здесь некоторое время, и я принесу немного чая",
        id: 2481,
        word: "awhile",
        wordTranslate: "какое-то время"
      },
      {
        audioExample: "files/05_2486_example.mp3",
        textExample: "Carol fainted because she hadn’t eaten in over a day",
        textExampleTranslate: "Кэрол упала в обморок, потому что она не ела в течение дня",
        id: 2486,
        word: "faint",
        wordTranslate: "слабый"
      },
      {
        audioExample: "files/05_2487_example.mp3",
        textExample: "Pollution is a global problem",
        textExampleTranslate: "Загрязнение - глобальная проблема",
        id: 2487,
        word: "global",
        wordTranslate: "глобальный"
      },
      {
        audioExample: "files/05_2492_example.mp3",
        textExample: "His lecture on world hunger was very informative",
        textExampleTranslate: "Его лекция о голоде в мире была очень информативной",
        id: 2492,
        word: "lecture",
        wordTranslate: "лекция"
      },
      {
        audioExample: "files/05_2494_example.mp3",
        textExample: "I’m sorry, but the trains are not operating today",
        textExampleTranslate: "Извините, но поезда не работают сегодня",
        id: 2494,
        word: "operate",
        wordTranslate: "работать"
      }
    ]
  },
  {
    "levelData": {
      id: "5_05",
      name: "River Landscape with a Village in the Background",
      imageSrc: "level5/5_05.jpg",
      cutSrc: "level5/cut/5_05.jpg",
      author: "HARPIGNIES, Henri-Joseph",
      year: "1877"
    },
    words: [
      {
        audioExample: "files/05_2495_example.mp3",
        textExample: "Don’t look at my diary! It’s private!",
        textExampleTranslate: "Не смотри на мой дневник! Это личное!",
        id: 2495,
        word: "private",
        wordTranslate: "частный"
      },
      {
        audioExample: "files/05_2496_example.mp3",
        textExample: "I did not know what had caused his recent behavior",
        textExampleTranslate: "Я не знал, что послужило причиной его недавнего поведения",
        id: 2496,
        word: "recent",
        wordTranslate: "недавнее"
      },
      {
        audioExample: "files/05_2498_example.mp3",
        textExample: "Jack is in his second semester of college",
        textExampleTranslate: "Джек в своем втором семестре колледжа",
        id: 2498,
        word: "semester",
        wordTranslate: "семестр"
      },
      {
        audioExample: "files/05_2499_example.mp3",
        textExample: "This is an important, formal project and must be typewritten",
        textExampleTranslate: "Это важный, формальный проект и должен быть напечатан",
        id: 2499,
        word: "typewritten",
        wordTranslate: "машинописный"
      },
      {
        audioExample: "files/05_2500_example.mp3",
        textExample: "My best friend’s dad is a bit weird",
        textExampleTranslate: "Папа моего лучшего друга немного странный",
        id: 2500,
        word: "weird",
        wordTranslate: "странно"
      },
      {
        audioExample: "files/06_2502_example.mp3",
        textExample: "The largest lion was the alpha male of the pack",
        textExampleTranslate: "Самый большой лев был альфа-самцом стаи",
        id: 2502,
        word: "alpha",
        wordTranslate: "альфа"
      },
      {
        audioExample: "files/06_2503_example.mp3",
        textExample: "The politician’s words were meant to arouse the protestors’ anger",
        textExampleTranslate: "Слова политика должны были вызвать гнев протестующих",
        id: 2503,
        word: "arouse",
        wordTranslate: "будить"
      },
      {
        audioExample: "files/06_2505_example.mp3",
        textExample: "Seoul buzzes from dawn till dusk",
        textExampleTranslate: "Сеул гудит от рассвета до заката",
        id: 2505,
        word: "buzz",
        wordTranslate: "шум"
      },
      {
        audioExample: "files/06_2509_example.mp3",
        textExample: "The bratty child never shows compliance with her mother’s rules",
        textExampleTranslate: "Слабый ребенок никогда не демонстрирует соблюдения правил своей матери",
        id: 2509,
        word: "compliance",
        wordTranslate: "соблюдение"
      },
      {
        audioExample: "files/06_2510_example.mp3",
        textExample: "The player could not comprehend why he lost the game",
        textExampleTranslate: "Игрок не мог понять, почему он проиграл",
        id: 2510,
        word: "comprehend",
        wordTranslate: "постигать"
      }
    ]
  },
  {
    "levelData": {
      id: "5_06",
      name: "River Banks, Auvergne",
      imageSrc: "level5/5_06.jpg",
      cutSrc: "level5/cut/5_06.jpg",
      author: "HARPIGNIES, Henri-Joseph",
      year: "1860"
    },
    words: [
      {
        audioExample: "files/06_2512_example.mp3",
        textExample: "The prisoners were put in the custody of the jailers",
        textExampleTranslate: "Заключенные были помещены под стражу тюремщиков",
        id: 2512,
        word: "custody",
        wordTranslate: "опека"
      },
      {
        audioExample: "files/06_2514_example.mp3",
        textExample: "Mother Teresa was said to embody goodness and kindness",
        textExampleTranslate: "Говорят, что мать Тереза олицетворяет добро и доброту",
        id: 2514,
        word: "embody",
        wordTranslate: "воплощают"
      },
      {
        audioExample: "files/06_2515_example.mp3",
        textExample: "Scientists must always find empirical evidence in their work",
        textExampleTranslate: "Ученые всегда должны находить эмпирические доказательства в своей работе",
        id: 2515,
        word: "empirical",
        wordTranslate: "эмпирический"
      },
      {
        audioExample: "files/07_2524_example.mp3",
        textExample: "Police quickly arrived at the scene of the crime",
        textExampleTranslate: "Полиция быстро прибыла на место преступления",
        id: 2524,
        word: "crime",
        wordTranslate: "преступление"
      },
      {
        audioExample: "files/07_2526_example.mp3",
        textExample: "The kids showed Aunt Tess much gratitude for visiting them",
        textExampleTranslate: "Дети выразили тетю Тесс большую благодарность за то, что посетили их",
        id: 2526,
        word: "gratitude",
        wordTranslate: "благодарность"
      },
      {
        audioExample: "files/07_2528_example.mp3",
        textExample: "The students argued until the teacher intervened",
        textExampleTranslate: "Студенты спорили, пока учитель не вмешался",
        id: 2528,
        word: "intervene",
        wordTranslate: "вмешиваться"
      },
      {
        audioExample: "files/07_2534_example.mp3",
        textExample: "The army general proclaimed that the war was won",
        textExampleTranslate: "Генерал армии объявил, что война выиграна",
        id: 2534,
        word: "proclaim",
        wordTranslate: "провозглашать"
      },
      {
        audioExample: "files/07_2537_example.mp3",
        textExample: "The poor man didn’t have the resources to feed himself",
        textExampleTranslate: "У бедного человека не было ресурсов, чтобы прокормить себя",
        id: 2537,
        word: "resource",
        wordTranslate: "ресурс"
      },
      {
        audioExample: "files/07_2539_example.mp3",
        textExample: "Many people volunteered to help the adults learn to read",
        textExampleTranslate: "Многие вызвались помочь взрослым научиться читать",
        id: 2539,
        word: "volunteer",
        wordTranslate: "доброволец"
      },
      {
        audioExample: "files/07_2540_example.mp3",
        textExample: "The woman was the only witness of the horrible crime",
        textExampleTranslate: "Женщина была единственным свидетелем ужасного преступления",
        id: 2540,
        word: "witness",
        wordTranslate: "свидетель"
      }
    ]
  },
  {
    "levelData": {
      id: "5_07",
      name: "On Riviera",
      imageSrc: "level5/5_07.jpg",
      cutSrc: "level5/cut/5_07.jpg",
      author: "HARPIGNIES, Henri-Joseph",
      year: "1891"
    },
    words: [
      {
        audioExample: "files/08_2542_example.mp3",
        textExample: "She was punished for her bad conduct",
        textExampleTranslate: "Она была наказана за плохое поведение",
        id: 2542,
        word: "conduct",
        wordTranslate: "поведение"
      },
      {
        audioExample: "files/08_2543_example.mp3",
        textExample: "The television at home is in constant use",
        textExampleTranslate: "Телевидение дома постоянно используется",
        id: 2543,
        word: "constant",
        wordTranslate: "константа"
      },
      {
        audioExample: "files/08_2544_example.mp3",
        textExample: "The old window was covered with cracks",
        textExampleTranslate: "Старое окно было покрыто трещинами",
        id: 2544,
        word: "crack",
        wordTranslate: "трещины"
      },
      {
        audioExample: "files/08_2545_example.mp3",
        textExample: "A thermometer is a device that tells temperature",
        textExampleTranslate: "Термометр - это устройство, которое сообщает температуру",
        id: 2545,
        word: "device",
        wordTranslate: "устройство"
      },
      {
        audioExample: "files/08_2546_example.mp3",
        textExample: "The cows in the field were enclosed by a fence",
        textExampleTranslate: "Коровы в поле были огорожены забором",
        id: 2546,
        word: "enclose",
        wordTranslate: "вложить"
      },
      {
        audioExample: "files/08_2547_example.mp3",
        textExample: "I was scared, so I gripped my older sister’s hand",
        textExampleTranslate: "Я был напуган, поэтому я схватил руку моей старшей сестры",
        id: 2547,
        word: "grip",
        wordTranslate: "рукоятка"
      },
      {
        audioExample: "files/08_2548_example.mp3",
        textExample: "The criminal halted when he saw the police coming",
        textExampleTranslate: "Преступник остановился, когда увидел, как идет полиция",
        id: 2548,
        word: "halt",
        wordTranslate: "хромать"
      },
      {
        audioExample: "files/08_2549_example.mp3",
        textExample: "The student was nervous about her impending test",
        textExampleTranslate: "Студент нервничал по поводу ее предстоящего теста",
        id: 2549,
        word: "impending",
        wordTranslate: "надвигающийся"
      },
      {
        audioExample: "files/08_2550_example.mp3",
        textExample: "My friend influenced my decision to attend Terrance University",
        textExampleTranslate: "Мой друг повлиял на мое решение учиться в университете Терранс",
        id: 2550,
        word: "influence",
        wordTranslate: "оказывать влияние"
      },
      {
        audioExample: "files/08_2551_example.mp3",
        textExample: "The students learned about different laws during social studies class",
        textExampleTranslate: "Студенты узнали о различных законах на уроках обществознания",
        id: 2551,
        word: "law",
        wordTranslate: "закон"
      }
    ]
  },
  {
    "levelData": {
      id: "5_08",
      name: "The Courtyard of the Customs House",
      imageSrc: "level5/5_08.jpg",
      cutSrc: "level5/cut/5_08.jpg",
      author: "LÉPICIÉ, Nicolas-Bernard",
      year: "1775"
    },
    words: [
      {
        audioExample: "files/08_2555_example.mp3",
        textExample: "I took the drumstick and snapped it with my hands",
        textExampleTranslate: "Я взял голень и защелкнул его руками",
        id: 2555,
        word: "snap",
        wordTranslate: "щелчок"
      },
      {
        audioExample: "files/08_2556_example.mp3",
        textExample: "The sly fox stole the eggs from the nest",
        textExampleTranslate: "Хитрая лиса украла яйца из гнезда",
        id: 2556,
        word: "sly",
        wordTranslate: "втихаря"
      },
      {
        audioExample: "files/09_2561_example.mp3",
        textExample: "We work alongside each other in the office",
        textExampleTranslate: "Мы работаем вместе в офисе",
        id: 2561,
        word: "alongside",
        wordTranslate: "ряд"
      },
      {
        audioExample: "files/09_2562_example.mp3",
        textExample: "Tom has a big appetite. He eats all the time",
        textExampleTranslate: "У Тома большой аппетит. Он все время ест",
        id: 2562,
        word: "appetite",
        wordTranslate: "аппетит"
      },
      {
        audioExample: "files/09_2563_example.mp3",
        textExample: "Andrew assisted me with my homework",
        textExampleTranslate: "Андрей помог мне с домашним заданием",
        id: 2563,
        word: "assist",
        wordTranslate: "помощь"
      },
      {
        audioExample: "files/09_2564_example.mp3",
        textExample: "The breeze caused the leaves to fall off the tree",
        textExampleTranslate: "Ветер заставил листья упасть с дерева",
        id: 2564,
        word: "breeze",
        wordTranslate: "ветер"
      },
      {
        audioExample: "files/09_2565_example.mp3",
        textExample: "The students got into trouble for defying their teacher’s rules",
        textExampleTranslate: "Студенты попали в беду из-за несоблюдения правил своего учителя",
        id: 2565,
        word: "defy",
        wordTranslate: "бросить вызов"
      },
      {
        audioExample: "files/09_2566_example.mp3",
        textExample: "The museum displayed many wonderful paintings",
        textExampleTranslate: "В музее выставлено много замечательных картин",
        id: 2566,
        word: "display",
        wordTranslate: "дисплей"
      },
      {
        audioExample: "files/09_2569_example.mp3",
        textExample: "Sandra forgave Peter after he said he was sorry",
        textExampleTranslate: "Сандра простила Петра после того, как он сказал, что сожалел",
        id: 2569,
        word: "forgive",
        wordTranslate: "прости"
      },
      {
        audioExample: "files/09_2570_example.mp3",
        textExample: "Jennifer is very lively: she’s always running and playing",
        textExampleTranslate: "Дженнифер очень живая: она всегда бегает и играет",
        id: 2570,
        word: "lively",
        wordTranslate: "оживленный"
      }
    ]
  },
  {
    "levelData": {
      id: "5_09",
      name: "Still-Life",
      imageSrc: "level5/5_09.jpg",
      cutSrc: "level5/cut/5_09.jpg",
      author: "HEEM, Jan Davidsz. de",
      year: "1653"
    },
    words: [
      {
        audioExample: "files/09_2571_example.mp3",
        textExample: "The rich people lived in a big, majestic house",
        textExampleTranslate: "Богатые люди жили в большом, величественном доме",
        id: 2571,
        word: "majestic",
        wordTranslate: "величественный"
      },
      {
        audioExample: "files/09_2574_example.mp3",
        textExample: "John is pessimistic. He always thinks something bad will happen",
        textExampleTranslate: "Джон пессимистичен. Он всегда думает, что случится что-то плохое",
        id: 2574,
        word: "pessimistic",
        wordTranslate: "пессимистический"
      },
      {
        audioExample: "files/09_2576_example.mp3",
        textExample: "Out of anger, Helen slapped Eunice on the face",
        textExampleTranslate: "Из гнева Хлен ударила Юнис по лицу",
        id: 2576,
        word: "slap",
        wordTranslate: "пощечина"
      },
      {
        audioExample: "files/09_2577_example.mp3",
        textExample: "Jacob smashed the window with a rock",
        textExampleTranslate: "Джейкоб разбил окно камнем",
        id: 2577,
        word: "smash",
        wordTranslate: "разбить"
      },
      {
        audioExample: "files/09_2578_example.mp3",
        textExample: "My father is a successful businessman",
        textExampleTranslate: "Мой отец - успешный бизнесмен",
        id: 2578,
        word: "successful",
        wordTranslate: "успешный"
      },
      {
        audioExample: "files/09_2579_example.mp3",
        textExample: "The wages I receive from my job are really great!",
        textExampleTranslate: "Заработная плата, которую я получаю от моей работы, действительно велика!",
        id: 2579,
        word: "wage",
        wordTranslate: "заработная плата"
      },
      {
        audioExample: "files/09_2580_example.mp3",
        textExample: "My sister loves horror movies, whereas I prefer comedies",
        textExampleTranslate: "Моя сестра любит фильмы ужасов, а я предпочитаю комедии",
        id: 2580,
        word: "whereas",
        wordTranslate: "в то время как"
      },
      {
        audioExample: "files/10_2581_example.mp3",
        textExample: "Rocks and machines are not animate things",
        textExampleTranslate: "Камни и машины не одушевлены",
        id: 2581,
        word: "animate",
        wordTranslate: "живой"
      },
      {
        audioExample: "files/10_2582_example.mp3",
        textExample: "The biologist classified the plant as a completely new species",
        textExampleTranslate: "Биолог классифицировал растение как совершенно новый вид",
        id: 2582,
        word: "classify",
        wordTranslate: "классифицировать"
      },
      {
        audioExample: "files/10_2583_example.mp3",
        textExample: "The student conceded that he had cheated on the test",
        textExampleTranslate: "Студент признал, что он обманул тест",
        id: 2583,
        word: "concede",
        wordTranslate: "уступить"
      }
    ]
  },
  {
    "levelData": {
      id: "5_10",
      name: "View from the Prater towards the Suburbs of Vienna",
      imageSrc: "level5/5_10.jpg",
      cutSrc: "level5/cut/5_10.jpg",
      author: "HEIDELOFF, Josef",
      year: "1781"
    },
    words: [
      {
        audioExample: "files/10_2585_example.mp3",
        textExample: "The men used wood and metal to construct a house",
        textExampleTranslate: "Мужчины использовали дерево и металл, чтобы построить дом",
        id: 2585,
        word: "construct",
        wordTranslate: "конструкт"
      },
      {
        audioExample: "files/10_2586_example.mp3",
        textExample: "She celebrated her three decades of work with the company",
        textExampleTranslate: "Она отметила три десятилетия работы с компанией",
        id: 2586,
        word: "decade",
        wordTranslate: "десятилетие"
      },
      {
        audioExample: "files/10_2588_example.mp3",
        textExample: "The ferry took the people across the lake",
        textExampleTranslate: "Паром переправил людей через озеро",
        id: 2588,
        word: "ferry",
        wordTranslate: "паром"
      },
      {
        audioExample: "files/10_2594_example.mp3",
        textExample: "The poor, hungry man made a plea for food",
        textExampleTranslate: "Бедный, голодный человек обратился с просьбой о еде",
        id: 2594,
        word: "plea",
        wordTranslate: "мольба"
      },
      {
        audioExample: "files/10_2596_example.mp3",
        textExample: "The government ordered a careful review of the economic situation",
        textExampleTranslate: "Правительство распорядилось провести тщательный анализ экономической ситуации",
        id: 2596,
        word: "review",
        wordTranslate: "рассмотрение"
      },
      {
        audioExample: "files/10_2599_example.mp3",
        textExample: "Meerkats can’t walk like humans, but they can stand upright",
        textExampleTranslate: "Сурикаты не могут ходить как люди, но они могут стоять прямо",
        id: 2599,
        word: "upright",
        wordTranslate: "вертикально"
      },
      {
        audioExample: "files/11_2601_example.mp3",
        textExample: "The junior executives formed an alliance with each other",
        textExampleTranslate: "Младшие руководители заключили союз друг с другом",
        id: 2601,
        word: "alliance",
        wordTranslate: "альянс"
      },
      {
        audioExample: "files/11_2603_example.mp3",
        textExample: "The robber was armed with a gun",
        textExampleTranslate: "Грабитель был вооружен пистолетом",
        id: 2603,
        word: "armed",
        wordTranslate: "вооружившись"
      },
      {
        audioExample: "files/11_2605_example.mp3",
        textExample: "The books commended the general’s bravery",
        textExampleTranslate: "Книги высоко оценили храбрость генерала",
        id: 2605,
        word: "bravery",
        wordTranslate: "храбрость"
      },
      {
        audioExample: "files/11_2606_example.mp3",
        textExample: "Tom and Amy’s marriage ceremony is in June",
        textExampleTranslate: "Церемония бракосочетания Тома и Эми в июне",
        id: 2606,
        word: "ceremony",
        wordTranslate: "церемония"
      }
    ]
  },
  {
    "levelData": {
      id: "5_11",
      name: "The Bull Hunt in Campo San Polo",
      imageSrc: "level5/5_11.jpg",
      cutSrc: "level5/cut/5_11.jpg",
      author: "HEINTZ, Joseph the Younger",
      year: "1648"
    },
    words: [
      {
        audioExample: "files/11_2607_example.mp3",
        textExample: "Ancient Mexican culture is renowned for its architecture",
        textExampleTranslate: "Древняя мексиканская культура славится своей архитектурой",
        id: 2607,
        word: "culture",
        wordTranslate: "культура"
      },
      {
        audioExample: "files/11_2608_example.mp3",
        textExample: "The air force works in defense of its country",
        textExampleTranslate: "Военно-воздушные силы работают в защиту своей страны",
        id: 2608,
        word: "defense",
        wordTranslate: "оборона"
      },
      {
        audioExample: "files/11_2611_example.mp3",
        textExample: "The beautiful woman enchanted everybody in the room",
        textExampleTranslate: "Красивая женщина очаровала всех в комнате",
        id: 2611,
        word: "enchant",
        wordTranslate: "заточка"
      },
      {
        audioExample: "files/11_2614_example.mp3",
        textExample: "She is considered a master in the comedy genre",
        textExampleTranslate: "Она считается мастером в жанре комедии",
        id: 2614,
        word: "genre",
        wordTranslate: "жанр"
      },
      {
        audioExample: "files/11_2615_example.mp3",
        textExample: "My grandmother had a great impact on my life",
        textExampleTranslate: "Моя бабушка оказала большое влияние на мою жизнь",
        id: 2615,
        word: "impact",
        wordTranslate: "влияние"
      },
      {
        audioExample: "files/11_2619_example.mp3",
        textExample: "The water heater supplied the house with warm water",
        textExampleTranslate: "Водонагреватель обеспечил дом теплой водой",
        id: 2619,
        word: "supply",
        wordTranslate: "поставка"
      },
      {
        audioExample: "files/12_2624_example.mp3",
        textExample: "He made a bid to become the university’s next president",
        textExampleTranslate: "Он сделал ставку, чтобы стать следующим президентом университета",
        id: 2624,
        word: "bid",
        wordTranslate: "ставки"
      },
      {
        audioExample: "files/12_2627_example.mp3",
        textExample: "Asia is the largest continent",
        textExampleTranslate: "Азия - самый большой континент",
        id: 2627,
        word: "continent",
        wordTranslate: "континент"
      },
      {
        audioExample: "files/12_2631_example.mp3",
        textExample: "The desert can be a very harsh environment",
        textExampleTranslate: "Пустыня может быть очень суровой окружающей средой",
        id: 2631,
        word: "harsh",
        wordTranslate: "жесткий"
      },
      {
        audioExample: "files/12_2632_example.mp3",
        textExample: "The woman leaned against the counter because she was tired",
        textExampleTranslate: "Женщина прислонилась к стойке, потому что устала",
        id: 2632,
        word: "lean",
        wordTranslate: "худой"
      }
    ]
  },
  {
    "levelData": {
      id: "5_12",
      name: "The Steeplechase",
      imageSrc: "level5/5_12.jpg",
      cutSrc: "level5/cut/5_12.jpg",
      author: "HERRING, Benjamin Jr.",
      year: "1869"
    },
    words: [
      {
        audioExample: "files/12_2636_example.mp3",
        textExample: "The firefighter rescued the man from the burning building",
        textExampleTranslate: "Пожарный спас человека из горящего здания",
        id: 2636,
        word: "rescue",
        wordTranslate: "спасение"
      },
      {
        audioExample: "files/12_2637_example.mp3",
        textExample: "The student said the letters of the alphabet in succession",
        textExampleTranslate: "Студент сказал буквы алфавита подряд",
        id: 2637,
        word: "succession",
        wordTranslate: "преемственность"
      },
      {
        audioExample: "files/12_2638_example.mp3",
        textExample: "The terrain below was rocky and full of hills",
        textExampleTranslate: "Рельеф внизу был каменистым и полным холмов",
        id: 2638,
        word: "terrain",
        wordTranslate: "ландшафт"
      },
      {
        audioExample: "files/12_2640_example.mp3",
        textExample: "The boy hit his brother in an act of violence",
        textExampleTranslate: "Мальчик ударил своего брата в акте насилия",
        id: 2640,
        word: "violence",
        wordTranslate: "насилие"
      },
      {
        audioExample: "files/13_2642_example.mp3",
        textExample: "Everybody wanted the movie star’s autograph",
        textExampleTranslate: "Все хотели автограф кинозвезды",
        id: 2642,
        word: "autograph",
        wordTranslate: "автограф"
      },
      {
        audioExample: "files/13_2643_example.mp3",
        textExample: "Beads of water collected on the outside of the glass",
        textExampleTranslate: "Капли воды, собранные на внешней стороне стекла",
        id: 2643,
        word: "bead",
        wordTranslate: "шарик"
      },
      {
        audioExample: "files/13_2644_example.mp3",
        textExample: "Please brew a fresh pot of coffee",
        textExampleTranslate: "Пожалуйста, заварите свежий горшок кофе",
        id: 2644,
        word: "brew",
        wordTranslate: "заварить"
      },
      {
        audioExample: "files/13_2645_example.mp3",
        textExample: "Gail charmed everyone with her humorous stories",
        textExampleTranslate: "Гейл очаровала всех своими юмористическими историями",
        id: 2645,
        word: "charm",
        wordTranslate: "очарование"
      },
      {
        audioExample: "files/13_2646_example.mp3",
        textExample: "It was his destiny to become a great singer",
        textExampleTranslate: "Это была его судьба - стать великим певцом",
        id: 2646,
        word: "destiny",
        wordTranslate: "судьба"
      },
      {
        audioExample: "files/13_2647_example.mp3",
        textExample: "The factory produces a wide range of high-tech equipment",
        textExampleTranslate: "Завод производит широкий спектр высокотехнологичного оборудования",
        id: 2647,
        word: "equipment",
        wordTranslate: "оборудование"
      }
    ]
  },
  {
    "levelData": {
      id: "5_13",
      name: "The Entry of King Othon of Greece in Athens",
      imageSrc: "level5/5_13.jpg",
      cutSrc: "level5/cut/5_13.jpg",
      author: "HESS, Peter von",
      year: "1839"
    },
    words: [
      {
        audioExample: "files/13_2649_example.mp3",
        textExample: "She is irritable when she doesn’t get enough sleep",
        textExampleTranslate: "Она раздражительна, когда не высыпается",
        id: 2649,
        word: "irritable",
        wordTranslate: "раздраженный"
      },
      {
        audioExample: "files/13_2653_example.mp3",
        textExample: "Fish and beef are good sources of protein",
        textExampleTranslate: "Рыба и говядина - хорошие источники белка",
        id: 2653,
        word: "protein",
        wordTranslate: "белок"
      },
      {
        audioExample: "files/13_2654_example.mp3",
        textExample: "I put my signature at the end of the letter",
        textExampleTranslate: "Я поставил свою подпись в конце письма",
        id: 2654,
        word: "signature",
        wordTranslate: "подпись"
      },
      {
        audioExample: "files/13_2655_example.mp3",
        textExample: "We gave a lot of stuff to the charity",
        textExampleTranslate: "Мы много чего дарили на благотворительность",
        id: 2655,
        word: "stuff",
        wordTranslate: "материал"
      },
      {
        audioExample: "files/13_2657_example.mp3",
        textExample: "The delivery company uses large vans to deliver packages",
        textExampleTranslate: "Компания доставки использует большие фургоны для доставки посылок",
        id: 2657,
        word: "van",
        wordTranslate: "ван"
      },
      {
        audioExample: "files/13_2659_example.mp3",
        textExample: "She doesn’t do her workout on the weekends",
        textExampleTranslate: "Она не занимается спортом по выходным",
        id: 2659,
        word: "workout",
        wordTranslate: "разрабатывать"
      },
      {
        audioExample: "files/13_2660_example.mp3",
        textExample: "The cars zoomed along the road",
        textExampleTranslate: "Машины проезжали по дороге",
        id: 2660,
        word: "zoom",
        wordTranslate: "увеличить"
      },
      {
        audioExample: "files/14_2661_example.mp3",
        textExample: "There were several bricks scattered on the ground",
        textExampleTranslate: "На земле было разбросано несколько кирпичей",
        id: 2661,
        word: "brick",
        wordTranslate: "кирпич"
      },
      {
        audioExample: "files/14_2663_example.mp3",
        textExample: "I made heart-shaped cookies from the dough",
        textExampleTranslate: "Я сделал печенье в форме сердца из теста",
        id: 2663,
        word: "dough",
        wordTranslate: "тесто"
      },
      {
        audioExample: "files/14_2664_example.mp3",
        textExample: "The nurse expressed her sympathy for the sick patient",
        textExampleTranslate: "Медсестра выразила сочувствие больному пациенту",
        id: 2664,
        word: "express",
        wordTranslate: "экспресс"
      }
    ]
  },
  {
    "levelData": {
      id: "5_14",
      name: "Landscape",
      imageSrc: "level5/5_14.jpg",
      cutSrc: "level5/cut/5_14.jpg",
      author: "HONDECOETER, Gillis Claesz. d'",
      year: "1620-22"
    },
    words: [
      {
        audioExample: "files/14_2667_example.mp3",
        textExample: "After the long race, the runner’s face was flushed",
        textExampleTranslate: "После долгой гонки лицо бегуна вспыхнуло",
        id: 2667,
        word: "flush",
        wordTranslate: "промывать"
      },
      {
        audioExample: "files/14_2668_example.mp3",
        textExample: "The car crash injured two people",
        textExampleTranslate: "В автокатастрофе пострадали два человека",
        id: 2668,
        word: "injure",
        wordTranslate: "травмировать"
      },
      {
        audioExample: "files/14_2671_example.mp3",
        textExample: "After arguing, the two friends were reconciled with each other",
        textExampleTranslate: "После ссоры двое друзей помирились друг с другом",
        id: 2671,
        word: "reconcile",
        wordTranslate: "примириться"
      },
      {
        audioExample: "files/14_2673_example.mp3",
        textExample: "When the ball hit the window, the glass shattered",
        textExampleTranslate: "Когда мяч попал в окно, стекло разбилось",
        id: 2673,
        word: "shatter",
        wordTranslate: "разбиться"
      },
      {
        audioExample: "files/14_2675_example.mp3",
        textExample: "The baker sifted the four into a large bowl",
        textExampleTranslate: "Пекарь просеял четверых в большую миску",
        id: 2675,
        word: "sift",
        wordTranslate: "просеять"
      },
      {
        audioExample: "files/14_2677_example.mp3",
        textExample: "The stars sparkled in the winter night’s sky",
        textExampleTranslate: "Звезды сверкали в небе зимней ночи",
        id: 2677,
        word: "sparkle",
        wordTranslate: "искорка"
      },
      {
        audioExample: "files/14_2678_example.mp3",
        textExample: "He sprinkled the pasta with salt and black pepper",
        textExampleTranslate: "Он посыпал макароны солью и черным перцем",
        id: 2678,
        word: "sprinkle",
        wordTranslate: "посыпать"
      },
      {
        audioExample: "files/15_2682_example.mp3",
        textExample: "She always applies makeup to her face before going outside",
        textExampleTranslate: "Она всегда наносит макияж на лицо перед выходом на улицу",
        id: 2682,
        word: "apply",
        wordTranslate: "применять"
      },
      {
        audioExample: "files/15_2683_example.mp3",
        textExample: "The players awaited the referee’s decision",
        textExampleTranslate: "Игроки ждали решения судьи",
        id: 2683,
        word: "await",
        wordTranslate: "ждите"
      },
      {
        audioExample: "files/15_2684_example.mp3",
        textExample: "The boy took a nap next to his beloved cat",
        textExampleTranslate: "Мальчик вздремнул рядом со своим любимым котом",
        id: 2684,
        word: "beloved",
        wordTranslate: "любимый"
      }
    ]
  },
  {
    "levelData": {
      id: "5_15",
      name: "View of the Monastery of El Escorial",
      imageSrc: "level5/5_15.jpg",
      cutSrc: "level5/cut/5_15.jpg",
      author: "HOUASSE, Michel-Ange",
      year: "1723"
    },
    words: [
      {
        audioExample: "files/15_2685_example.mp3",
        textExample: "The climate in the desert is very hot",
        textExampleTranslate: "Климат в пустыне очень жаркий",
        id: 2685,
        word: "climate",
        wordTranslate: "климат"
      },
      {
        audioExample: "files/15_2686_example.mp3",
        textExample: "The workers complained that they were being treated unfairly",
        textExampleTranslate: "Рабочие жаловались на несправедливое обращение с ними",
        id: 2686,
        word: "complain",
        wordTranslate: "пожаловаться"
      },
      {
        audioExample: "files/15_2688_example.mp3",
        textExample: "The papers were due on the 19th",
        textExampleTranslate: "Бумаги должны были быть 19-го",
        id: 2688,
        word: "due",
        wordTranslate: "в связи"
      },
      {
        audioExample: "files/15_2690_example.mp3",
        textExample: "Mr. Jones came to fix the furnace",
        textExampleTranslate: "Мистер Джонс пришел починить печь",
        id: 2690,
        word: "furnace",
        wordTranslate: "печь"
      },
      {
        audioExample: "files/15_2692_example.mp3",
        textExample: "When they matured, they became as tall as their parents",
        textExampleTranslate: "Когда они повзрослели, они стали такими же высокими, как их родители",
        id: 2692,
        word: "mature",
        wordTranslate: "зрелый"
      },
      {
        audioExample: "files/15_2696_example.mp3",
        textExample: "I fear my father is powerless now",
        textExampleTranslate: "Боюсь, мой отец сейчас бессилен",
        id: 2696,
        word: "powerless",
        wordTranslate: "бессильна"
      },
      {
        audioExample: "files/15_2699_example.mp3",
        textExample: "Many people want to travel into space by spaceship",
        textExampleTranslate: "Многие люди хотят путешествовать в космос на космическом корабле",
        id: 2699,
        word: "spaceship",
        wordTranslate: "космический корабль"
      },
      {
        audioExample: "files/15_2700_example.mp3",
        textExample: "There are a variety of flowers at the shop",
        textExampleTranslate: "В магазине есть множество цветов",
        id: 2700,
        word: "variety",
        wordTranslate: "разнообразие"
      },
      {
        audioExample: "files/16_2701_example.mp3",
        textExample: "The company stopped using sugar altogether in its food",
        textExampleTranslate: "Компания перестала использовать сахар в пищу",
        id: 2701,
        word: "altogether",
        wordTranslate: "в целом"
      },
      {
        audioExample: "files/16_2703_example.mp3",
        textExample: "She got a bruise on her knee from falling down",
        textExampleTranslate: "У нее синяк на колене от падения",
        id: 2703,
        word: "bruise",
        wordTranslate: "синяк"
      }
    ]
  },
  {
    "levelData": {
      id: "5_16",
      name: "The Grand Odalisque",
      imageSrc: "level5/5_16.jpg",
      cutSrc: "level5/cut/5_16.jpg",
      author: "INGRES, Jean-Auguste-Dominique",
      year: "1814"
    },
    words: [
      {
        audioExample: "files/16_2706_example.mp3",
        textExample: "The teacher didn’t foresee any problems with his large class",
        textExampleTranslate: "Учитель не предвидел никаких проблем со своим большим классом",
        id: 2706,
        word: "foresee",
        wordTranslate: "предвидеть"
      },
      {
        audioExample: "files/16_2709_example.mp3",
        textExample: "His family helped him when he encountered misfortune",
        textExampleTranslate: "Его семья помогла ему, когда он столкнулся с несчастьем",
        id: 2709,
        word: "misfortune",
        wordTranslate: "несчастье"
      },
      {
        audioExample: "files/16_2710_example.mp3",
        textExample: "She doesn’t like to say negative things about her friends",
        textExampleTranslate: "Она не любит говорить негативно о своих друзьях",
        id: 2710,
        word: "negative",
        wordTranslate: "негативный"
      },
      {
        audioExample: "files/16_2713_example.mp3",
        textExample: "She ripped the paper in half by accident",
        textExampleTranslate: "Она случайно порвала газету пополам",
        id: 2713,
        word: "rip",
        wordTranslate: "покойся с миром"
      },
      {
        audioExample: "files/16_2714_example.mp3",
        textExample: "The parents worked hard for their children’s sake",
        textExampleTranslate: "Родители усердно трудились ради своих детей",
        id: 2714,
        word: "sake",
        wordTranslate: "ради"
      },
      {
        audioExample: "files/17_2721_example.mp3",
        textExample: "Antonio’s ailing health caused his head to hurt",
        textExampleTranslate: "Больное здоровье Антонио заставило его голову болеть",
        id: 2721,
        word: "ailing",
        wordTranslate: "больной"
      },
      {
        audioExample: "files/17_2724_example.mp3",
        textExample: "The mermaid bathed herself in the ocean",
        textExampleTranslate: "Русалка купалась в океане",
        id: 2724,
        word: "bathe",
        wordTranslate: "купать"
      },
      {
        audioExample: "files/17_2726_example.mp3",
        textExample: "My job is to critique the food at various restaurants",
        textExampleTranslate: "Моя работа - критиковать еду в разных ресторанах",
        id: 2726,
        word: "critique",
        wordTranslate: "критика"
      },
      {
        audioExample: "files/17_2738_example.mp3",
        textExample: "The entire family mourned their grandfather’s death together",
        textExampleTranslate: "Вся семья оплакивала смерть деда вместе",
        id: 2738,
        word: "mourn",
        wordTranslate: "оплакивать"
      },
      {
        audioExample: "files/17_2739_example.mp3",
        textExample: "The baby was talking nonsense into the phone",
        textExampleTranslate: "Ребенок говорил глупости в телефон",
        id: 2739,
        word: "nonsense",
        wordTranslate: "бред какой то"
      }
    ]
  },
  {
    "levelData": {
      id: "5_17",
      name: "After a Storm",
      imageSrc: "level5/5_17.jpg",
      cutSrc: "level5/cut/5_17.jpg",
      author: "ISABEY, Eugène",
      year: "1869"
    },
    words: [
      {
        audioExample: "files/18_2741_example.mp3",
        textExample: "The new teacher’s accent was clearly a German one",
        textExampleTranslate: "Акцент нового учителя был явно немецкий",
        id: 2741,
        word: "accent",
        wordTranslate: "акцент"
      },
      {
        audioExample: "files/18_2743_example.mp3",
        textExample: "They turned their basement into a game room",
        textExampleTranslate: "Они превратили свой подвал в игровую комнату",
        id: 2743,
        word: "basement",
        wordTranslate: "подвал"
      },
      {
        audioExample: "files/18_2744_example.mp3",
        textExample: "She got a blank piece of paper to draw on",
        textExampleTranslate: "У нее есть чистый лист бумаги, на котором можно рисовать",
        id: 2744,
        word: "blank",
        wordTranslate: "пустой"
      },
      {
        audioExample: "files/18_2746_example.mp3",
        textExample: "He had choir practice every day after school",
        textExampleTranslate: "У него была хоровая практика каждый день после школы",
        id: 2746,
        word: "choir",
        wordTranslate: "хор"
      },
      {
        audioExample: "files/18_2747_example.mp3",
        textExample: "The comic actor was famous for his jokes",
        textExampleTranslate: "Актер комиксов прославился своими шутками",
        id: 2747,
        word: "comic",
        wordTranslate: "комик"
      },
      {
        audioExample: "files/18_2748_example.mp3",
        textExample: "The bad weather complicated finishing the job quickly",
        textExampleTranslate: "Плохая погода усложнила быстрое завершение работы",
        id: 2748,
        word: "complicate",
        wordTranslate: "усложнять"
      },
      {
        audioExample: "files/18_2749_example.mp3",
        textExample: "She declined his offer to pay for her dinner",
        textExampleTranslate: "Она отклонила его предложение оплатить ее ужин",
        id: 2749,
        word: "decline",
        wordTranslate: "спад"
      },
      {
        audioExample: "files/18_2753_example.mp3",
        textExample: "We justly decided to give the prize to him",
        textExampleTranslate: "Мы справедливо решили дать ему приз",
        id: 2753,
        word: "justly",
        wordTranslate: "справедливо"
      },
      {
        audioExample: "files/18_2754_example.mp3",
        textExample: "He got a new leather jacket for his birthday",
        textExampleTranslate: "Он получил новую кожаную куртку на день рождения",
        id: 2754,
        word: "leather",
        wordTranslate: "кожа"
      },
      {
        audioExample: "files/18_2755_example.mp3",
        textExample: "She sat in the park and pondered her problem",
        textExampleTranslate: "Она сидела в парке и обдумывала свою проблему",
        id: 2755,
        word: "ponder",
        wordTranslate: "вдумайтесь"
      }
    ]
  },
  {
    "levelData": {
      id: "5_18",
      name: "View of La Iglesia y la Plaza de San Antonio, Aranjuez",
      imageSrc: "level5/5_18.jpg",
      cutSrc: "level5/cut/5_18.jpg",
      author: "JOLI, Antonio",
      year: "1753-54"
    },
    words: [
      {
        audioExample: "files/18_2756_example.mp3",
        textExample: "He reserved a table at the busy restaurant",
        textExampleTranslate: "Он зарезервировал столик в оживленном ресторане",
        id: 2756,
        word: "reserve",
        wordTranslate: "резерв"
      },
      {
        audioExample: "files/18_2757_example.mp3",
        textExample: "He read the script of the play three times",
        textExampleTranslate: "Он прочитал сценарий пьесы три раза",
        id: 2757,
        word: "script",
        wordTranslate: "сценарий"
      },
      {
        audioExample: "files/18_2758_example.mp3",
        textExample: "I searched the newspaper for a new job",
        textExampleTranslate: "Я искал в газете новую работу",
        id: 2758,
        word: "search",
        wordTranslate: "поиск"
      },
      {
        audioExample: "files/18_2759_example.mp3",
        textExample: "She slammed the book shut after she finished reading it",
        textExampleTranslate: "Она захлопнула книгу после того, как закончила читать",
        id: 2759,
        word: "slam",
        wordTranslate: "хлопать"
      },
      {
        audioExample: "files/18_2760_example.mp3",
        textExample: "The staircase leads directly into the kitchen",
        textExampleTranslate: "Лестница ведет прямо на кухню",
        id: 2760,
        word: "staircase",
        wordTranslate: "лестница"
      },
      {
        audioExample: "files/19_2761_example.mp3",
        textExample: "He was afflicted by pain in his right arm",
        textExampleTranslate: "Он страдал от боли в правой руке",
        id: 2761,
        word: "afflicted",
        wordTranslate: "страдает"
      },
      {
        audioExample: "files/19_2763_example.mp3",
        textExample: "Scientists worry that harmful substances are hurting the atmosphere",
        textExampleTranslate: "Ученые опасаются, что вредные вещества наносят вред атмосфере",
        id: 2763,
        word: "atmosphere",
        wordTranslate: "атмосфера"
      },
      {
        audioExample: "files/19_2764_example.mp3",
        textExample: "The author was hard at work on his next novel",
        textExampleTranslate: "Автор усердно работал над своим следующим романом",
        id: 2764,
        word: "author",
        wordTranslate: "автор"
      },
      {
        audioExample: "files/19_2768_example.mp3",
        textExample: "I connected the mouse to my laptop computer",
        textExampleTranslate: "Я подключил мышь к своему ноутбуку",
        id: 2768,
        word: "connect",
        wordTranslate: "подключиться"
      },
      {
        audioExample: "files/19_2770_example.mp3",
        textExample: "To turn on the lights, just flip this switch",
        textExampleTranslate: "Чтобы включить свет, просто включите этот переключатель",
        id: 2770,
        word: "flip",
        wordTranslate: "кувырок"
      }
    ]
  },
  {
    "levelData": {
      id: "5_19",
      name: "Washington Crossing the Delaware",
      imageSrc: "level5/5_19.jpg",
      cutSrc: "level5/cut/5_19.jpg",
      author: "LEUTZE, Emanuel Gottlieb",
      year: "1851"
    },
    words: [
      {
        audioExample: "files/19_2771_example.mp3",
        textExample: "She read a book to keep from being idle",
        textExampleTranslate: "Она прочитала книгу, чтобы не сидеть сложа руки",
        id: 2771,
        word: "idle",
        wordTranslate: "холостой ход"
      },
      {
        audioExample: "files/19_2772_example.mp3",
        textExample: "The teacher notified us about a change to our assignment",
        textExampleTranslate: "Учитель уведомил нас об изменении нашего задания",
        id: 2772,
        word: "notify",
        wordTranslate: "уведомлять"
      },
      {
        audioExample: "files/19_2773_example.mp3",
        textExample: "His favorite food was peas",
        textExampleTranslate: "Его любимой едой был горох",
        id: 2773,
        word: "pea",
        wordTranslate: "гороховый"
      },
      {
        audioExample: "files/19_2774_example.mp3",
        textExample: "Raisins are one of my favorite snacks",
        textExampleTranslate: "Изюм - одна из моих любимых закусок",
        id: 2774,
        word: "raisin",
        wordTranslate: "изюм"
      },
      {
        audioExample: "files/19_2776_example.mp3",
        textExample: "The president stated his opinion about the world’s health concerns",
        textExampleTranslate: "Президент высказал свое мнение о проблемах здравоохранения в мире",
        id: 2776,
        word: "state",
        wordTranslate: "штат"
      },
      {
        audioExample: "files/19_2777_example.mp3",
        textExample: "The waiter brought our food on a tray",
        textExampleTranslate: "Официант принес нашу еду на подносе",
        id: 2777,
        word: "tray",
        wordTranslate: "лоток"
      },
      {
        audioExample: "files/19_2779_example.mp3",
        textExample: "The figures in the painting were vivid",
        textExampleTranslate: "Фигуры на картине были яркими",
        id: 2779,
        word: "vivid",
        wordTranslate: "яркий"
      },
      {
        audioExample: "files/20_2783_example.mp3",
        textExample: "The man hurt his ankle while jogging in the park",
        textExampleTranslate: "Человек повредил лодыжку во время пробежки в парке",
        id: 2783,
        word: "ankle",
        wordTranslate: "лодыжка"
      },
      {
        audioExample: "files/20_2786_example.mp3",
        textExample: "My sister is on a low-calorie diet for fitness training",
        textExampleTranslate: "Моя сестра на низкокалорийной диете для фитнеса",
        id: 2786,
        word: "calorie",
        wordTranslate: "калории"
      },
      {
        audioExample: "files/20_2791_example.mp3",
        textExample: "You exert a lot of energy when you lift weights",
        textExampleTranslate: "Вы тратите много энергии, когда поднимаете вес",
        id: 2791,
        word: "exert",
        wordTranslate: "напрягать"
      }
    ]
  },
  {
    "levelData": {
      id: "5_20",
      name: "The Royal Procession to the Church of Santa Maria di Piedigrotta",
      imageSrc: "level5/5_20.jpg",
      cutSrc: "level5/cut/5_20.jpg",
      author: "JOLI, Antonio",
      year: "c. 1770"
    },
    words: [
      {
        audioExample: "files/20_2792_example.mp3",
        textExample: "The mayor entered the room flanked by her advisers",
        textExampleTranslate: "Мэр вошел в комнату в окружении своих советников",
        id: 2792,
        word: "flank",
        wordTranslate: "обрамляют"
      },
      {
        audioExample: "files/20_2796_example.mp3",
        textExample: "Regularly eating too much can impair your health",
        textExampleTranslate: "Регулярное употребление слишком большого количества пищи может нанести вред вашему здоровью",
        id: 2796,
        word: "impair",
        wordTranslate: "ухудшает"
      },
      {
        audioExample: "files/20_2798_example.mp3",
        textExample: "Cassandra fell asleep mid-movie",
        textExampleTranslate: "Кассандра уснула в середине фильма",
        id: 2798,
        word: "mid",
        wordTranslate: "середина"
      },
      {
        audioExample: "files/21_2801_example.mp3",
        textExample: "The new teacher had a background in science and math",
        textExampleTranslate: "Новый учитель имел опыт работы в науке и математике",
        id: 2801,
        word: "background",
        wordTranslate: "фон"
      },
      {
        audioExample: "files/21_2803_example.mp3",
        textExample: "The daily newspaper chronicles local and world events",
        textExampleTranslate: "Ежедневная газета ведет хронику местных и мировых событий",
        id: 2803,
        word: "chronicle",
        wordTranslate: "летопись"
      },
      {
        audioExample: "files/21_2804_example.mp3",
        textExample: "Ancient hunters melted copper to make knives and spears",
        textExampleTranslate: "Древние охотники плавили медь для изготовления ножей и копий",
        id: 2804,
        word: "copper",
        wordTranslate: "медь"
      },
      {
        audioExample: "files/21_2808_example.mp3",
        textExample: "The rough fabric in his shirt made his neck itch",
        textExampleTranslate: "Грубая ткань в его рубашке заставила его шею зудеть",
        id: 2808,
        word: "itch",
        wordTranslate: "зуд"
      },
      {
        audioExample: "files/21_2814_example.mp3",
        textExample: "Their religion taught that people should forgive their enemies",
        textExampleTranslate: "Их религия учит, что люди должны прощать своих врагов",
        id: 2814,
        word: "religion",
        wordTranslate: "религия"
      },
      {
        audioExample: "files/21_2818_example.mp3",
        textExample: "We need to update the programs on our computers",
        textExampleTranslate: "Нам нужно обновить программы на наших компьютерах",
        id: 2818,
        word: "update",
        wordTranslate: "обновить"
      },
      {
        audioExample: "files/22_2823_example.mp3",
        textExample: "The judge condemned the criminal to five years in prison",
        textExampleTranslate: "Судья осудил преступника на пять лет тюрьмы",
        id: 2823,
        word: "condemn",
        wordTranslate: "осудить"
      }
    ]
  },
  {
    "levelData": {
      id: "5_21",
      name: "Landscape with Cephalus and Procris",
      imageSrc: "level5/5_21.jpg",
      cutSrc: "level5/cut/5_21.jpg",
      author: "KEIRINCKX, Alexander",
      year: "c. 1620"
    },
    words: [
      {
        audioExample: "files/22_2824_example.mp3",
        textExample: "The thick blanket made the bed very cozy",
        textExampleTranslate: "Толстое одеяло сделало кровать очень уютной",
        id: 2824,
        word: "cozy",
        wordTranslate: "уютный"
      },
      {
        audioExample: "files/22_2831_example.mp3",
        textExample: "The girls mocked Nancy because she was a new student",
        textExampleTranslate: "Девочки издевались над Нэнси, потому что она была новой ученицей",
        id: 2831,
        word: "mock",
        wordTranslate: "издеваться"
      },
      {
        audioExample: "files/22_2832_example.mp3",
        textExample: "The girl’s friend remained neutral while the couple was arguing",
        textExampleTranslate: "Подруга девушки оставалась нейтральной, пока пара спорила",
        id: 2832,
        word: "neutral",
        wordTranslate: "нейтральный"
      },
      {
        audioExample: "files/22_2836_example.mp3",
        textExample: "In ancient Egypt, scribes recorded important events",
        textExampleTranslate: "В древнем Египте писцы записывали важные события",
        id: 2836,
        word: "scribe",
        wordTranslate: "писец"
      },
      {
        audioExample: "files/23_2841_example.mp3",
        textExample: "The story in the newspaper wasn’t very accurate",
        textExampleTranslate: "История в газете была не очень точной",
        id: 2841,
        word: "accurate",
        wordTranslate: "точный"
      },
      {
        audioExample: "files/23_2842_example.mp3",
        textExample: "The scientist will analyze the blood sample",
        textExampleTranslate: "Ученый будет анализировать образец крови",
        id: 2842,
        word: "analyze",
        wordTranslate: "анализ"
      },
      {
        audioExample: "files/23_2843_example.mp3",
        textExample: "In 1908, a giant asteroid hit Siberia",
        textExampleTranslate: "В 1908 году гигантский астероид ударил по Сибири",
        id: 2843,
        word: "asteroid",
        wordTranslate: "астероид"
      },
      {
        audioExample: "files/23_2845_example.mp3",
        textExample: "Many people think that humans evolved from animals",
        textExampleTranslate: "Многие люди думают, что люди произошли от животных",
        id: 2845,
        word: "evolve",
        wordTranslate: "эволюционировать"
      },
      {
        audioExample: "files/23_2846_example.mp3",
        textExample: "Smoking is the main factor that causes lung cancer",
        textExampleTranslate: "Курение является основным фактором, вызывающим рак легких",
        id: 2846,
        word: "factor",
        wordTranslate: "фактор"
      },
      {
        audioExample: "files/23_2847_example.mp3",
        textExample: "The color of one’s eyes is genetic",
        textExampleTranslate: "Цвет глаз генетический",
        id: 2847,
        word: "genetic",
        wordTranslate: "генетический"
      }
    ]
  },
  {
    "levelData": {
      id: "5_22",
      name: "Under the Birch Trees",
      imageSrc: "level5/5_22.jpg",
      cutSrc: "level5/cut/5_22.jpg",
      author: "KLODT, Mikhail Konstantinovich",
      year: "1874"
    },
    words: [
      {
        audioExample: "files/23_2848_example.mp3",
        textExample: "Understanding the human genome may help cure many diseases",
        textExampleTranslate: "Понимание генома человека может помочь в лечении многих заболеваний",
        id: 2848,
        word: "genome",
        wordTranslate: "геном"
      },
      {
        audioExample: "files/23_2849_example.mp3",
        textExample: "James and John are identical twins",
        textExampleTranslate: "Джеймс и Джон - идентичные близнецы",
        id: 2849,
        word: "identical",
        wordTranslate: "идентичны"
      },
      {
        audioExample: "files/23_2852_example.mp3",
        textExample: "Even though they live in water, whales are actually mammals",
        textExampleTranslate: "Несмотря на то, что они живут в воде, киты на самом деле являются млекопитающими",
        id: 2852,
        word: "mammal",
        wordTranslate: "млекопитающее"
      },
      {
        audioExample: "files/23_2856_example.mp3",
        textExample: "The bank regulates how much money people can borrow",
        textExampleTranslate: "Банк регулирует, сколько денег люди могут одолжить",
        id: 2856,
        word: "regulate",
        wordTranslate: "регулировать"
      },
      {
        audioExample: "files/23_2857_example.mp3",
        textExample: "Peter reinforced his opinion with information from a book",
        textExampleTranslate: "Петр подкрепил свое мнение информацией из книги",
        id: 2857,
        word: "reinforce",
        wordTranslate: "усилить"
      },
      {
        audioExample: "files/23_2858_example.mp3",
        textExample: "The pilot landed the stricken airplane with difficulty",
        textExampleTranslate: "Пилот с трудом приземлился на пораженный самолет",
        id: 2858,
        word: "stricken",
        wordTranslate: "пострадавший"
      },
      {
        audioExample: "files/24_2861_example.mp3",
        textExample: "I put the fruit in the fruit bowl",
        textExampleTranslate: "Я положил фрукты в вазу с фруктами",
        id: 2861,
        word: "bowl",
        wordTranslate: "миска"
      },
      {
        audioExample: "files/24_2862_example.mp3",
        textExample: "I really enjoy cooking, especially Italian food",
        textExampleTranslate: "Мне очень нравится готовить, особенно итальянская еда",
        id: 2862,
        word: "cooking",
        wordTranslate: "приготовление еды"
      },
      {
        audioExample: "files/24_2863_example.mp3",
        textExample: "I easily became lost in the dense forest",
        textExampleTranslate: "Я легко заблудился в густом лесу",
        id: 2863,
        word: "dense",
        wordTranslate: "плотный"
      },
      {
        audioExample: "files/24_2865_example.mp3",
        textExample: "The loud man dominated the conversation",
        textExampleTranslate: "Громкий человек доминировал в разговоре",
        id: 2865,
        word: "dominate",
        wordTranslate: "доминировать"
      }
    ]
  },
  {
    "levelData": {
      id: "5_23",
      name: "The Musicians' Brawl",
      imageSrc: "level5/5_23.jpg",
      cutSrc: "level5/cut/5_23.jpg",
      author: "LA TOUR, Georges de",
      year: "1625-30"
    },
    words: [
      {
        audioExample: "files/24_2866_example.mp3",
        textExample: "The house’s roof was made of earthen tiles",
        textExampleTranslate: "Крыша дома была сделана из земляной черепицы",
        id: 2866,
        word: "earthen",
        wordTranslate: "земляной"
      },
      {
        audioExample: "files/24_2867_example.mp3",
        textExample: "We were happy to move away from our hostile neighbor",
        textExampleTranslate: "Мы были рады отойти от нашего враждебного соседа",
        id: 2867,
        word: "hostile",
        wordTranslate: "враждебное"
      },
      {
        audioExample: "files/24_2868_example.mp3",
        textExample: "Your answer is incorrect. You need to correct it",
        textExampleTranslate: "Ваш ответ неверный. Вы должны исправить это",
        id: 2868,
        word: "incorrect",
        wordTranslate: "неправильно"
      },
      {
        audioExample: "files/24_2871_example.mp3",
        textExample: "The machine was broken",
        textExampleTranslate: "Машина сломалась",
        id: 2871,
        word: "machine",
        wordTranslate: "машина"
      },
      {
        audioExample: "files/24_2872_example.mp3",
        textExample: "The doctor gave me medication to treat my illness",
        textExampleTranslate: "Доктор дал мне лекарство от моей болезни",
        id: 2872,
        word: "medication",
        wordTranslate: "медикамент"
      },
      {
        audioExample: "files/24_2874_example.mp3",
        textExample: "Free speech had been oppressed in his country",
        textExampleTranslate: "Свобода слова была угнетена в его стране",
        id: 2874,
        word: "oppress",
        wordTranslate: "угнетать"
      },
      {
        audioExample: "files/24_2875_example.mp3",
        textExample: "He peeled the apple before eating it",
        textExampleTranslate: "Он очистил яблоко перед едой",
        id: 2875,
        word: "peel",
        wordTranslate: "корка"
      },
      {
        audioExample: "files/24_2876_example.mp3",
        textExample: "The doctor gave me a prescription for my medication",
        textExampleTranslate: "Доктор дал мне рецепт на мои лекарства",
        id: 2876,
        word: "prescription",
        wordTranslate: "рецепт"
      },
      {
        audioExample: "files/24_2877_example.mp3",
        textExample: "There are clear signs of progress",
        textExampleTranslate: "Есть явные признаки прогресса",
        id: 2877,
        word: "progress",
        wordTranslate: "прогресс"
      },
      {
        audioExample: "files/24_2878_example.mp3",
        textExample: "I love walking on a sandy beach",
        textExampleTranslate: "Я люблю гулять по песчаному пляжу",
        id: 2878,
        word: "sandy",
        wordTranslate: "песчаный"
      }
    ]
  },
  {
    "levelData": {
      id: "5_24",
      name: "Engagement between Sir George Brydges Rodney and the Spanish Squadron",
      imageSrc: "level5/5_24.jpg",
      cutSrc: "level5/cut/5_24.jpg",
      author: "LUNY, Thomas",
      year: "1782"
    },
    words: [
      {
        audioExample: "files/24_2879_example.mp3",
        textExample: "During the dry season, there was a shortage of water",
        textExampleTranslate: "В сухой сезон нехватка воды",
        id: 2879,
        word: "shortage",
        wordTranslate: "дефицит"
      },
      {
        audioExample: "files/24_2880_example.mp3",
        textExample: "The carpenter is very skillful at building houses",
        textExampleTranslate: "Плотник очень умел строить дома",
        id: 2880,
        word: "skillful",
        wordTranslate: "искусный"
      },
      {
        audioExample: "files/25_2883_example.mp3",
        textExample: "The man covered the ground with concrete",
        textExampleTranslate: "Человек покрыл землю бетоном",
        id: 2883,
        word: "concrete",
        wordTranslate: "бетон"
      },
      {
        audioExample: "files/25_2891_example.mp3",
        textExample: "Many birds migrate to warmer countries in the winter",
        textExampleTranslate: "Многие птицы зимой мигрируют в более теплые страны",
        id: 2891,
        word: "migrate",
        wordTranslate: "мигрировать"
      },
      {
        audioExample: "files/25_2896_example.mp3",
        textExample: "There was a secluded bench in the park",
        textExampleTranslate: "В парке была уединенная скамейка",
        id: 2896,
        word: "secluded",
        wordTranslate: "уединенный"
      },
      {
        audioExample: "files/25_2897_example.mp3",
        textExample: "There are 21 different species of butterfly in this forest",
        textExampleTranslate: "В этом лесу 21 вид бабочек",
        id: 2897,
        word: "species",
        wordTranslate: "виды"
      },
      {
        audioExample: "files/25_2898_example.mp3",
        textExample: "There are lots of wild animals living in the swamp",
        textExampleTranslate: "В болоте живет много диких животных",
        id: 2898,
        word: "swamp",
        wordTranslate: "болото"
      },
      {
        audioExample: "files/25_2899_example.mp3",
        textExample: "The explorer traversed the desert alone on a camel",
        textExampleTranslate: "Исследователь пересек пустыню на верблюде",
        id: 2899,
        word: "traverse",
        wordTranslate: "траверс"
      },
      {
        audioExample: "files/26_2903_example.mp3",
        textExample: "Tiredness caused the accident",
        textExampleTranslate: "Усталость стала причиной несчастного случая",
        id: 2903,
        word: "cause",
        wordTranslate: "причина"
      },
      {
        audioExample: "files/26_2905_example.mp3",
        textExample: "The famous lighthouse was designated&nbsp;as a historical monument",
        textExampleTranslate: "Знаменитый маяк был обозначен как исторический памятник",
        id: 2905,
        word: "designate",
        wordTranslate: "назначить"
      }
    ]
  },
  {
    "levelData": {
      id: "5_25",
      name: "Rinaldo's Farewell to Armida",
      imageSrc: "level5/5_25.jpg",
      cutSrc: "level5/cut/5_25.jpg",
      author: "LANFRANCO, Giovanni",
      year: "1614"
    },
    words: [
      {
        audioExample: "files/26_2908_example.mp3",
        textExample: "If you lack energy, try eating better food",
        textExampleTranslate: "Если вам не хватает энергии, попробуйте есть лучшую пищу",
        id: 2908,
        word: "energy",
        wordTranslate: "энергия"
      },
      {
        audioExample: "files/26_2910_example.mp3",
        textExample: "My brother has a car with four gears",
        textExampleTranslate: "У моего брата машина с четырьмя передачами",
        id: 2910,
        word: "gears",
        wordTranslate: "механизмы"
      },
      {
        audioExample: "files/26_2913_example.mp3",
        textExample: "He has trouble putting his knowledge into practice",
        textExampleTranslate: "У него проблемы с применением своих знаний на практике",
        id: 2913,
        word: "knowledge",
        wordTranslate: "знания"
      },
      {
        audioExample: "files/26_2914_example.mp3",
        textExample: "I omitted some important information: he is not coming",
        textExampleTranslate: "Я пропустил важную информацию: он не придет",
        id: 2914,
        word: "omit",
        wordTranslate: "опустить"
      },
      {
        audioExample: "files/26_2915_example.mp3",
        textExample: "Increased wages are offset by higher prices for goods",
        textExampleTranslate: "Повышение заработной платы компенсируется повышением цен на товары",
        id: 2915,
        word: "offset",
        wordTranslate: "смещение"
      },
      {
        audioExample: "files/26_2917_example.mp3",
        textExample: "Her secondhand jeans were a bit faded in the front",
        textExampleTranslate: "Ее подержанные джинсы были немного выцветшими спереди",
        id: 2917,
        word: "secondhand",
        wordTranslate: "подержанный"
      },
      {
        audioExample: "files/26_2918_example.mp3",
        textExample: "She worked with great skill and confidence",
        textExampleTranslate: "Она работала с большим мастерством и уверенностью",
        id: 2918,
        word: "skill",
        wordTranslate: "умение"
      },
      {
        audioExample: "files/26_2919_example.mp3",
        textExample: "To operate the machine, put your coins into the slot",
        textExampleTranslate: "Чтобы управлять машиной, положите свои монеты в слот",
        id: 2919,
        word: "slot",
        wordTranslate: "слот"
      },
      {
        audioExample: "files/26_2920_example.mp3",
        textExample: "Sam thought of a good tactic to attract more business",
        textExampleTranslate: "Сэм подумал о хорошей тактике, чтобы привлечь больше бизнеса",
        id: 2920,
        word: "tactic",
        wordTranslate: "тактика"
      },
      {
        audioExample: "files/27_2921_example.mp3",
        textExample: "Drinking milk every day is beneficial for your bones",
        textExampleTranslate: "Пить молоко каждый день полезно для ваших костей",
        id: 2921,
        word: "beneficial",
        wordTranslate: "выгодно"
      }
    ]
  },
  {
    "levelData": {
      id: "5_26",
      name: "The Excommunication of Robert the Pious",
      imageSrc: "level5/5_26.jpg",
      cutSrc: "level5/cut/5_26.jpg",
      author: "LAURENS, Jean-Paul",
      year: "1875"
    },
    words: [
      {
        audioExample: "files/27_2922_example.mp3",
        textExample: "China is the birthplace of chopsticks",
        textExampleTranslate: "Китай - это родина палочек для еды",
        id: 2922,
        word: "birthplace",
        wordTranslate: "родина"
      },
      {
        audioExample: "files/27_2923_example.mp3",
        textExample: "The parking lot has reached its full capacity",
        textExampleTranslate: "Парковка вышла на полную мощность",
        id: 2923,
        word: "capacity",
        wordTranslate: "вместимость"
      },
      {
        audioExample: "files/27_2925_example.mp3",
        textExample: "The teacher gave us a comprehensive review for the exam",
        textExampleTranslate: "Учитель дал нам исчерпывающий обзор к экзамену",
        id: 2925,
        word: "comprehensive",
        wordTranslate: "всеобъемлющий"
      },
      {
        audioExample: "files/27_2929_example.mp3",
        textExample: "I deposited the money into my bank account",
        textExampleTranslate: "Я положил деньги на свой банковский счет",
        id: 2929,
        word: "deposit",
        wordTranslate: "депозит"
      },
      {
        audioExample: "files/27_2930_example.mp3",
        textExample: "The teacher distributed crayons and markers to her students",
        textExampleTranslate: "Учительница раздавала мелки и маркеры своим ученикам",
        id: 2930,
        word: "distribute",
        wordTranslate: "распространение"
      },
      {
        audioExample: "files/27_2931_example.mp3",
        textExample: "The equator crosses the northern part of South America",
        textExampleTranslate: "Экватор пересекает северную часть Южной Америки",
        id: 2931,
        word: "equator",
        wordTranslate: "экватор"
      },
      {
        audioExample: "files/27_2932_example.mp3",
        textExample: "Rebecca tried many exotic foods on her trip to Africa",
        textExampleTranslate: "Ребекка попробовала много экзотических продуктов в своей поездке в Африку",
        id: 2932,
        word: "exotic",
        wordTranslate: "экзотические"
      },
      {
        audioExample: "files/27_2933_example.mp3",
        textExample: "Sometimes federal laws are different from state laws",
        textExampleTranslate: "Иногда федеральные законы отличаются от законов штата",
        id: 2933,
        word: "federal",
        wordTranslate: "федеральный"
      },
      {
        audioExample: "files/27_2934_example.mp3",
        textExample: "The formation of ice happens when water freezes",
        textExampleTranslate: "Образование льда происходит, когда вода замерзает",
        id: 2934,
        word: "formation",
        wordTranslate: "формирование"
      },
      {
        audioExample: "files/27_2938_example.mp3",
        textExample: "The rainforest is home to many animals",
        textExampleTranslate: "Тропический лес является домом для многих животных",
        id: 2938,
        word: "rainforest",
        wordTranslate: "тропический лес"
      }
    ]
  },
  {
    "levelData": {
      id: "5_27",
      name: "Bacchanal",
      imageSrc: "level5/5_27.jpg",
      cutSrc: "level5/cut/5_27.jpg",
      author: "LAURI, Filippo",
      year: "1675"
    },
    words: [
      {
        audioExample: "files/28_2942_example.mp3",
        textExample: "People define success in many different ways",
        textExampleTranslate: "Люди определяют успех разными способами",
        id: 2942,
        word: "define",
        wordTranslate: "определить"
      },
      {
        audioExample: "files/28_2944_example.mp3",
        textExample: "A balloon will expand as you blow air into it",
        textExampleTranslate: "Воздушный шар будет расширяться, когда вы будете дуть в него воздухом",
        id: 2944,
        word: "expand",
        wordTranslate: "расширить"
      },
      {
        audioExample: "files/28_2945_example.mp3",
        textExample: "The fundamental rules of basketball are easy",
        textExampleTranslate: "Основные правила баскетбола просты",
        id: 2945,
        word: "fundamental",
        wordTranslate: "фундаментальные"
      },
      {
        audioExample: "files/28_2946_example.mp3",
        textExample: "There was a horrifying car accident today",
        textExampleTranslate: "Сегодня произошла ужасная автомобильная авария",
        id: 2946,
        word: "horrifying",
        wordTranslate: "ужаснув"
      },
      {
        audioExample: "files/28_2947_example.mp3",
        textExample: "She was incredulous that monkeys could ever drive a car",
        textExampleTranslate: "Она была недоверчива, что обезьяны могли водить машину",
        id: 2947,
        word: "incredulous",
        wordTranslate: "недоверчивый"
      },
      {
        audioExample: "files/28_2948_example.mp3",
        textExample: "The smell of fresh cookies lingered in the bakery",
        textExampleTranslate: "Запах свежего печенья задержался в пекарне",
        id: 2948,
        word: "linger",
        wordTranslate: "задерживаться"
      },
      {
        audioExample: "files/28_2949_example.mp3",
        textExample: "We studied the organism under the microscope",
        textExampleTranslate: "Мы изучали организм под микроскопом",
        id: 2949,
        word: "organism",
        wordTranslate: "организм"
      },
      {
        audioExample: "files/28_2951_example.mp3",
        textExample: "A plague in Europe killed millions of people",
        textExampleTranslate: "Чума в Европе убила миллионы людей",
        id: 2951,
        word: "plague",
        wordTranslate: "чума"
      },
      {
        audioExample: "files/28_2953_example.mp3",
        textExample: "Young children often ask random questions",
        textExampleTranslate: "Маленькие дети часто задают случайные вопросы",
        id: 2953,
        word: "random",
        wordTranslate: "случайный"
      },
      {
        audioExample: "files/28_2954_example.mp3",
        textExample: "A riot broke out after the candidate lost the election",
        textExampleTranslate: "Бунт начался после того, как кандидат проиграл выборы",
        id: 2954,
        word: "riot",
        wordTranslate: "бунт"
      }
    ]
  },
  {
    "levelData": {
      id: "5_28",
      name: "Venus and Adonis",
      imageSrc: "level5/5_28.jpg",
      cutSrc: "level5/cut/5_28.jpg",
      author: "LAURI, Filippo",
      year: "1650s"
    },
    words: [
      {
        audioExample: "files/28_2956_example.mp3",
        textExample: "He prayed at the shrine for an hour",
        textExampleTranslate: "Он молился в храме в течение часа",
        id: 2956,
        word: "shrine",
        wordTranslate: "святыня"
      },
      {
        audioExample: "files/28_2958_example.mp3",
        textExample: "There is a stark contrast between their test scores",
        textExampleTranslate: "Существует резкий контраст между их оценками",
        id: 2958,
        word: "stark",
        wordTranslate: "застывший"
      },
      {
        audioExample: "files/28_2960_example.mp3",
        textExample: "The weather suddenly worsened, and we had to stay inside",
        textExampleTranslate: "Погода внезапно ухудшилась, и нам пришлось остаться внутри",
        id: 2960,
        word: "worsen",
        wordTranslate: "ухудшить"
      },
      {
        audioExample: "files/29_2962_example.mp3",
        textExample: "Alice is the best candidate for the job",
        textExampleTranslate: "Алиса - лучший кандидат на работу",
        id: 2962,
        word: "candidate",
        wordTranslate: "кандидат"
      },
      {
        audioExample: "files/29_2963_example.mp3",
        textExample: "The information from the meeting is confidential",
        textExampleTranslate: "Информация со встречи является конфиденциальной",
        id: 2963,
        word: "confidential",
        wordTranslate: "конфиденциальный"
      },
      {
        audioExample: "files/29_2964_example.mp3",
        textExample: "Tom enjoys working in the corporate world",
        textExampleTranslate: "Том любит работать в корпоративном мире",
        id: 2964,
        word: "corporate",
        wordTranslate: "корпоративный"
      },
      {
        audioExample: "files/29_2965_example.mp3",
        textExample: "Amy’s blue shirt really enhances the color of her eyes",
        textExampleTranslate: "Синяя рубашка Эми действительно улучшает цвет ее глаз",
        id: 2965,
        word: "enhance",
        wordTranslate: "усилить"
      },
      {
        audioExample: "files/29_2966_example.mp3",
        textExample: "During the medieval era, knights wore protective armor",
        textExampleTranslate: "В эпоху средневековья рыцари носили защитные доспехи",
        id: 2966,
        word: "era",
        wordTranslate: "эра"
      },
      {
        audioExample: "files/29_2971_example.mp3",
        textExample: "Mobile phones are convenient because you can use them anywhere",
        textExampleTranslate: "Мобильные телефоны удобны, потому что вы можете использовать их где угодно",
        id: 2971,
        word: "mobile",
        wordTranslate: "мобильный"
      },
      {
        audioExample: "files/29_2972_example.mp3",
        textExample: "I modified my outfit by adding a belt to it",
        textExampleTranslate: "Я изменил свой наряд, добавив к нему ремень",
        id: 2972,
        word: "modify",
        wordTranslate: "изменить"
      }
    ]
  },
  {
    "levelData": {
      id: "5_29",
      name: "View of Florence from Villa San Firenze, near San Miniato",
      imageSrc: "level5/5_29.jpg",
      cutSrc: "level5/cut/5_29.jpg",
      author: "LEAR, Edward",
      year: "1864"
    },
    words: [
      {
        audioExample: "files/29_2975_example.mp3",
        textExample: "The careless factory polluted the river with chemicals",
        textExampleTranslate: "Неосторожная фабрика загрязнила реку химикатами",
        id: 2975,
        word: "pollute",
        wordTranslate: "загрязнять"
      },
      {
        audioExample: "files/29_2976_example.mp3",
        textExample: "The other students ridicule Peter’s foreign accent",
        textExampleTranslate: "Другие студенты высмеивают иностранный акцент Петра",
        id: 2976,
        word: "ridicule",
        wordTranslate: "насмешка"
      },
      {
        audioExample: "files/29_2977_example.mp3",
        textExample: "Using solar energy is good for the environment",
        textExampleTranslate: "Использование солнечной энергии полезно для окружающей среды",
        id: 2977,
        word: "solar",
        wordTranslate: "солнечный"
      },
      {
        audioExample: "files/29_2978_example.mp3",
        textExample: "Gibraltar is a territory of Great Britain",
        textExampleTranslate: "Гибралтар - это территория Великобритании",
        id: 2978,
        word: "territory",
        wordTranslate: "территория"
      },
      {
        audioExample: "files/29_2979_example.mp3",
        textExample: "My dad is playing in a golf tournament tomorrow",
        textExampleTranslate: "Мой папа играет в турнире по гольфу завтра",
        id: 2979,
        word: "tournament",
        wordTranslate: "турнир"
      },
      {
        audioExample: "files/30_2982_example.mp3",
        textExample: "This fence shows the boundary between our yard and yours",
        textExampleTranslate: "Этот забор показывает границу между нашим двором и вашим",
        id: 2982,
        word: "boundary",
        wordTranslate: "граница"
      },
      {
        audioExample: "files/30_2985_example.mp3",
        textExample: "Hundreds of homes were damaged by the cyclone",
        textExampleTranslate: "Сотни домов пострадали от циклона",
        id: 2985,
        word: "cyclone",
        wordTranslate: "циклон"
      },
      {
        audioExample: "files/30_2990_example.mp3",
        textExample: "He raises poultry and sells their meat for extra money",
        textExampleTranslate: "Он выращивает птицу и продает их мясо за дополнительные деньги",
        id: 2990,
        word: "poultry",
        wordTranslate: "птицы"
      },
      {
        audioExample: "files/30_2991_example.mp3",
        textExample: "The hikers scrambled down the side of the hill",
        textExampleTranslate: "Путешественники спустились по склону холма",
        id: 2991,
        word: "scramble",
        wordTranslate: "свалка"
      },
      {
        audioExample: "files/30_2993_example.mp3",
        textExample: "I was impressed by her sheer dedication to jogging",
        textExampleTranslate: "Я был впечатлен ее преданностью бегу трусцой",
        id: 2993,
        word: "sheer",
        wordTranslate: "чистый"
      }
    ]
  },
  {
    "levelData": {
      id: "6_01",
      name: "River in Winter",
      imageSrc: "level6/6_01.jpg",
      cutSrc: "level6/cut/6_01.jpg",
      author: "NEER, Aert van der",
      year: "c. 1645"
    },
    words: [
      {
        audioExample: "files/01_3003_example.mp3",
        textExample: "I use biodegradable compost to feed my garden",
        textExampleTranslate: "Я использую биоразлагаемый компост, чтобы кормить свой сад",
        id: 3003,
        word: "biodegradable",
        wordTranslate: "биоразлагаемый"
      },
      {
        audioExample: "files/01_3004_example.mp3",
        textExample: "Justine brought a boxed gift to the birthday party",
        textExampleTranslate: "Джастин принесла коробочный подарок на день рождения",
        id: 3004,
        word: "boxed",
        wordTranslate: "боксовый"
      },
      {
        audioExample: "files/01_3005_example.mp3",
        textExample: "The gum Malinda swallowed made her choke",
        textExampleTranslate: "Жвачка, которую Малинда проглотила, заставила ее задохнуться",
        id: 3005,
        word: "choke",
        wordTranslate: "удушение"
      },
      {
        audioExample: "files/01_3007_example.mp3",
        textExample: "After repairing the window, discard any broken glass",
        textExampleTranslate: "После ремонта окна откажитесь от разбитого стекла",
        id: 3007,
        word: "discard",
        wordTranslate: "отбрасывание"
      },
      {
        audioExample: "files/01_3008_example.mp3",
        textExample: "Intelligent dolphins have learned to communicate with humans",
        textExampleTranslate: "Умные дельфины научились общаться с людьми",
        id: 3008,
        word: "dolphin",
        wordTranslate: "дельфин"
      },
      {
        audioExample: "files/01_3009_example.mp3",
        textExample: "We planted our garden according to ecologically correct practices",
        textExampleTranslate: "Мы посадили наш сад в соответствии с экологически правильными методами",
        id: 3009,
        word: "ecologically",
        wordTranslate: "экологически"
      },
      {
        audioExample: "files/01_3010_example.mp3",
        textExample: "Being shot by the attacker proved fatal to the victim",
        textExampleTranslate: "Застрелен нападавшим оказался смертельным для жертвы",
        id: 3010,
        word: "fatal",
        wordTranslate: "фатальным"
      },
      {
        audioExample: "files/01_3011_example.mp3",
        textExample: "We need to increase the incidence of success in school",
        textExampleTranslate: "Нам нужно увеличить частоту успеха в школе",
        id: 3011,
        word: "incidence",
        wordTranslate: "частота"
      },
      {
        audioExample: "files/01_3012_example.mp3",
        textExample: "The municipal parking lot downtown can fit one hundred cars",
        textExampleTranslate: "Муниципальная парковка в центре города может вместить сто автомобилей",
        id: 3012,
        word: "municipal",
        wordTranslate: "муниципальный"
      },
      {
        audioExample: "files/01_3017_example.mp3",
        textExample: "The newspapers were all stuffed into the drawer",
        textExampleTranslate: "Все газеты были спрятаны в ящик",
        id: 3017,
        word: "stuffed",
        wordTranslate: "чучела"
      }
    ]
  },
  {
    "levelData": {
      id: "6_02",
      name: "Card-Sharpers",
      imageSrc: "level6/6_02.jpg",
      cutSrc: "level6/cut/6_02.jpg",
      author: "OOST, Jacob van, the Elder",
      year: "1634"
    },
    words: [
      {
        audioExample: "files/02_3023_example.mp3",
        textExample: "An anonymous donor gave a thousand dollars to the museum",
        textExampleTranslate: "Анонимный донор дал музею тысячу долларов",
        id: 3023,
        word: "anonymous",
        wordTranslate: "анонимный"
      },
      {
        audioExample: "files/02_3027_example.mp3",
        textExample: "The decay in the old building was obvious",
        textExampleTranslate: "Разрушение в старом здании было очевидным",
        id: 3027,
        word: "decay",
        wordTranslate: "затухать"
      },
      {
        audioExample: "files/02_3031_example.mp3",
        textExample: "The Roman Empire flourished in Europe two thousand years ago",
        textExampleTranslate: "Римская империя процветала в Европе две тысячи лет назад",
        id: 3031,
        word: "flourish",
        wordTranslate: "процветать"
      },
      {
        audioExample: "files/02_3034_example.mp3",
        textExample: "The story of King Midas is a story of greed",
        textExampleTranslate: "История царя Мидаса - это история жадности",
        id: 3034,
        word: "greed",
        wordTranslate: "жадность"
      },
      {
        audioExample: "files/02_3039_example.mp3",
        textExample: "The Venus de Milo is a famous ancient Greek statue",
        textExampleTranslate: "Венера Милосская - это знаменитая древнегреческая статуя",
        id: 3039,
        word: "statue",
        wordTranslate: "статуя"
      },
      {
        audioExample: "files/02_3040_example.mp3",
        textExample: "The virgin goddess of the moon was known as Diana",
        textExampleTranslate: "Девственная богиня луны была известна как Диана",
        id: 3040,
        word: "virgin",
        wordTranslate: "девственница"
      },
      {
        audioExample: "files/03_3041_example.mp3",
        textExample: "I felt abnormal this morning, like I was sick",
        textExampleTranslate: "Я чувствовал себя ненормальным сегодня утром, как будто я был болен",
        id: 3041,
        word: "abnormal",
        wordTranslate: "аномальный"
      },
      {
        audioExample: "files/03_3043_example.mp3",
        textExample: "My apartment is adjacent to a lovely park and playground",
        textExampleTranslate: "Моя квартира находится рядом с прекрасным парком и детской площадкой",
        id: 3043,
        word: "adjacent",
        wordTranslate: "смежный"
      },
      {
        audioExample: "files/03_3044_example.mp3",
        textExample: "I used the aluminum foil to wrap the food",
        textExampleTranslate: "Я использовал алюминиевую фольгу, чтобы обернуть еду",
        id: 3044,
        word: "aluminum",
        wordTranslate: "алюминий"
      },
      {
        audioExample: "files/03_3046_example.mp3",
        textExample: "The artificial Christmas tree was made of plastic",
        textExampleTranslate: "Искусственная елка была сделана из пластика",
        id: 3046,
        word: "artificial",
        wordTranslate: "искусственный"
      }
    ]
  },
  {
    "levelData": {
      id: "6_03",
      name: "Farmhouse",
      imageSrc: "level6/6_03.jpg",
      cutSrc: "level6/cut/6_03.jpg",
      author: "OUDRY, Jean-Baptiste",
      year: "1750"
    },
    words: [
      {
        audioExample: "files/03_3047_example.mp3",
        textExample: "I rode my bicycle down the mountain road",
        textExampleTranslate: "Я ехал на велосипеде по горной дороге",
        id: 3047,
        word: "bicycle",
        wordTranslate: "велосипед"
      },
      {
        audioExample: "files/03_3048_example.mp3",
        textExample: "The lawyer will broker our agreement",
        textExampleTranslate: "Юрист подпишет наше соглашение",
        id: 3048,
        word: "broker",
        wordTranslate: "маклер"
      },
      {
        audioExample: "files/03_3050_example.mp3",
        textExample: "The engineer helped to configure my new computer",
        textExampleTranslate: "Инженер помог настроить мой новый компьютер",
        id: 3050,
        word: "configure",
        wordTranslate: "настройка"
      },
      {
        audioExample: "files/03_3053_example.mp3",
        textExample: "I had to deduct my expenses from my checkbook",
        textExampleTranslate: "Я должен был вычесть мои расходы из моей чековой книжки",
        id: 3053,
        word: "deduct",
        wordTranslate: "вычитать"
      },
      {
        audioExample: "files/03_3054_example.mp3",
        textExample: "I deemed the ice cream to be very delicious",
        textExampleTranslate: "Я посчитал мороженое очень вкусным",
        id: 3054,
        word: "deem",
        wordTranslate: "считать"
      },
      {
        audioExample: "files/03_3055_example.mp3",
        textExample: "The entrepreneur made a success out of his new business",
        textExampleTranslate: "Предприниматель добился успеха из своего нового бизнеса",
        id: 3055,
        word: "entrepreneur",
        wordTranslate: "предприниматель"
      },
      {
        audioExample: "files/03_3056_example.mp3",
        textExample: "Sprinkle the sugar evenly all over the cookies",
        textExampleTranslate: "Посыпать сахар равномерно по всему печенью",
        id: 3056,
        word: "evenly",
        wordTranslate: "равномерно"
      },
      {
        audioExample: "files/03_3057_example.mp3",
        textExample: "Did the company show fiscal growth this year?",
        textExampleTranslate: "Показала ли компания рост бюджета в этом году?",
        id: 3057,
        word: "fiscal",
        wordTranslate: "фискальный"
      },
      {
        audioExample: "files/03_3058_example.mp3",
        textExample: "The fast food restaurant has a franchise near my home",
        textExampleTranslate: "У ресторана быстрого питания есть франшиза возле моего дома",
        id: 3058,
        word: "franchise",
        wordTranslate: "франшиза"
      },
      {
        audioExample: "files/03_3059_example.mp3",
        textExample: "The citizens of England had ideological differenes about its government",
        textExampleTranslate: "У граждан Англии были идеологические разногласия относительно ее правительства",
        id: 3059,
        word: "ideological",
        wordTranslate: "идейный"
      }
    ]
  },
  {
    "levelData": {
      id: "6_04",
      name: "An Elegant Company in an Interior",
      imageSrc: "level6/6_04.jpg",
      cutSrc: "level6/cut/6_04.jpg",
      author: "PALAMEDESZ., Anthonie",
      year: "1632-34"
    },
    words: [
      {
        audioExample: "files/04_3065_example.mp3",
        textExample: "Not many plants grow in the arid desert",
        textExampleTranslate: "В засушливой пустыне не так много растений",
        id: 3065,
        word: "arid",
        wordTranslate: "засушливый"
      },
      {
        audioExample: "files/04_3066_example.mp3",
        textExample: "The large cathedral is full of people on Sunday mornings",
        textExampleTranslate: "Большой собор полон людей по воскресным утрам",
        id: 3066,
        word: "cathedral",
        wordTranslate: "собор"
      },
      {
        audioExample: "files/04_3067_example.mp3",
        textExample: "The crisis was over and things returned to normal",
        textExampleTranslate: "Кризис закончился и все нормализовалось",
        id: 3067,
        word: "crisis",
        wordTranslate: "кризис"
      },
      {
        audioExample: "files/04_3072_example.mp3",
        textExample: "He grumbled about having to work late on Friday",
        textExampleTranslate: "Он ворчал по поводу того, что должен был работать допоздна в пятницу",
        id: 3072,
        word: "grumble",
        wordTranslate: "ворчать"
      },
      {
        audioExample: "files/04_3073_example.mp3",
        textExample: "The river curved inland near the campground",
        textExampleTranslate: "Река изогнута внутри страны возле кемпинга",
        id: 3073,
        word: "inland",
        wordTranslate: "вглубь"
      },
      {
        audioExample: "files/04_3078_example.mp3",
        textExample: "Their car couldn’t make it far along the rugged roads",
        textExampleTranslate: "Их машина не могла проехать далеко по бурным дорогам",
        id: 3078,
        word: "rugged",
        wordTranslate: "прочный"
      },
      {
        audioExample: "files/05_3081_example.mp3",
        textExample: "The dolphin is an aquatic mammal",
        textExampleTranslate: "Дельфин - водное млекопитающее",
        id: 3081,
        word: "aquatic",
        wordTranslate: "водные"
      },
      {
        audioExample: "files/05_3082_example.mp3",
        textExample: "Birds, trees, and worms all thrive in the biosphere",
        textExampleTranslate: "Птицы, деревья и черви процветают в биосфере",
        id: 3082,
        word: "biosphere",
        wordTranslate: "биосфера"
      },
      {
        audioExample: "files/05_3084_example.mp3",
        textExample: "Water freezes at zero degrees Celsius",
        textExampleTranslate: "Вода замерзает при нулевых градусах Цельсия",
        id: 3084,
        word: "Celsius",
        wordTranslate: "цельсий"
      },
      {
        audioExample: "files/05_3085_example.mp3",
        textExample: "The coarse sweater made my skin itch",
        textExampleTranslate: "Грубый свитер заставил мою кожу чесаться",
        id: 3085,
        word: "coarse",
        wordTranslate: "грубый"
      }
    ]
  },
  {
    "levelData": {
      id: "6_05",
      name: "View of the Forum Looking towards the Capitol",
      imageSrc: "level6/6_05.jpg",
      cutSrc: "level6/cut/6_05.jpg",
      author: "PANNINI, Giovanni Paolo",
      year: "1751"
    },
    words: [
      {
        audioExample: "files/05_3086_example.mp3",
        textExample: "I always walk to school with my companion Frank",
        textExampleTranslate: "Я всегда хожу в школу с моим компаньоном Фрэнком",
        id: 3086,
        word: "companion",
        wordTranslate: "спутник"
      },
      {
        audioExample: "files/05_3088_example.mp3",
        textExample: "The girls watched television for the duration of the evening",
        textExampleTranslate: "Девушки смотрели телевизор на протяжении всего вечера",
        id: 3088,
        word: "duration",
        wordTranslate: "продолжительность"
      },
      {
        audioExample: "files/05_3090_example.mp3",
        textExample: "The elephant’s standing up on one leg was a feat",
        textExampleTranslate: "Слон стоя на одной ноге был подвигом",
        id: 3090,
        word: "feat",
        wordTranslate: "подвиг"
      },
      {
        audioExample: "files/05_3091_example.mp3",
        textExample: "Many scientists believe that the universe is infinite",
        textExampleTranslate: "Многие ученые считают, что вселенная бесконечна",
        id: 3091,
        word: "infinite",
        wordTranslate: "бесконечный"
      },
      {
        audioExample: "files/05_3092_example.mp3",
        textExample: "The nucleus is made up of many tiny particles",
        textExampleTranslate: "Ядро состоит из множества крошечных частиц",
        id: 3092,
        word: "nucleus",
        wordTranslate: "ядро"
      },
      {
        audioExample: "files/05_3093_example.mp3",
        textExample: "The sick dog was covered in parasites",
        textExampleTranslate: "Больная собака была покрыта паразитами",
        id: 3093,
        word: "parasite",
        wordTranslate: "паразит"
      },
      {
        audioExample: "files/05_3094_example.mp3",
        textExample: "Queen Victoria was a prominent person in history",
        textExampleTranslate: "Королева Виктория была выдающимся человеком в истории",
        id: 3094,
        word: "prominent",
        wordTranslate: "видный"
      },
      {
        audioExample: "files/05_3096_example.mp3",
        textExample: "The reproductive system of a plant is simple",
        textExampleTranslate: "Репродуктивная система растения проста",
        id: 3096,
        word: "reproductive",
        wordTranslate: "репродуктивный"
      },
      {
        audioExample: "files/05_3098_example.mp3",
        textExample: "Boxers have a high tolerance for pain",
        textExampleTranslate: "У боксеров высокая переносимость боли",
        id: 3098,
        word: "tolerance",
        wordTranslate: "толерантность"
      },
      {
        audioExample: "files/05_3099_example.mp3",
        textExample: "The cancer patient undergoes treatments twice a week",
        textExampleTranslate: "Больной раком проходит лечение два раза в неделю",
        id: 3099,
        word: "undergo",
        wordTranslate: "проходить"
      }
    ]
  },
  {
    "levelData": {
      id: "6_06",
      name: "Allegory of Life and Death",
      imageSrc: "level6/6_06.jpg",
      cutSrc: "level6/cut/6_06.jpg",
      author: "PAOLINI, Pietro",
      year: "1628-32"
    },
    words: [
      {
        audioExample: "files/06_3101_example.mp3",
        textExample: "To be competitive, we must update our archaic equipment",
        textExampleTranslate: "Чтобы быть конкурентоспособными, мы должны обновить наше архаичное оборудование",
        id: 3101,
        word: "archaic",
        wordTranslate: "архаичный"
      },
      {
        audioExample: "files/06_3102_example.mp3",
        textExample: "Brass is used to make musical instruments like trumpets",
        textExampleTranslate: "Латунь используется для изготовления музыкальных инструментов, таких как трубы",
        id: 3102,
        word: "brass",
        wordTranslate: "латунь"
      },
      {
        audioExample: "files/06_3103_example.mp3",
        textExample: "Most economies in the world today are based on capitalism",
        textExampleTranslate: "Большинство экономик в мире сегодня основаны на капитализме",
        id: 3103,
        word: "capitalism",
        wordTranslate: "капитализм"
      },
      {
        audioExample: "files/06_3105_example.mp3",
        textExample: "Young children have a dependence on their parents",
        textExampleTranslate: "Маленькие дети зависят от родителей",
        id: 3105,
        word: "dependence",
        wordTranslate: "зависимость"
      },
      {
        audioExample: "files/06_3106_example.mp3",
        textExample: "As the economy got worse, my savings diminished",
        textExampleTranslate: "По мере ухудшения экономики мои сбережения уменьшались",
        id: 3106,
        word: "diminish",
        wordTranslate: "уменьшить"
      },
      {
        audioExample: "files/06_3109_example.mp3",
        textExample: "The tourist industry is doing well all around the world",
        textExampleTranslate: "Туристическая индустрия процветает во всем мире",
        id: 3109,
        word: "industry",
        wordTranslate: "промышленность"
      },
      {
        audioExample: "files/06_3110_example.mp3",
        textExample: "Nancy has a managerial position at the bank",
        textExampleTranslate: "Нэнси занимает руководящую должность в банке",
        id: 3110,
        word: "managerial",
        wordTranslate: "управленческий"
      },
      {
        audioExample: "files/06_3111_example.mp3",
        textExample: "We visited a castle that was built during medieval times",
        textExampleTranslate: "Мы посетили замок, который был построен во времена средневековья",
        id: 3111,
        word: "medieval",
        wordTranslate: "средневековый"
      },
      {
        audioExample: "files/06_3112_example.mp3",
        textExample: "Since computers became inexpensive, typewriters have become obsolete",
        textExampleTranslate: "Поскольку компьютеры стали недорогими, пишущие машинки устарели",
        id: 3112,
        word: "obsolete",
        wordTranslate: "устаревшие"
      },
      {
        audioExample: "files/06_3113_example.mp3",
        textExample: "He is living a money-oriented lifestyle",
        textExampleTranslate: "Он живет ориентированным на деньги образом жизни",
        id: 3113,
        word: "oriented",
        wordTranslate: "ориентированный"
      }
    ]
  },
  {
    "levelData": {
      id: "6_07",
      name: "View of a Southern Coast",
      imageSrc: "level6/6_07.jpg",
      cutSrc: "level6/cut/6_07.jpg",
      author: "PEETERS, Bonaventura",
      year: "1652"
    },
    words: [
      {
        audioExample: "files/06_3114_example.mp3",
        textExample: "The state of Florida is an example of a peninsula",
        textExampleTranslate: "Штат Флорида является примером полуострова",
        id: 3114,
        word: "peninsula",
        wordTranslate: "полуостров"
      },
      {
        audioExample: "files/07_3121_example.mp3",
        textExample: "The accountant helped us keep track of our spending",
        textExampleTranslate: "Бухгалтер помог нам отслеживать наши расходы",
        id: 3121,
        word: "accountant",
        wordTranslate: "бухгалтер"
      },
      {
        audioExample: "files/07_3123_example.mp3",
        textExample: "The judge had contempt for the wicked criminal",
        textExampleTranslate: "Судья презирал злого преступника",
        id: 3123,
        word: "contempt",
        wordTranslate: "презрение"
      },
      {
        audioExample: "files/07_3124_example.mp3",
        textExample: "I had a good crop of onions this year",
        textExampleTranslate: "У меня был хороший урожай лука в этом году",
        id: 3124,
        word: "crop",
        wordTranslate: "подрезать"
      },
      {
        audioExample: "files/07_3125_example.mp3",
        textExample: "The nun dedicated herself to helping people in need",
        textExampleTranslate: "Монахиня посвятила себя помощи нуждающимся людям",
        id: 3125,
        word: "dedicate",
        wordTranslate: "посвятить"
      },
      {
        audioExample: "files/07_3127_example.mp3",
        textExample: "My father owns an advertising enterprise",
        textExampleTranslate: "Мой отец владеет рекламным предприятием",
        id: 3127,
        word: "enterprise",
        wordTranslate: "предприятие"
      },
      {
        audioExample: "files/07_3128_example.mp3",
        textExample: "The government financed the scientist’s experiments with new weapons",
        textExampleTranslate: "Правительство финансировало эксперименты ученого с новым оружием",
        id: 3128,
        word: "finance",
        wordTranslate: "финансирование"
      },
      {
        audioExample: "files/07_3131_example.mp3",
        textExample: "You should exercise regularly to maximize a healthy lifestyle",
        textExampleTranslate: "Вы должны регулярно заниматься спортом, чтобы максимизировать здоровый образ жизни",
        id: 3131,
        word: "maximize",
        wordTranslate: "максимизировать"
      },
      {
        audioExample: "files/07_3137_example.mp3",
        textExample: "He always sows his garden seeds in the springtime",
        textExampleTranslate: "Он всегда сеет семена своего сада весной",
        id: 3137,
        word: "sow",
        wordTranslate: "сеют"
      },
      {
        audioExample: "files/07_3139_example.mp3",
        textExample: "I like tomato sandwiches",
        textExampleTranslate: "Я люблю томатные бутерброды",
        id: 3139,
        word: "tomato",
        wordTranslate: "помидор"
      }
    ]
  },
  {
    "levelData": {
      id: "6_08",
      name: "A Cowherd at Pontoise",
      imageSrc: "level6/6_08.jpg",
      cutSrc: "level6/cut/6_08.jpg",
      author: "PISSARRO, Camille",
      year: "1874"
    },
    words: [
      {
        audioExample: "files/07_3140_example.mp3",
        textExample: "The kids were worried about their upcoming exam",
        textExampleTranslate: "Дети были обеспокоены предстоящим экзаменом",
        id: 3140,
        word: "upcoming",
        wordTranslate: "предстоящие"
      },
      {
        audioExample: "files/08_3142_example.mp3",
        textExample: "Everyone cheered and applauded Manny’s efforts",
        textExampleTranslate: "Все приветствовали и приветствовали усилия Мэнни",
        id: 3142,
        word: "applaud",
        wordTranslate: "аплодировать"
      },
      {
        audioExample: "files/08_3147_example.mp3",
        textExample: "The king ruled for ten consecutive years",
        textExampleTranslate: "Король правил десять лет подряд",
        id: 3147,
        word: "consecutive",
        wordTranslate: "подряд"
      },
      {
        audioExample: "files/08_3150_example.mp3",
        textExample: "I asked my boss for feedback on my work",
        textExampleTranslate: "Я попросил моего босса оставить отзыв о моей работе",
        id: 3150,
        word: "feedback",
        wordTranslate: "обратная связь"
      },
      {
        audioExample: "files/08_3152_example.mp3",
        textExample: "American football is usually considered a masculine sport",
        textExampleTranslate: "Американский футбол обычно считается мужским видом спорта",
        id: 3152,
        word: "masculine",
        wordTranslate: "мужской"
      },
      {
        audioExample: "files/08_3153_example.mp3",
        textExample: "A large monument was built to honor the brave soldiers",
        textExampleTranslate: "Большой памятник был построен в честь храбрых солдат",
        id: 3153,
        word: "monument",
        wordTranslate: "памятник"
      },
      {
        audioExample: "files/08_3154_example.mp3",
        textExample: "He exercised regularly so that his body could become muscular",
        textExampleTranslate: "Он регулярно тренируется, чтобы его тело стало мускулистым",
        id: 3154,
        word: "muscular",
        wordTranslate: "мускулистый"
      },
      {
        audioExample: "files/08_3155_example.mp3",
        textExample: "Your back will feel better if you improve your posture",
        textExampleTranslate: "Ваша спина будет чувствовать себя лучше, если вы улучшите осанку",
        id: 3155,
        word: "posture",
        wordTranslate: "поза"
      },
      {
        audioExample: "files/08_3156_example.mp3",
        textExample: "The road was situated between the forest and the lake",
        textExampleTranslate: "Дорога шла между лесом и озером",
        id: 3156,
        word: "situate",
        wordTranslate: "размещать"
      },
      {
        audioExample: "files/08_3157_example.mp3",
        textExample: "Allen supervised the construction workers to ensure everyone’s safety",
        textExampleTranslate: "Аллен контролировал строителей, чтобы обеспечить безопасность каждого",
        id: 3157,
        word: "supervise",
        wordTranslate: "контролировать"
      }
    ]
  },
  {
    "levelData": {
      id: "6_09",
      name: "Lordship Lane Station, Dulwich",
      imageSrc: "level6/6_09.jpg",
      cutSrc: "level6/cut/6_09.jpg",
      author: "PISSARRO, Camille",
      year: "1871"
    },
    words: [
      {
        audioExample: "files/08_3159_example.mp3",
        textExample: "The surfer had tattoos on both his arms",
        textExampleTranslate: "У серфера были татуировки на обеих руках",
        id: 3159,
        word: "tattoo",
        wordTranslate: "тату"
      },
      {
        audioExample: "files/09_3163_example.mp3",
        textExample: "These apples are too rotten for consumption",
        textExampleTranslate: "Эти яблоки слишком гнилые для потребления",
        id: 3163,
        word: "consumption",
        wordTranslate: "потребление"
      },
      {
        audioExample: "files/09_3165_example.mp3",
        textExample: "The little boy never ate the crust of his pizza",
        textExampleTranslate: "Маленький мальчик никогда не ел корочку своей пиццы",
        id: 3165,
        word: "crust",
        wordTranslate: "корочка"
      },
      {
        audioExample: "files/09_3167_example.mp3",
        textExample: "Her bodyguards escorted her to the movie theater",
        textExampleTranslate: "Ее телохранители проводили ее в кинотеатр",
        id: 3167,
        word: "escort",
        wordTranslate: "эскорт"
      },
      {
        audioExample: "files/09_3169_example.mp3",
        textExample: "There are many educational facilities in big cities",
        textExampleTranslate: "В больших городах много учебных заведений",
        id: 3169,
        word: "facility",
        wordTranslate: "объект"
      },
      {
        audioExample: "files/09_3170_example.mp3",
        textExample: "The boy’s mental faculties impressed all of his teachers",
        textExampleTranslate: "Умственные способности мальчика поразили всех его учителей",
        id: 3170,
        word: "faculty",
        wordTranslate: "факультет"
      },
      {
        audioExample: "files/09_3175_example.mp3",
        textExample: "He licked his ice cream before it melted",
        textExampleTranslate: "Он облизал свое мороженое до того, как оно растаяло",
        id: 3175,
        word: "lick",
        wordTranslate: "лизать"
      },
      {
        audioExample: "files/09_3176_example.mp3",
        textExample: "The woman kept some colorful ornaments on the shelves",
        textExampleTranslate: "Женщина держала на полках несколько разноцветных украшений",
        id: 3176,
        word: "ornament",
        wordTranslate: "орнамент"
      },
      {
        audioExample: "files/09_3177_example.mp3",
        textExample: "Drivers should be careful when pedestrians are walking around",
        textExampleTranslate: "Водители должны быть осторожны, когда вокруг гуляют пешеходы",
        id: 3177,
        word: "pedestrian",
        wordTranslate: "пешеход"
      },
      {
        audioExample: "files/09_3179_example.mp3",
        textExample: "There were thousands of spectators at the big game",
        textExampleTranslate: "На большой игре присутствовали тысячи зрителей",
        id: 3179,
        word: "spectator",
        wordTranslate: "зритель"
      }
    ]
  },
  {
    "levelData": {
      id: "6_10",
      name: "Children of Frederick V Prince Elector of Pfalz and King of Bohemia",
      imageSrc: "level6/6_10.jpg",
      cutSrc: "level6/cut/6_10.jpg",
      author: "POELENBURGH, Cornelis van",
      year: "1628"
    },
    words: [
      {
        audioExample: "files/09_3180_example.mp3",
        textExample: "Someone yelled out his name",
        textExampleTranslate: "Кто-то выкрикнул его имя",
        id: 3180,
        word: "yell",
        wordTranslate: "орать"
      },
      {
        audioExample: "files/10_3181_example.mp3",
        textExample: "The store sold colorful accessories like bags, sunglasses, and makeup",
        textExampleTranslate: "В магазине продавались красочные аксессуары, такие как сумки, солнцезащитные очки и косметика",
        id: 3181,
        word: "accessory",
        wordTranslate: "аксессуар"
      },
      {
        audioExample: "files/10_3185_example.mp3",
        textExample: "She gave the teacher an elaborate explanation of her project",
        textExampleTranslate: "Она дала учителю подробное объяснение своего проекта",
        id: 3185,
        word: "elaborate",
        wordTranslate: "разрабатывать"
      },
      {
        audioExample: "files/10_3187_example.mp3",
        textExample: "To facilitate the meeting, Melissa used a simple computer program",
        textExampleTranslate: "Чтобы облегчить встречу, Мелисса использовала простую компьютерную программу",
        id: 3187,
        word: "facilitate",
        wordTranslate: "облегчить"
      },
      {
        audioExample: "files/10_3189_example.mp3",
        textExample: "We located our town using the grid",
        textExampleTranslate: "Мы нашли наш город, используя сетку",
        id: 3189,
        word: "grid",
        wordTranslate: "сетка"
      },
      {
        audioExample: "files/10_3190_example.mp3",
        textExample: "Foods that have been imported are usually more expensive",
        textExampleTranslate: "Продукты, которые были импортированы, обычно дороже",
        id: 3190,
        word: "import",
        wordTranslate: "импортировать"
      },
      {
        audioExample: "files/10_3192_example.mp3",
        textExample: "I helped him infate the balloons",
        textExampleTranslate: "Я помог ему раздувать воздушные шары",
        id: 3192,
        word: "inflate",
        wordTranslate: "надуть"
      },
      {
        audioExample: "files/10_3193_example.mp3",
        textExample: "He had the innate desire to please his teachers",
        textExampleTranslate: "У него было врожденное желание угодить своим учителям",
        id: 3193,
        word: "innate",
        wordTranslate: "врожденный"
      },
      {
        audioExample: "files/10_3194_example.mp3",
        textExample: "The large house had floors made of marble",
        textExampleTranslate: "В большом доме были полы из мрамора",
        id: 3194,
        word: "marble",
        wordTranslate: "мрамор"
      },
      {
        audioExample: "files/10_3195_example.mp3",
        textExample: "The mast held both sails of the ship upright",
        textExampleTranslate: "Мачта держала оба паруса корабля в вертикальном положении",
        id: 3195,
        word: "mast",
        wordTranslate: "тучный"
      }
    ]
  },
  {
    "levelData": {
      id: "6_11",
      name: "Capriccio View of Rome with the Martyrdom of St Lawrence",
      imageSrc: "level6/6_11.jpg",
      cutSrc: "level6/cut/6_11.jpg",
      author: "POELENBURGH, Cornelis van",
      year: "1622-25"
    },
    words: [
      {
        audioExample: "files/10_3198_example.mp3",
        textExample: "I keep my money in a small pouch",
        textExampleTranslate: "Я храню свои деньги в маленьком мешочке",
        id: 3198,
        word: "pouch",
        wordTranslate: "мешочек"
      },
      {
        audioExample: "files/10_3199_example.mp3",
        textExample: "Leigh’s hair became saturated in the rainstorm",
        textExampleTranslate: "Волосы Ли стали насыщенными дождем",
        id: 3199,
        word: "saturated",
        wordTranslate: "насыщенный"
      },
      {
        audioExample: "files/10_3200_example.mp3",
        textExample: "My phone is downloading a software update",
        textExampleTranslate: "Мой телефон загружает обновление программного обеспечения",
        id: 3200,
        word: "update",
        wordTranslate: "обновить"
      },
      {
        audioExample: "files/11_3201_example.mp3",
        textExample: "The attorney appeared in front of the judge for me",
        textExampleTranslate: "Адвокат предстал перед судьей для меня",
        id: 3201,
        word: "attorney",
        wordTranslate: "адвокат"
      },
      {
        audioExample: "files/11_3204_example.mp3",
        textExample: "He was proud to be a blood donor",
        textExampleTranslate: "Он был горд быть донором крови",
        id: 3204,
        word: "donor",
        wordTranslate: "донор"
      },
      {
        audioExample: "files/11_3208_example.mp3",
        textExample: "The wall was covered with colorful graffiti",
        textExampleTranslate: "Стена была покрыта разноцветными граффити",
        id: 3208,
        word: "graffiti",
        wordTranslate: "граффити"
      },
      {
        audioExample: "files/11_3209_example.mp3",
        textExample: "The librarians are the guardians of the books",
        textExampleTranslate: "Библиотекари являются хранителями книг",
        id: 3209,
        word: "guardian",
        wordTranslate: "опекун"
      },
      {
        audioExample: "files/11_3210_example.mp3",
        textExample: "The man was implicated in the theft at the store",
        textExampleTranslate: "Человек был замешан в краже в магазине",
        id: 3210,
        word: "implicate",
        wordTranslate: "имплицитный"
      },
      {
        audioExample: "files/11_3211_example.mp3",
        textExample: "His kin were all farmers",
        textExampleTranslate: "Все его родственники были фермерами",
        id: 3211,
        word: "kin",
        wordTranslate: "род"
      },
      {
        audioExample: "files/11_3212_example.mp3",
        textExample: "The soccer player didn’t agree with the referee",
        textExampleTranslate: "Футболист не согласен с рефери",
        id: 3212,
        word: "referee",
        wordTranslate: "судья"
      }
    ]
  },
  {
    "levelData": {
      id: "6_12",
      name: "Landscape with Shepherdess and Shepherd Playing Flute",
      imageSrc: "level6/6_12.jpg",
      cutSrc: "level6/cut/6_12.jpg",
      author: "POTTER, Paulus",
      year: "c. 1643"
    },
    words: [
      {
        audioExample: "files/11_3213_example.mp3",
        textExample: "He severed the string using scissors",
        textExampleTranslate: "Он перерезал нить, используя ножницы",
        id: 3213,
        word: "sever",
        wordTranslate: "север"
      },
      {
        audioExample: "files/11_3218_example.mp3",
        textExample: "The trip was terminated after the car broke down",
        textExampleTranslate: "Поездка была прекращена после поломки машины",
        id: 3218,
        word: "terminate",
        wordTranslate: "прекратить"
      },
      {
        audioExample: "files/11_3219_example.mp3",
        textExample: "The students discussed the book’s theme in class",
        textExampleTranslate: "Студенты обсуждали тему книги в классе",
        id: 3219,
        word: "theme",
        wordTranslate: "тема"
      },
      {
        audioExample: "files/12_3222_example.mp3",
        textExample: "She was denied amnesty for her involvement in the war",
        textExampleTranslate: "Ей было отказано в амнистии за участие в войне",
        id: 3222,
        word: "amnesty",
        wordTranslate: "амнистия"
      },
      {
        audioExample: "files/12_3226_example.mp3",
        textExample: "The two warriors were locked in combat",
        textExampleTranslate: "Два воина были заперты в бою",
        id: 3226,
        word: "combat",
        wordTranslate: "боевой"
      },
      {
        audioExample: "files/12_3227_example.mp3",
        textExample: "There is nothing commonplace about the way Morris dresses",
        textExampleTranslate: "Нет ничего общего в том, как Моррис одевается",
        id: 3227,
        word: "commonplace",
        wordTranslate: "обычное дело"
      },
      {
        audioExample: "files/12_3234_example.mp3",
        textExample: "She liked to meditate for several hours each day",
        textExampleTranslate: "Ей нравилось медитировать по несколько часов каждый день",
        id: 3234,
        word: "meditate",
        wordTranslate: "медитировать"
      },
      {
        audioExample: "files/12_3236_example.mp3",
        textExample: "The older boy provoked Paul by calling him mean names",
        textExampleTranslate: "Старший мальчик спровоцировал Пола, назвав его подлыми именами",
        id: 3236,
        word: "provoke",
        wordTranslate: "спровоцировать"
      },
      {
        audioExample: "files/12_3237_example.mp3",
        textExample: "He was not very active in the realm of business",
        textExampleTranslate: "Он был не очень активен в сфере бизнеса",
        id: 3237,
        word: "realm",
        wordTranslate: "царство"
      },
      {
        audioExample: "files/12_3238_example.mp3",
        textExample: "The emperor’s reign lasted for only two years",
        textExampleTranslate: "Царствование императора длилось всего два года",
        id: 3238,
        word: "reign",
        wordTranslate: "царствовать"
      }
    ]
  },
  {
    "levelData": {
      id: "6_13",
      name: "Fisherwomen by the Shore",
      imageSrc: "level6/6_13.jpg",
      cutSrc: "level6/cut/6_13.jpg",
      author: "RASMUSSEN, Georg Anton",
      year: "1883"
    },
    words: [
      {
        audioExample: "files/13_3241_example.mp3",
        textExample: "The dresses were noteworthy for their aesthetic design",
        textExampleTranslate: "Платья были примечательны своим эстетическим дизайном",
        id: 3241,
        word: "aesthetic",
        wordTranslate: "эстетический"
      },
      {
        audioExample: "files/13_3250_example.mp3",
        textExample: "The rotten apple left a nasty taste inside her mouth",
        textExampleTranslate: "Гнилое яблоко оставило неприятный вкус во рту",
        id: 3250,
        word: "nasty",
        wordTranslate: "противный"
      },
      {
        audioExample: "files/13_3256_example.mp3",
        textExample: "The wood we found was full of termites",
        textExampleTranslate: "Лес, который мы нашли, был полон термитов",
        id: 3256,
        word: "termite",
        wordTranslate: "термит"
      },
      {
        audioExample: "files/13_3259_example.mp3",
        textExample: "They started the fire with a handful of dry twigs",
        textExampleTranslate: "Они начали огонь с горстки сухих веток",
        id: 3259,
        word: "twig",
        wordTranslate: "прут"
      },
      {
        audioExample: "files/14_3263_example.mp3",
        textExample: "The North Pole is covered by a huge glacier",
        textExampleTranslate: "Северный полюс покрыт огромным ледником",
        id: 3263,
        word: "glacier",
        wordTranslate: "ледник"
      },
      {
        audioExample: "files/14_3264_example.mp3",
        textExample: "Water covers most of the globe",
        textExampleTranslate: "Вода покрывает большую часть земного шара",
        id: 3264,
        word: "globe",
        wordTranslate: "глобус"
      },
      {
        audioExample: "files/14_3266_example.mp3",
        textExample: "The man hummed his favorite song",
        textExampleTranslate: "Человек напевал свою любимую песню",
        id: 3266,
        word: "hum",
        wordTranslate: "гул"
      },
      {
        audioExample: "files/14_3269_example.mp3",
        textExample: "Could you please buy a loaf of bread for sandwiches?",
        textExampleTranslate: "Не могли бы вы купить буханку хлеба для бутербродов?",
        id: 3269,
        word: "loaf",
        wordTranslate: "буханка"
      },
      {
        audioExample: "files/14_3271_example.mp3",
        textExample: "The Moon orbits the Earth",
        textExampleTranslate: "Луна вращается вокруг Земли",
        id: 3271,
        word: "orbit",
        wordTranslate: "орбита"
      },
      {
        audioExample: "files/14_3273_example.mp3",
        textExample: "The band played us a preview of their new song",
        textExampleTranslate: "Группа сыграла нам превью своей новой песни",
        id: 3273,
        word: "preview",
        wordTranslate: "предварительный просмотр"
      }
    ]
  },
  {
    "levelData": {
      id: "6_14",
      name: "Fjord in Norway",
      imageSrc: "level6/6_14.jpg",
      cutSrc: "level6/cut/6_14.jpg",
      author: "RASMUSSEN, Georg Anton",
      year: "1891"
    },
    words: [
      {
        audioExample: "files/14_3276_example.mp3",
        textExample: "Burglaries seem to recur over and over in our neighborhood",
        textExampleTranslate: "Кажется, что кражи со взломом повторяются в нашем районе",
        id: 3276,
        word: "recur",
        wordTranslate: "повторялись"
      },
      {
        audioExample: "files/14_3279_example.mp3",
        textExample: "If you give the car a push, it won’t stall",
        textExampleTranslate: "Если вы толкнете машину, она не остановится",
        id: 3279,
        word: "stall",
        wordTranslate: "стойло"
      },
      {
        audioExample: "files/15_3282_example.mp3",
        textExample: "The classroom had many arbitrary rules that confused me",
        textExampleTranslate: "В классе было много произвольных правил, которые смущали меня",
        id: 3282,
        word: "arbitrary",
        wordTranslate: "произвольное"
      },
      {
        audioExample: "files/15_3283_example.mp3",
        textExample: "I read an autobiography about my favorite entertainer",
        textExampleTranslate: "Я прочитал автобиографию о моем любимом артисте",
        id: 3283,
        word: "autobiography",
        wordTranslate: "автобиография"
      },
      {
        audioExample: "files/15_3287_example.mp3",
        textExample: "People can conserve energy by insulating their houses",
        textExampleTranslate: "Люди могут экономить энергию, изолируя свои дома",
        id: 3287,
        word: "insulate",
        wordTranslate: "изолирует"
      },
      {
        audioExample: "files/15_3288_example.mp3",
        textExample: "Her mysterious past intrigued her new friend",
        textExampleTranslate: "Ее таинственное прошлое заинтриговало ее нового друга",
        id: 3288,
        word: "intrigue",
        wordTranslate: "интрига"
      },
      {
        audioExample: "files/15_3289_example.mp3",
        textExample: "Sea turtles have an amazing longevity",
        textExampleTranslate: "Морские черепахи имеют удивительное долголетие",
        id: 3289,
        word: "longevity",
        wordTranslate: "долголетие"
      },
      {
        audioExample: "files/15_3293_example.mp3",
        textExample: "Orangutans use their long arms to swing from trees",
        textExampleTranslate: "Орангутаны используют свои длинные руки, чтобы качаться с деревьев",
        id: 3293,
        word: "orangutan",
        wordTranslate: "орангутанг"
      },
      {
        audioExample: "files/15_3294_example.mp3",
        textExample: "If you overload the truck, it might crash",
        textExampleTranslate: "Если перегрузить грузовик, он может разбиться",
        id: 3294,
        word: "overload",
        wordTranslate: "перегрузка"
      },
      {
        audioExample: "files/15_3297_example.mp3",
        textExample: "I was the recipient of four phone calls today",
        textExampleTranslate: "Я был получателем четырех телефонных звонков сегодня",
        id: 3297,
        word: "recipient",
        wordTranslate: "получатель"
      }
    ]
  },
  {
    "levelData": {
      id: "6_15",
      name: "The Pont des Arts, Paris",
      imageSrc: "level6/6_15.jpg",
      cutSrc: "level6/cut/6_15.jpg",
      author: "RENOIR, Pierre-Auguste",
      year: "1867"
    },
    words: [
      {
        audioExample: "files/15_3298_example.mp3",
        textExample: "Lizards are my favorite type of reptile",
        textExampleTranslate: "Ящерицы - мой любимый тип рептилий",
        id: 3298,
        word: "reptile",
        wordTranslate: "рептилия"
      },
      {
        audioExample: "files/16_3303_example.mp3",
        textExample: "We studied artifacts from an ancient Chinese settlement",
        textExampleTranslate: "Мы изучали артефакты из древнего китайского поселения",
        id: 3303,
        word: "artifact",
        wordTranslate: "артефакт"
      },
      {
        audioExample: "files/16_3304_example.mp3",
        textExample: "We ate authentic Italian food on our vacation to Rome",
        textExampleTranslate: "Мы ели настоящую итальянскую еду во время нашего отпуска в Риме",
        id: 3304,
        word: "authentic",
        wordTranslate: "подлинный"
      },
      {
        audioExample: "files/16_3306_example.mp3",
        textExample: "The Spanish diplomat discussed trade issues with officials in Peru",
        textExampleTranslate: "Испанский дипломат обсудил вопросы торговли с официальными лицами в Перу",
        id: 3306,
        word: "diplomat",
        wordTranslate: "дипломат"
      },
      {
        audioExample: "files/16_3311_example.mp3",
        textExample: "I enjoy reading and creating my own lyric poetry",
        textExampleTranslate: "Мне нравится читать и создавать свои собственные лирические стихи",
        id: 3311,
        word: "lyric",
        wordTranslate: "лирические"
      },
      {
        audioExample: "files/16_3316_example.mp3",
        textExample: "We successfully recruited someone to be the new manager",
        textExampleTranslate: "Мы успешно завербовали кого-то, чтобы стать новым менеджером",
        id: 3316,
        word: "recruit",
        wordTranslate: "принять на работу"
      },
      {
        audioExample: "files/16_3319_example.mp3",
        textExample: "Michael is a singer of great renown in New Zealand",
        textExampleTranslate: "Майкл - певец с большой известностью в Новой Зеландии",
        id: 3319,
        word: "renown",
        wordTranslate: "известность"
      },
      {
        audioExample: "files/17_3326_example.mp3",
        textExample: "The company’s new advertising endeavor ended in a horrible failure",
        textExampleTranslate: "Новые рекламные усилия компании закончились ужасным провалом",
        id: 3326,
        word: "endeavor",
        wordTranslate: "стремиться"
      },
      {
        audioExample: "files/17_3327_example.mp3",
        textExample: "The couple engraved their names onto the old pine tree",
        textExampleTranslate: "Пара выгравировала их имена на старой сосне",
        id: 3327,
        word: "engrave",
        wordTranslate: "гравировать"
      },
      {
        audioExample: "files/17_3331_example.mp3",
        textExample: "This was a discovery of great magnitude",
        textExampleTranslate: "Это было открытие огромной величины",
        id: 3331,
        word: "magnitude",
        wordTranslate: "величина"
      }
    ]
  },
  {
    "levelData": {
      id: "6_16",
      name: "A Capriccio Landscape with a Domed Church",
      imageSrc: "level6/6_16.jpg",
      cutSrc: "level6/cut/6_16.jpg",
      author: "RICCI, Marco",
      year: "1710s"
    },
    words: [
      {
        audioExample: "files/17_3333_example.mp3",
        textExample: "Everyone knew that the boy’s story was an outright lie",
        textExampleTranslate: "Все знали, что история мальчика была откровенной ложью",
        id: 3333,
        word: "outright",
        wordTranslate: "вчистую"
      },
      {
        audioExample: "files/17_3337_example.mp3",
        textExample: "We studied the skeletal system in anatomy class",
        textExampleTranslate: "Мы изучали скелетную систему в классе анатомии",
        id: 3337,
        word: "skeletal",
        wordTranslate: "скелет"
      },
      {
        audioExample: "files/17_3338_example.mp3",
        textExample: "She stumbles a lot when she is drunk",
        textExampleTranslate: "Она много спотыкается, когда пьяна",
        id: 3338,
        word: "stumble",
        wordTranslate: "спотыкаться"
      },
      {
        audioExample: "files/17_3339_example.mp3",
        textExample: "He suffered from a serious thigh injury",
        textExampleTranslate: "Он получил серьезную травму бедра",
        id: 3339,
        word: "thigh",
        wordTranslate: "бедренная кость"
      },
      {
        audioExample: "files/17_3340_example.mp3",
        textExample: "The vicious dog tried to bite the small child",
        textExampleTranslate: "Злобная собака пыталась укусить маленького ребенка",
        id: 3340,
        word: "vicious",
        wordTranslate: "порочный"
      },
      {
        audioExample: "files/18_3341_example.mp3",
        textExample: "There were two windows in their attic",
        textExampleTranslate: "На чердаке было два окна",
        id: 3341,
        word: "attic",
        wordTranslate: "чердак"
      },
      {
        audioExample: "files/18_3343_example.mp3",
        textExample: "Most of the important civic buildings are located downtown",
        textExampleTranslate: "Большинство важных гражданских зданий расположены в центре города",
        id: 3343,
        word: "civic",
        wordTranslate: "гражданский"
      },
      {
        audioExample: "files/18_3346_example.mp3",
        textExample: "He was dissatisfied with his meal",
        textExampleTranslate: "Он был недоволен своей едой",
        id: 3346,
        word: "dissatisfy",
        wordTranslate: "разочарует"
      },
      {
        audioExample: "files/18_3350_example.mp3",
        textExample: "Mary forgot the key. Hence, we couldn’t open the door",
        textExampleTranslate: "Мэри забыла ключ. Следовательно, мы не могли открыть дверь",
        id: 3350,
        word: "hence",
        wordTranslate: "следовательно"
      },
      {
        audioExample: "files/18_3352_example.mp3",
        textExample: "The soup was being cooked in a large kettle",
        textExampleTranslate: "Суп готовили в большом чайнике",
        id: 3352,
        word: "kettle",
        wordTranslate: "чайник"
      }
    ]
  },
  {
    "levelData": {
      id: "6_17",
      name: "Architectural Capriccio",
      imageSrc: "level6/6_17.jpg",
      cutSrc: "level6/cut/6_17.jpg",
      author: "RICCI, Marco",
      year: "c. 1725"
    },
    words: [
      {
        audioExample: "files/18_3354_example.mp3",
        textExample: "Driving in the snowstorm was an ordeal she’d never forget",
        textExampleTranslate: "Вождение в метель было тяжелым испытанием, которое она никогда не забудет",
        id: 3354,
        word: "ordeal",
        wordTranslate: "испытание"
      },
      {
        audioExample: "files/18_3355_example.mp3",
        textExample: "She was an outspoken critic about the new banking laws",
        textExampleTranslate: "Она была откровенным критиком о новых банковских законах",
        id: 3355,
        word: "outspoken",
        wordTranslate: "откровенный"
      },
      {
        audioExample: "files/19_3362_example.mp3",
        textExample: "Before trains, most couriers used horses to travel",
        textExampleTranslate: "До поезда большинство курьеров использовали лошадей для путешествий",
        id: 3362,
        word: "courier",
        wordTranslate: "курьер"
      },
      {
        audioExample: "files/19_3364_example.mp3",
        textExample: "When in Asian countries, bowing is a form of etiquette",
        textExampleTranslate: "Когда в азиатских странах, кланяясь является формой этикета",
        id: 3364,
        word: "etiquette",
        wordTranslate: "этикет"
      },
      {
        audioExample: "files/19_3366_example.mp3",
        textExample: "Trade ships only carried valuable freight like silk and spices",
        textExampleTranslate: "Торговые суда перевозили только ценные грузы, такие как шелк и специи",
        id: 3366,
        word: "freight",
        wordTranslate: "перевозка грузов"
      },
      {
        audioExample: "files/19_3368_example.mp3",
        textExample: "Nate’s insomnia prevented him from getting enough rest",
        textExampleTranslate: "Бессонница Нейта помешала ему достаточно отдохнуть",
        id: 3368,
        word: "insomnia",
        wordTranslate: "бессонница"
      },
      {
        audioExample: "files/19_3376_example.mp3",
        textExample: "I like to socialize with my classmates after school",
        textExampleTranslate: "Мне нравится общаться с одноклассниками после школы",
        id: 3376,
        word: "socialize",
        wordTranslate: "социализировать"
      },
      {
        audioExample: "files/19_3378_example.mp3",
        textExample: "I took the tram to Eighth Avenue",
        textExampleTranslate: "Я сел на трамвай до Восьмой авеню",
        id: 3378,
        word: "tram",
        wordTranslate: "трамвай"
      },
      {
        audioExample: "files/19_3379_example.mp3",
        textExample: "The dark clouds in the sky unsettled Beth",
        textExampleTranslate: "Темные тучи в небе взволновали Бет",
        id: 3379,
        word: "unsettle",
        wordTranslate: "выбивает из колеи"
      },
      {
        audioExample: "files/20_3382_example.mp3",
        textExample: "The aerial photographer took pictures from the air balloon",
        textExampleTranslate: "Аэрофотосъемка сделала снимки с воздушного шара",
        id: 3382,
        word: "aerial",
        wordTranslate: "антенна"
      }
    ]
  },
  {
    "levelData": {
      id: "6_18",
      name: "Bridal Procession in a Spring Landscape",
      imageSrc: "level6/6_18.jpg",
      cutSrc: "level6/cut/6_18.jpg",
      author: "RICHTER, Adrian Ludwig",
      year: "1847"
    },
    words: [
      {
        audioExample: "files/20_3384_example.mp3",
        textExample: "The avalanche destroyed the mountain village",
        textExampleTranslate: "Лавина разрушила горную деревню",
        id: 3384,
        word: "avalanche",
        wordTranslate: "лавина"
      },
      {
        audioExample: "files/20_3386_example.mp3",
        textExample: "I was discharged from the hospital after three days",
        textExampleTranslate: "Я был выписан из больницы через три дня",
        id: 3386,
        word: "discharge",
        wordTranslate: "разрядка"
      },
      {
        audioExample: "files/20_3387_example.mp3",
        textExample: "We watched the final exciting episode of the TV series",
        textExampleTranslate: "Мы смотрели финальный захватывающий эпизод сериала",
        id: 3387,
        word: "episode",
        wordTranslate: "эпизод"
      },
      {
        audioExample: "files/20_3389_example.mp3",
        textExample: "All people are mortal",
        textExampleTranslate: "Все люди смертны",
        id: 3389,
        word: "mortal",
        wordTranslate: "смертный"
      },
      {
        audioExample: "files/20_3392_example.mp3",
        textExample: "The girls cried at the end of the poignant movie",
        textExampleTranslate: "Девушки плакали в конце острого фильма",
        id: 3392,
        word: "poignant",
        wordTranslate: "горький"
      },
      {
        audioExample: "files/20_3394_example.mp3",
        textExample: "There was rubble all over the city after the earthquake",
        textExampleTranslate: "После землетрясения по всему городу были обломки",
        id: 3394,
        word: "rubble",
        wordTranslate: "щебень"
      },
      {
        audioExample: "files/20_3395_example.mp3",
        textExample: "She was secluded on an island for over a year",
        textExampleTranslate: "Она была уединена на острове больше года",
        id: 3395,
        word: "seclude",
        wordTranslate: "уединиться"
      },
      {
        audioExample: "files/20_3397_example.mp3",
        textExample: "I sobbed when my youngest daughter got married",
        textExampleTranslate: "Я рыдала, когда моя младшая дочь вышла замуж",
        id: 3397,
        word: "sob",
        wordTranslate: "рыдать"
      },
      {
        audioExample: "files/20_3398_example.mp3",
        textExample: "After the funeral, everybody felt very sober",
        textExampleTranslate: "После похорон все чувствовали себя очень трезво",
        id: 3398,
        word: "sober",
        wordTranslate: "трезвый"
      },
      {
        audioExample: "files/21_3404_example.mp3",
        textExample: "Have you decorated the room for Christmas yet?",
        textExampleTranslate: "Ты уже украсил комнату на Рождество?",
        id: 3404,
        word: "decorate",
        wordTranslate: "украшают"
      }
    ]
  },
  {
    "levelData": {
      id: "6_19",
      name: "Venice, Approach to the Grand Canal",
      imageSrc: "level6/6_19.jpg",
      cutSrc: "level6/cut/6_19.jpg",
      author: "ROBERTS, David",
      year: "1855"
    },
    words: [
      {
        audioExample: "files/21_3405_example.mp3",
        textExample: "Paint peeled off of the old dilapidated apartment building",
        textExampleTranslate: "Очищенная краска от старого ветхого жилого дома",
        id: 3405,
        word: "dilapidated",
        wordTranslate: "ветхий"
      },
      {
        audioExample: "files/21_3407_example.mp3",
        textExample: "She got on the plane after we said our farewells",
        textExampleTranslate: "Она села в самолет после того, как мы попрощались",
        id: 3407,
        word: "farewell",
        wordTranslate: "прощальный привет"
      },
      {
        audioExample: "files/21_3410_example.mp3",
        textExample: "We discovered a major flaw in the metal chain",
        textExampleTranslate: "Мы обнаружили большой недостаток в металлической цепи",
        id: 3410,
        word: "flaw",
        wordTranslate: "недостаток"
      },
      {
        audioExample: "files/21_3411_example.mp3",
        textExample: "That joke makes me grin every time I hear it",
        textExampleTranslate: "Эта шутка заставляет меня улыбаться каждый раз, когда я ее слышу",
        id: 3411,
        word: "grin",
        wordTranslate: "оскал"
      },
      {
        audioExample: "files/21_3416_example.mp3",
        textExample: "The roof of the church is made of slate",
        textExampleTranslate: "Крыша церкви выполнена из шифера",
        id: 3416,
        word: "slate",
        wordTranslate: "шифер"
      },
      {
        audioExample: "files/21_3417_example.mp3",
        textExample: "I don’t find stools very comfortable to sit on",
        textExampleTranslate: "Мне не очень удобно сидеть на стуле",
        id: 3417,
        word: "stool",
        wordTranslate: "стул"
      },
      {
        audioExample: "files/21_3420_example.mp3",
        textExample: "The mechanic removed the dirt to clear the engine valve",
        textExampleTranslate: "Механик удалил грязь, чтобы очистить клапан двигателя",
        id: 3420,
        word: "valve",
        wordTranslate: "клапан"
      },
      {
        audioExample: "files/22_3425_example.mp3",
        textExample: "At the camp, the boys’ cabin was lined with cots",
        textExampleTranslate: "В лагере в хижине для мальчиков стояли детские кроватки",
        id: 3425,
        word: "cot",
        wordTranslate: "раскладушка"
      },
      {
        audioExample: "files/22_3428_example.mp3",
        textExample: "Guerilla warfare involves a lot of hit-and-run fighting",
        textExampleTranslate: "Партизанская война включает в себя множество боев с налетами",
        id: 3428,
        word: "guerilla",
        wordTranslate: "партизанская"
      },
      {
        audioExample: "files/22_3431_example.mp3",
        textExample: "The lush jungle was filled with plants, trees, and vines",
        textExampleTranslate: "Пышные джунгли были заполнены растениями, деревьями и виноградными лозами",
        id: 3431,
        word: "lush",
        wordTranslate: "пышный"
      }
    ]
  },
  {
    "levelData": {
      id: "6_20",
      name: "A Battle Scene",
      imageSrc: "level6/6_20.jpg",
      cutSrc: "level6/cut/6_20.jpg",
      author: "ROSA, Salvator",
      year: "1640s"
    },
    words: [
      {
        audioExample: "files/22_3432_example.mp3",
        textExample: "Kelly’s new outfit made her look so glamourous",
        textExampleTranslate: "Новый наряд Келли заставил ее выглядеть так гламурно",
        id: 3432,
        word: "outfit",
        wordTranslate: "снаряжение"
      },
      {
        audioExample: "files/22_3433_example.mp3",
        textExample: "The kitten cleaned its paws with its tongue",
        textExampleTranslate: "Котенок чистил лапы языком",
        id: 3433,
        word: "paw",
        wordTranslate: "лапа"
      },
      {
        audioExample: "files/22_3440_example.mp3",
        textExample: "Jane was weary after a long day of work",
        textExampleTranslate: "Джейн устала после долгого рабочего дня",
        id: 3440,
        word: "weary",
        wordTranslate: "уставший"
      },
      {
        audioExample: "files/23_3443_example.mp3",
        textExample: "The sale of his inventions made the inventor a billionaire",
        textExampleTranslate: "Продажа его изобретений сделала изобретателя миллиардером",
        id: 3443,
        word: "billionaire",
        wordTranslate: "миллиардер"
      },
      {
        audioExample: "files/23_3445_example.mp3",
        textExample: "The businessman was clumsy and dropped his work files",
        textExampleTranslate: "Бизнесмен был неуклюжим и уронил свои рабочие файлы",
        id: 3445,
        word: "clumsy",
        wordTranslate: "неуклюжий"
      },
      {
        audioExample: "files/23_3448_example.mp3",
        textExample: "During the flood, many families were evacuated to higher ground",
        textExampleTranslate: "Во время наводнения многие семьи были эвакуированы на более высокий уровень",
        id: 3448,
        word: "evacuate",
        wordTranslate: "эвакуируюсь"
      },
      {
        audioExample: "files/23_3450_example.mp3",
        textExample: "The copier was destroyed by a mob of angry workers",
        textExampleTranslate: "Копир был уничтожен толпой разгневанных рабочих",
        id: 3450,
        word: "mob",
        wordTranslate: "чернь"
      },
      {
        audioExample: "files/23_3454_example.mp3",
        textExample: "A scientist should always practice scrutiny with their work",
        textExampleTranslate: "Ученый должен всегда внимательно изучать свою работу",
        id: 3454,
        word: "scrutiny",
        wordTranslate: "исследование"
      },
      {
        audioExample: "files/23_3457_example.mp3",
        textExample: "The judge listened while the victim testified about the robbery",
        textExampleTranslate: "Судья слушал, пока жертва давала показания о грабеже",
        id: 3457,
        word: "testify",
        wordTranslate: "свидетельствуют"
      },
      {
        audioExample: "files/24_3461_example.mp3",
        textExample: "When he stepped on the gas pedal, the motorcycle accelerated",
        textExampleTranslate: "Когда он наступил на педаль газа, мотоцикл ускорился",
        id: 3461,
        word: "accelerate",
        wordTranslate: "ускорить"
      }
    ]
  },
  {
    "levelData": {
      id: "6_21",
      name: "Heroic Battle",
      imageSrc: "level6/6_21.jpg",
      cutSrc: "level6/cut/6_21.jpg",
      author: "ROSA, Salvator",
      year: "1652-64"
    },
    words: [
      {
        audioExample: "files/24_3464_example.mp3",
        textExample: "After the fire, this section of forest is rather dreary",
        textExampleTranslate: "После пожара этот участок леса довольно тоскливый",
        id: 3464,
        word: "dreary",
        wordTranslate: "муторно"
      },
      {
        audioExample: "files/24_3467_example.mp3",
        textExample: "The number of electrons in an atom determines its charge",
        textExampleTranslate: "Количество электронов в атоме определяет его заряд",
        id: 3467,
        word: "electron",
        wordTranslate: "электрон"
      },
      {
        audioExample: "files/24_3475_example.mp3",
        textExample: "The knife easily penetrated the surface of the orange",
        textExampleTranslate: "Нож легко проникает сквозь поверхность апельсина",
        id: 3475,
        word: "penetrate",
        wordTranslate: "проникнуть"
      },
      {
        audioExample: "files/24_3476_example.mp3",
        textExample: "They made persistent attempts to get him to eat",
        textExampleTranslate: "Они предпринимали настойчивые попытки заставить его есть",
        id: 3476,
        word: "persistent",
        wordTranslate: "стойкие"
      },
      {
        audioExample: "files/24_3477_example.mp3",
        textExample: "The propulsion lifted the rocket into the sky",
        textExampleTranslate: "Движитель поднял ракету в небо",
        id: 3477,
        word: "propulsion",
        wordTranslate: "двигательная"
      },
      {
        audioExample: "files/24_3480_example.mp3",
        textExample: "Doctors sometimes use electric shock to stimulate a patient’s heartbeat",
        textExampleTranslate: "Врачи иногда используют удар током, чтобы стимулировать сердцебиение пациента",
        id: 3480,
        word: "stimulate",
        wordTranslate: "стимулировать"
      },
      {
        audioExample: "files/25_3484_example.mp3",
        textExample: "The children chattered in the back of the classroom",
        textExampleTranslate: "Дети болтали в задней части класса",
        id: 3484,
        word: "chatter",
        wordTranslate: "болтовня"
      },
      {
        audioExample: "files/25_3487_example.mp3",
        textExample: "The nation’s economy continued to deteriorate despite the politicians’ efforts",
        textExampleTranslate: "Экономика страны продолжала ухудшаться, несмотря на усилия политиков",
        id: 3487,
        word: "deteriorate",
        wordTranslate: "портится"
      },
      {
        audioExample: "files/25_3488_example.mp3",
        textExample: "The thermometer recorded a temperature of 38 degrees Celsius",
        textExampleTranslate: "Термометр зафиксировал температуру 38 градусов по Цельсию",
        id: 3488,
        word: "degree",
        wordTranslate: "степень"
      },
      {
        audioExample: "files/25_3491_example.mp3",
        textExample: "At dinner, my dad was very hospitable to my friends",
        textExampleTranslate: "За ужином мой папа был очень гостеприимен с моими друзьями",
        id: 3491,
        word: "hospitable",
        wordTranslate: "гостеприимный"
      }
    ]
  },
  {
    "levelData": {
      id: "6_22",
      name: "An Autumn Landscape with a View of Het Steen",
      imageSrc: "level6/6_22.jpg",
      cutSrc: "level6/cut/6_22.jpg",
      author: "RUBENS, Peter Paul",
      year: "c. 1635"
    },
    words: [
      {
        audioExample: "files/25_3492_example.mp3",
        textExample: "He woke up in an ill humor, angry at everyone",
        textExampleTranslate: "Он проснулся в плохом настроении, злой на всех",
        id: 3492,
        word: "humor",
        wordTranslate: "юмор"
      },
      {
        audioExample: "files/25_3493_example.mp3",
        textExample: "The manor had over forty rooms and beautiful gardens",
        textExampleTranslate: "В усадьбе было более сорока комнат и прекрасных садов",
        id: 3493,
        word: "manor",
        wordTranslate: "усадьба"
      },
      {
        audioExample: "files/25_3498_example.mp3",
        textExample: "The drawing of Olivia’s profile came out very well",
        textExampleTranslate: "Рисунок профиля Оливии получился очень хорошим",
        id: 3498,
        word: "profile",
        wordTranslate: "профиль"
      },
      {
        audioExample: "files/25_3499_example.mp3",
        textExample: "The winding river turned and looped around the hills",
        textExampleTranslate: "Извилистая река повернулась и обвилась вокруг холмов",
        id: 3499,
        word: "winding",
        wordTranslate: "обмотка"
      },
      {
        audioExample: "files/26_3501_example.mp3",
        textExample: "President Lincoln abolished slavery in the US",
        textExampleTranslate: "Президент Линкольн отменил рабство в США",
        id: 3501,
        word: "abolish",
        wordTranslate: "отменить"
      },
      {
        audioExample: "files/26_3503_example.mp3",
        textExample: "George aspired to be a doctor from a young age",
        textExampleTranslate: "Джордж с юных лет стремился стать врачом",
        id: 3503,
        word: "aspire",
        wordTranslate: "стремиться"
      },
      {
        audioExample: "files/26_3508_example.mp3",
        textExample: "The organization disseminates information about the dangers of smoking",
        textExampleTranslate: "Организация распространяет информацию о вреде курения",
        id: 3508,
        word: "disseminate",
        wordTranslate: "распространять"
      },
      {
        audioExample: "files/26_3510_example.mp3",
        textExample: "That news channel is infamous for presenting biased information",
        textExampleTranslate: "Этот новостной канал печально известен представлением необъективной информации",
        id: 3510,
        word: "infamous",
        wordTranslate: "позорный"
      },
      {
        audioExample: "files/26_3512_example.mp3",
        textExample: "After the injury, the player limped off of the field",
        textExampleTranslate: "После травмы игрок хромал с поля",
        id: 3512,
        word: "limp",
        wordTranslate: "хромать"
      },
      {
        audioExample: "files/26_3518_example.mp3",
        textExample: "The secrecy of the big organization made the government nervous",
        textExampleTranslate: "Секретность большой организации заставила правительство нервничать",
        id: 3518,
        word: "secrecy",
        wordTranslate: "секретность"
      }
    ]
  },
  {
    "levelData": {
      id: "6_23",
      name: "Landscape with a Rainbow",
      imageSrc: "level6/6_23.jpg",
      cutSrc: "level6/cut/6_23.jpg",
      author: "RUBENS, Peter Paul",
      year: "c. 1638"
    },
    words: [
      {
        audioExample: "files/26_3519_example.mp3",
        textExample: "Such social problems need to be tackled right away",
        textExampleTranslate: "Такие социальные проблемы нужно решать немедленно",
        id: 3519,
        word: "tackle",
        wordTranslate: "снасти"
      },
      {
        audioExample: "files/26_3520_example.mp3",
        textExample: "The woman’s powerful eyes often put men in a trance",
        textExampleTranslate: "Мощные глаза женщины часто приводят мужчин в транс",
        id: 3520,
        word: "trance",
        wordTranslate: "транс"
      },
      {
        audioExample: "files/27_3522_example.mp3",
        textExample: "Several lines had been deleted from her speech",
        textExampleTranslate: "Несколько строк были удалены из ее речи",
        id: 3522,
        word: "delete",
        wordTranslate: "удалять"
      },
      {
        audioExample: "files/27_3526_example.mp3",
        textExample: "If you want firsthand knowledge, ask someone who saw it",
        textExampleTranslate: "Если вы хотите узнать из первых рук, спросите кого-то, кто его видел",
        id: 3526,
        word: "firsthand",
        wordTranslate: "из первых рук"
      },
      {
        audioExample: "files/27_3529_example.mp3",
        textExample: "A more inclusive event would have allowed children to attend",
        textExampleTranslate: "Более инклюзивное мероприятие позволило бы детям присутствовать",
        id: 3529,
        word: "inclusive",
        wordTranslate: "включено"
      },
      {
        audioExample: "files/27_3530_example.mp3",
        textExample: "The senator had served ten years in the national legislature",
        textExampleTranslate: "Сенатор прослужил десять лет в национальном законодательном органе",
        id: 3530,
        word: "legislature",
        wordTranslate: "законодательная власть"
      },
      {
        audioExample: "files/27_3532_example.mp3",
        textExample: "In today’s global economy, being monolingual limits your opportunities",
        textExampleTranslate: "В сегодняшней мировой экономике монолингвальность ограничивает ваши возможности",
        id: 3532,
        word: "monolingual",
        wordTranslate: "одноязычных"
      },
      {
        audioExample: "files/27_3534_example.mp3",
        textExample: "Every year, young patriots join their countries’ militaries",
        textExampleTranslate: "Каждый год молодые патриоты вступают в армию своих стран",
        id: 3534,
        word: "patriot",
        wordTranslate: "патриот"
      },
      {
        audioExample: "files/27_3536_example.mp3",
        textExample: "The differences between racial groups are physical characteristics and culture",
        textExampleTranslate: "Различия между расовыми группами - это физические характеристики и культура",
        id: 3536,
        word: "racial",
        wordTranslate: "расовый"
      },
      {
        audioExample: "files/28_3542_example.mp3",
        textExample: "He waited for his mother to arrive at the depot",
        textExampleTranslate: "Он ждал, когда его мать прибудет в депо",
        id: 3542,
        word: "depot",
        wordTranslate: "депо"
      }
    ]
  },
  {
    "levelData": {
      id: "6_24",
      name: "View of the Town of Alkmaar",
      imageSrc: "level6/6_24.jpg",
      cutSrc: "level6/cut/6_24.jpg",
      author: "RUYSDAEL, Salomon van",
      year: "1645-50"
    },
    words: [
      {
        audioExample: "files/28_3544_example.mp3",
        textExample: "He shouted, “There it is!” and pointed with his forefinger",
        textExampleTranslate: "Он крикнул: 'Вот оно!' и указал указательным пальцем ",
        id: 3544,
        word: "forefinger",
        wordTranslate: "указательный палец"
      },
      {
        audioExample: "files/28_3546_example.mp3",
        textExample: "Sweating is an inherent bodily function when exercising",
        textExampleTranslate: "Потение является неотъемлемой функцией организма при занятиях спортом",
        id: 3546,
        word: "inherent",
        wordTranslate: "присущий"
      },
      {
        audioExample: "files/28_3547_example.mp3",
        textExample: "My dad intimidates my friends whenever they visit",
        textExampleTranslate: "Мой папа пугает моих друзей, когда они посещают",
        id: 3547,
        word: "intimidate",
        wordTranslate: "запугивание"
      },
      {
        audioExample: "files/28_3548_example.mp3",
        textExample: "The school janitor cleaned up the messy cafeteria",
        textExampleTranslate: "Дворник школы убрал грязную столовую",
        id: 3548,
        word: "janitor",
        wordTranslate: "дворник"
      },
      {
        audioExample: "files/28_3549_example.mp3",
        textExample: "The ground is still moist from the rain last night",
        textExampleTranslate: "Земля все еще влажная от дождя прошлой ночью",
        id: 3549,
        word: "moist",
        wordTranslate: "влажный"
      },
      {
        audioExample: "files/28_3551_example.mp3",
        textExample: "The bully prodded me in the chest with her finger",
        textExampleTranslate: "Хулиган ткнул меня пальцем в грудь",
        id: 3551,
        word: "prod",
        wordTranslate: "ткнуть"
      },
      {
        audioExample: "files/28_3553_example.mp3",
        textExample: "Mike restrained Allen from reaching the door",
        textExampleTranslate: "Майк удержал Аллена от доступа к двери",
        id: 3553,
        word: "restrain",
        wordTranslate: "сдерживать"
      },
      {
        audioExample: "files/28_3557_example.mp3",
        textExample: "The man jumped over the cars as a promotional stunt",
        textExampleTranslate: "Человек перепрыгнул через машины как рекламный трюк",
        id: 3557,
        word: "stunt",
        wordTranslate: "трюк"
      },
      {
        audioExample: "files/29_3568_example.mp3",
        textExample: "His family farm covered many hectares",
        textExampleTranslate: "Его семейная ферма занимала много гектаров",
        id: 3568,
        word: "hectare",
        wordTranslate: "гектар"
      },
      {
        audioExample: "files/29_3569_example.mp3",
        textExample: "The pleasant music heightened their enjoyment of the wonderful dinner",
        textExampleTranslate: "Приятная музыка усилила их удовольствие от чудесного ужина",
        id: 3569,
        word: "heighten",
        wordTranslate: "пущего"
      }
    ]
  },
  {
    "levelData": {
      id: "6_25",
      name: "Painter's Studio",
      imageSrc: "level6/6_25.jpg",
      cutSrc: "level6/cut/6_25.jpg",
      author: "RYCKAERT, David the Younger",
      year: "1638"
    },
    words: [
      {
        audioExample: "files/29_3571_example.mp3",
        textExample: "The mansion had thirty bedrooms, two kitchens, and a pool",
        textExampleTranslate: "В особняке было тридцать спален, две кухни и бассейн",
        id: 3571,
        word: "mansion",
        wordTranslate: "особняк"
      },
      {
        audioExample: "files/29_3573_example.mp3",
        textExample: "He was overjoyed by the news of his promotion",
        textExampleTranslate: "Он был в восторге от новостей о его продвижении",
        id: 3573,
        word: "overjoyed",
        wordTranslate: "обрадовалась"
      },
      {
        audioExample: "files/29_3576_example.mp3",
        textExample: "The old fire station was renovated into an apartment building",
        textExampleTranslate: "Старая пожарная часть была реконструирована в жилой дом",
        id: 3576,
        word: "renovate",
        wordTranslate: "ремонт"
      },
      {
        audioExample: "files/29_3580_example.mp3",
        textExample: "After the game, the turf looked ragged",
        textExampleTranslate: "После игры газон выглядел рваным",
        id: 3580,
        word: "turf",
        wordTranslate: "дерн"
      },
      {
        audioExample: "files/30_3584_example.mp3",
        textExample: "Our school’s football team is mostly comprised with seniors",
        textExampleTranslate: "Футбольная команда нашей школы в основном состоит из пожилых людей",
        id: 3584,
        word: "comprise",
        wordTranslate: "включать"
      },
      {
        audioExample: "files/30_3585_example.mp3",
        textExample: "The statue’s face depicted the general’s determination and courage",
        textExampleTranslate: "Лицо статуи изображало решимость и смелость генерала",
        id: 3585,
        word: "depict",
        wordTranslate: "изображают"
      },
      {
        audioExample: "files/30_3587_example.mp3",
        textExample: "When the temperature dropped to 32° Fahrenheit, it started snowing",
        textExampleTranslate: "Когда температура упала до 32 ° по Фаренгейту, пошел снег",
        id: 3587,
        word: "Fahrenheit",
        wordTranslate: "фаренгейт"
      },
      {
        audioExample: "files/30_3589_example.mp3",
        textExample: "All the trees in this grove are apple trees",
        textExampleTranslate: "Все деревья в этой роще - яблони",
        id: 3589,
        word: "grove",
        wordTranslate: "роща"
      },
      {
        audioExample: "files/30_3591_example.mp3",
        textExample: "Many Australian farmers use the outback to raise cattle",
        textExampleTranslate: "Многие австралийские фермеры используют сельское хозяйство, чтобы разводить скот",
        id: 3591,
        word: "outback",
        wordTranslate: "необжитой местности"
      },
      {
        audioExample: "files/30_3596_example.mp3",
        textExample: "Our tarif on imported wool makes foreign wool more expensive",
        textExampleTranslate: "Наш тариф на импортную шерсть делает иностранную шерсть дороже",
        id: 3596,
        word: "tariff",
        wordTranslate: "тариф"
      }
    ]
  }
];
class Lessons {
  constructor(data, store2) {
    __publicField(this, "lessons", []);
    __publicField(this, "currentLesson", null);
    __publicField(this, "history", []);
    __publicField(this, "countRound", 0);
    __publicField(this, "store");
    this.lessons = data;
    this.store = store2;
    this.getFormStore();
  }
  getCurrentLesson() {
    return this.currentLesson;
  }
  getCountLessonsInLevel(level2) {
    return this.lessons.filter((lesson2) => lesson2.levelData.id.split("_")[0] === level2).length;
  }
  getSentence() {
    var _a;
    if (this.currentLesson) {
      return ((_a = this.currentLesson.words[this.countRound]) == null ? void 0 : _a.textExample) || "";
    }
    return "";
  }
  getCurrentRound() {
    var _a;
    return (_a = this.currentLesson) == null ? void 0 : _a.words[this.countRound];
  }
  getTranslate() {
    var _a;
    if (this.currentLesson) {
      return ((_a = this.currentLesson.words[this.countRound]) == null ? void 0 : _a.textExampleTranslate) || "";
    }
    return "";
  }
  getAudioFile() {
    var _a;
    if (this.currentLesson) {
      return ((_a = this.currentLesson.words[this.countRound]) == null ? void 0 : _a.audioExample) || "";
    }
    return "";
  }
  resetProgress() {
    this.currentLesson = this.getFirstLesson();
    this.countRound = 0;
  }
  getCountRound() {
    return this.countRound;
  }
  setNextLevel() {
    if (this.currentLesson) {
      this.store.setLastLesson(this.currentLesson.levelData.id);
      const nextLevel = this.lessons[this.lessons.indexOf(this.currentLesson) + 1];
      if (nextLevel) {
        this.currentLesson = nextLevel;
        this.countRound = 0;
      }
    }
  }
  setLesson(id) {
    const lesson2 = this.getLessonById(id);
    if (lesson2) {
      this.currentLesson = lesson2;
      this.countRound = 0;
    }
  }
  addToHistory() {
    if (this.currentLesson) {
      this.history.push(this.currentLesson);
      this.store.setHistory(this.history);
    }
  }
  setNextRound() {
    this.countRound += 1;
  }
  getLessonLength() {
    var _a;
    return ((_a = this.currentLesson) == null ? void 0 : _a.words.length) || 0;
  }
  getLessonById(id) {
    return this.lessons.find((lesson2) => lesson2.levelData.id === id) || null;
  }
  getFirstLesson() {
    return this.lessons[0] || null;
  }
  getFormStore() {
    const data = this.store.getLastLesson();
    let lesson2 = this.getFirstLesson();
    if (data) {
      lesson2 = this.getLessonById(data);
      if (lesson2) {
        const nextLesson = this.lessons[this.lessons.indexOf(lesson2) + 1];
        lesson2 = nextLesson || lesson2;
      }
    }
    if (lesson2) {
      this.currentLesson = lesson2;
    }
    const history = this.store.getHistory();
    if (history) {
      this.history = history;
    }
  }
  getLessons() {
    return this.lessons;
  }
  getHistory() {
    return this.history;
  }
}
const background = "_background_yzss2_1";
const tittle = "_tittle_yzss2_11";
const description = "_description_yzss2_21";
const modal = "_modal_yzss2_31";
const yes = "_yes_yzss2_42";
const wrapper = "_wrapper_yzss2_49";
const buttonsWrapper = "_buttonsWrapper_yzss2_58";
const classes = {
  background,
  tittle,
  description,
  modal,
  yes,
  wrapper,
  buttonsWrapper
};
const YES_TXT = "Yes, delete";
const NO_TXT = "No, back";
class Confirm extends BaseComponent {
  constructor(container2, logoutCallback) {
    super({ tag: "aside", className: classes.background });
    __publicField(this, "yesBtn");
    __publicField(this, "noBtn");
    __publicField(this, "container");
    __publicField(this, "modal");
    __publicField(this, "logoutCallback");
    this.logoutCallback = logoutCallback;
    this.container = container2;
    this.yesBtn = Button({
      textContent: YES_TXT,
      onClick: () => {
        this.logoutCallback();
      },
      className: classes.yes
    });
    this.noBtn = Button({
      textContent: NO_TXT,
      onClick: () => {
        this.destroy();
      }
    });
    this.modal = div(
      { className: classes.modal },
      div(
        { className: classes.wrapper },
        h2(classes.tittle, `Confirm command`),
        p(classes.description, CONFIRM_LOGOUT),
        div(
          { className: classes.buttonsWrapper },
          this.yesBtn,
          this.noBtn
        )
      )
    );
    this.appendChild([this.modal]);
  }
  init() {
    this.container.append(this.getElement());
  }
}
const { body } = document;
const store = new Store();
const user = new User(store);
const options = new Options(store);
const dataModel = new Lessons(mockData, store);
function clearContainer() {
  body.innerHTML = "";
}
function clearUser() {
  store.removeUser();
  dataModel.resetProgress();
  user.clear();
}
function logout() {
  const confirm = new Confirm(body, confirmLogout);
  confirm.init();
}
function confirmLogout() {
  clearUser();
  clearContainer();
  startPage.logout();
}
function startGame() {
  clearContainer();
  const gamePage2 = new Game(body, options, logout, dataModel);
  gamePage2.showGame();
}
const startPage = new StartPage(body, user, startGame, logout);
startPage.initApp();
//# sourceMappingURL=main-DTX13DhQ.js.map
