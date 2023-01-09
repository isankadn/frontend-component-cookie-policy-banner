import React from 'react';
import { mount } from 'enzyme';
import { StatusAlert } from '@edx/paragon';
import CookiePolicyBanner from '.';
import { ENGLISH_IETF_TAG, ENGLISH_LANGUAGE_CODE, IETF_TAGS_TO_CONTAINER_ROLE_LABEL, getPolicyHTML } from '../constants';
import { getIETFTag, hasViewedCookieBanner, createHasViewedCookieBanner } from '../utilities';
jest.mock('../utilities');
jest.mock('../constants');
describe('CookiePolicyBanner', function () {
  var props;
  var mountedBanner;
  var isOpen;
  var onClose;
  var expectedTag = ENGLISH_IETF_TAG;
  var expectedLanguageCode = ENGLISH_LANGUAGE_CODE;
  var expectedWrapperAriaLabel = IETF_TAGS_TO_CONTAINER_ROLE_LABEL[expectedTag];
  var expectedPolicyHTML = 'foobar'; // eslint-disable-next-line

  var expectedDialog = /*#__PURE__*/React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: expectedPolicyHTML
    }
  });
  createHasViewedCookieBanner.mockImplementation(function () {});
  getIETFTag.mockImplementation(function () {
    return expectedTag;
  });
  getPolicyHTML.mockImplementation(function () {
    return expectedPolicyHTML;
  });
  hasViewedCookieBanner.mockImplementation(function () {
    return !isOpen;
  });

  var isClosedBanner = function isClosedBanner() {
    expect(mountedBanner.state('open')).toBe(false);
    expect(mountedBanner.html()).toBeNull();
  };

  var isValidWrapperDiv = function isValidWrapperDiv(wrapperDiv) {
    expect(wrapperDiv.prop('lang')).toEqual(expectedLanguageCode);
    expect(wrapperDiv.prop('className')).toBe('edx-cookie-banner-wrapper');
    expect(wrapperDiv.prop('role')).toBe('complementary');
    expect(wrapperDiv.prop('aria-label')).toBe(expectedWrapperAriaLabel);
    expect(wrapperDiv.prop('aria-live')).toBe('polite');
  };

  var isValidStatusAlert = function isValidStatusAlert(_ref) {
    var statusAlert = _ref.statusAlert,
        open = _ref.open;
    expect(statusAlert.prop('className')).toEqual('edx-cookie-banner');
    expect(statusAlert.prop('open')).toEqual(open);
    expect(statusAlert.prop('dialog').type).toEqual(expectedDialog.type);
    expect(statusAlert.prop('dialog').props).toEqual(expectedDialog.props);
    expect(statusAlert.prop('onClose')).toEqual(mountedBanner.instance().onClose);
  };

  var isOpenBanner = function isOpenBanner() {
    expect(mountedBanner.state('open')).toBe(true);
    var wrapperDiv = mountedBanner.find('div').first();
    isValidWrapperDiv(wrapperDiv);
    var statusAlerts = mountedBanner.find(StatusAlert);
    expect(statusAlerts.length).toBe(1);
    var statusAlert = statusAlerts.first();
    isValidStatusAlert({
      statusAlert: statusAlert,
      open: isOpen
    });
  };

  beforeEach(function () {
    props = {
      onClose: onClose
    };
    isOpen = undefined;
    createHasViewedCookieBanner.mockClear();
    getIETFTag.mockClear();
    getPolicyHTML.mockClear();
    hasViewedCookieBanner.mockClear();
  });
  it('empty component when banner has already been viewed', function () {
    isOpen = false;
    mountedBanner = mount( /*#__PURE__*/React.createElement(CookiePolicyBanner, props));
    isClosedBanner();
  });
  it('banner component when open', function () {
    isOpen = true;
    mountedBanner = mount( /*#__PURE__*/React.createElement(CookiePolicyBanner, props));
    isOpenBanner();
  });
  it('toggles banner closed', function () {
    isOpen = true;
    onClose = jest.fn();
    props = {
      onClose: onClose
    };
    mountedBanner = mount( /*#__PURE__*/React.createElement(CookiePolicyBanner, props));
    isOpenBanner();
    mountedBanner.find(StatusAlert).prop('onClose')();
    isClosedBanner();
    expect(createHasViewedCookieBanner).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});