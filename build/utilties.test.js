import { firstMatchingStageEnvironment, isProduction, getCookieCreationData, getIETFTagFromLanguageCode } from './utilities';
import { ENGLISH_IETF_TAG, SPANISH_IETF_TAG, DEFAULT_IETF_TAG, STAGE_ENVIRONMENTS, LOCALHOST } from './constants';
describe('utilities', function () {
  describe('#firstMatchingStageEnvironment', function () {
    it('null matching stage environment for localhost', function () {
      jsdom.reconfigure({
        url: "http://".concat(LOCALHOST, ":8080/")
      });
      expect(firstMatchingStageEnvironment()).toBeNull();
    });
    it('null matching stage environment for edx.org', function () {
      jsdom.reconfigure({
        url: 'https://www.edx.org/'
      });
      expect(firstMatchingStageEnvironment()).toBeNull();
    });
    it('non-null matching stage environment', function () {
      var stageEnvironment = STAGE_ENVIRONMENTS.STAGE;
      jsdom.reconfigure({
        url: "https://www.".concat(stageEnvironment.baseURL)
      });
      expect(firstMatchingStageEnvironment()).toEqual(stageEnvironment);
    });
  });
  describe('#isProduction', function () {
    it('false for localhost', function () {
      jsdom.reconfigure({
        url: "http://".concat(LOCALHOST, ":8080/")
      });
      expect(isProduction()).toBe(false);
    });
    it('true for edx.org', function () {
      jsdom.reconfigure({
        url: 'https://www.edx.org/'
      });
      expect(isProduction()).toBe(true);
    });
    it('false for stage environment', function () {
      var stageEnvironment = STAGE_ENVIRONMENTS.STAGE;
      jsdom.reconfigure({
        url: "https://www.".concat(stageEnvironment.baseURL)
      });
      expect(isProduction()).toBe(false);
    });
  });
  describe('#getCookieCreationData', function () {
    it('localhost cookie creation data', function () {
      jsdom.reconfigure({
        url: "http://".concat(LOCALHOST, ":8080/")
      });
      var expected = {
        cookieName: 'localhost-edx-cookie-policy-viewed',
        domain: 'localhost',
        path: '/',
        maxAge: 2147483647
      };
      expect(getCookieCreationData()).toEqual(expected);
    });
    it('localhost cookie creation data with overridden cookie name', function () {
      jsdom.reconfigure({
        url: "http://".concat(LOCALHOST, ":8080/")
      });
      var expected = {
        cookieName: 'localhost-edx-updated-cookie-policy-viewed',
        domain: 'localhost',
        path: '/',
        maxAge: 2147483647
      };
      expect(getCookieCreationData('edx-updated-cookie-policy-viewed')).toEqual(expected);
    });
    it('stage cookie creation data', function () {
      var stageEnvironment = STAGE_ENVIRONMENTS.STAGE;
      jsdom.reconfigure({
        url: "https://www.".concat(stageEnvironment.baseURL)
      });
      var expected = {
        cookieName: 'stage-edx-cookie-policy-viewed',
        domain: '.stage.edx.org',
        path: '/',
        maxAge: 2147483647
      };
      expect(getCookieCreationData()).toEqual(expected);
    });
    it('stage cookie creation data with overridden cookie name', function () {
      var stageEnvironment = STAGE_ENVIRONMENTS.STAGE;
      jsdom.reconfigure({
        url: "https://www.".concat(stageEnvironment.baseURL)
      });
      var expected = {
        cookieName: 'stage-edx-updated-cookie-policy-viewed',
        domain: '.stage.edx.org',
        path: '/',
        maxAge: 2147483647
      };
      expect(getCookieCreationData('edx-updated-cookie-policy-viewed')).toEqual(expected);
    });
    it('prod cookie creation data', function () {
      jsdom.reconfigure({
        url: 'https://www.edx.org/'
      });
      var expected = {
        cookieName: 'prod-edx-cookie-policy-viewed',
        domain: '.edx.org',
        path: '/',
        maxAge: 2147483647
      };
      expect(getCookieCreationData()).toEqual(expected);
    });
    it('prod cookie creation data with overridden cookie name', function () {
      jsdom.reconfigure({
        url: 'https://www.edx.org/'
      });
      var expected = {
        cookieName: 'prod-edx-updated-cookie-policy-viewed',
        domain: '.edx.org',
        path: '/',
        maxAge: 2147483647
      };
      expect(getCookieCreationData('edx-updated-cookie-policy-viewed')).toEqual(expected);
    });
  });
  describe('#getIETFTagFromLanguageCode', function () {
    it('returns the Spanish ieftTag when passed "es"', function () {
      expect(getIETFTagFromLanguageCode('es')).toEqual(SPANISH_IETF_TAG);
    });
    it('returns the English ieftTag when passed "en"', function () {
      expect(getIETFTagFromLanguageCode('en')).toEqual(ENGLISH_IETF_TAG);
    });
    it('returns the Default ieftTag when passed an unsupported languageCode', function () {
      expect(getIETFTagFromLanguageCode('de')).toEqual(DEFAULT_IETF_TAG);
    });
  });
});