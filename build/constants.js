var _Object$freeze, _Object$freeze2, _Object$freeze3, _Object$freeze4, _Object$freeze5;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// https://en.wikipedia.org/wiki/IETF_language_tag
var ENGLISH_IETF_TAG = 'en';
var SPANISH_IETF_TAG = 'es-419';
var DEFAULT_IETF_TAG = ENGLISH_IETF_TAG;
var ENGLISH_LANGUAGE_CODE = 'en';
var SPANISH_LANGUAGE_CODE = 'es';
var LOCALHOST = 'localhost';
var ACCEPTANCE = 'ACCEPTANCE';
var DEV = 'DEV';
var EXTRA = 'EXTRA';
var QA = 'QA';
var STAGE = 'STAGE';
var GH_PAGES = 'GH_PAGES';
var STAGE_ENVIRONMENTS = Object.freeze((_Object$freeze = {}, _defineProperty(_Object$freeze, ACCEPTANCE, {
  baseURL: 'acceptance.edx.org',
  prefix: 'acceptance'
}), _defineProperty(_Object$freeze, DEV, {
  baseURL: 'dev.edx.org',
  prefix: 'dev'
}), _defineProperty(_Object$freeze, EXTRA, {
  baseURL: 'extra.edx.org',
  prefix: 'extra'
}), _defineProperty(_Object$freeze, QA, {
  baseURL: 'qa.edx.org',
  prefix: 'qa'
}), _defineProperty(_Object$freeze, STAGE, {
  baseURL: 'stage.edx.org',
  prefix: 'stage'
}), _defineProperty(_Object$freeze, GH_PAGES, {
  baseURL: 'edx.github.io',
  prefix: 'gh-pages'
}), _Object$freeze));
var IETF_TAGS = Object.freeze([ENGLISH_IETF_TAG, SPANISH_IETF_TAG]);
var LANGUAGE_CODES = Object.freeze([ENGLISH_LANGUAGE_CODE, SPANISH_LANGUAGE_CODE]);
var IETF_TAGS_TO_CONTAINER_ROLE_LABEL = Object.freeze((_Object$freeze2 = {}, _defineProperty(_Object$freeze2, ENGLISH_IETF_TAG, 'Notice about use of cookies on openlearning.unesco.org.'), _defineProperty(_Object$freeze2, SPANISH_IETF_TAG, 'Aviso sobre el uso de cookies en openlearning.unesco.org.'), _Object$freeze2));
var IETF_TAGS_TO_CLOSE_BUTTON_LABEL = Object.freeze((_Object$freeze3 = {}, _defineProperty(_Object$freeze3, ENGLISH_IETF_TAG, 'Close the notice about use of cookies on openlearning.unesco.org.'), _defineProperty(_Object$freeze3, SPANISH_IETF_TAG, 'Cerrar aviso sobre el uso de cookies en openlearning.unesco.org.'), _Object$freeze3));
var IETF_TAGS_TO_LANGUAGE_CODE = Object.freeze((_Object$freeze4 = {}, _defineProperty(_Object$freeze4, ENGLISH_IETF_TAG, ENGLISH_LANGUAGE_CODE), _defineProperty(_Object$freeze4, SPANISH_IETF_TAG, SPANISH_LANGUAGE_CODE), _Object$freeze4));
var LANGUAGE_CODE_TO_IETF_TAGS = Object.freeze((_Object$freeze5 = {}, _defineProperty(_Object$freeze5, ENGLISH_LANGUAGE_CODE, ENGLISH_IETF_TAG), _defineProperty(_Object$freeze5, SPANISH_LANGUAGE_CODE, SPANISH_IETF_TAG), _Object$freeze5));

var getPolicyHTML = function getPolicyHTML(tag) {
  var overrideText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (overrideText[tag]) {
    return overrideText[tag];
  }

  var linkClose = '</a>';

  if (tag === SPANISH_IETF_TAG) {
    var _linkOpen = '<a href="https://www.unesco.org/en/website-privacy-notice" class="policy-link" target = "_blank">';
    return "La UNESCO utiliza cookies y otras tecnolog\xEDas de seguimiento con fines anal\xEDticos y de rendimiento. Al usar este sitio web, aceptas este uso. Obt\xE9n m\xE1s informaci\xF3n sobre estas tecnolog\xEDas en la ".concat(_linkOpen, "Pol\xEDtica de privacidad").concat(linkClose, ".");
  }

  var linkOpen = '<a href="https://www.unesco.org/en/website-privacy-notice" class="policy-link" target = "_blank">';
  return "UNESCO use cookies and other tracking technologies for performance and analytics purposes. By using this website, you accept this use. Learn more about these technologies in the ".concat(linkOpen, "Privacy Policy").concat(linkClose, ".");
};

var COOKIE_POLICY_VIEWED_NAME = 'edx-cookie-policy-viewed';
export { ENGLISH_IETF_TAG, SPANISH_IETF_TAG, DEFAULT_IETF_TAG, ENGLISH_LANGUAGE_CODE, LANGUAGE_CODES, IETF_TAGS, IETF_TAGS_TO_CONTAINER_ROLE_LABEL, IETF_TAGS_TO_CLOSE_BUTTON_LABEL, IETF_TAGS_TO_LANGUAGE_CODE, getPolicyHTML, LANGUAGE_CODE_TO_IETF_TAGS, LOCALHOST, COOKIE_POLICY_VIEWED_NAME, STAGE_ENVIRONMENTS };