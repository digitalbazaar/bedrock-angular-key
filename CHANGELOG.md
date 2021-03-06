# bedrock-angular-key ChangeLog

## 5.0.0 - 2018-03-20

### Changed
- **BREAKING**: Switch to material design.
- Use ES6 syntax.

## 4.0.4 - 2017-06-23

## Fixed
- Fix `node-forge` usage.

## 4.0.3 - 2017-06-23

## Fixed
- Update `node-forge` dependency for webpack compatibility.

## 4.0.2 - 2017-06-01

## Fixed
- Fix dependencies.
- Fix test suite.

## 4.0.1 - 2017-05-31

### Fixed
- Remove `$rootScope.app.service` references.

## 4.0.0 - 2017-05-30

### Changed
- **BREAKING**: Switch package manager from bower to npm.
- **BREAKING**: Replace requirejs/amd with ES6 import.
- Angular 1.6.x is required.

## 3.1.5 - 2017-05-11

### Fixed
- Initialize component via `$onInit`.

## 3.1.4 - 2016-10-25

### Changed
- Add protractor pages.

## 3.1.3 - 2016-07-20

### Changed
- Display only active keys in the key selector.

## 3.1.2 - 2016-06-24

### Changed
- Convert add-key modal to a component.
- Prevent redundant calls to init().

## 3.1.1 - 2016-06-14

### Fixed
- Fix hasPermission for minimal public identities.

## 3.1.0 - 2016-06-09

## Added
- Add a public key viewer component.

### Fixed
- Call init in keys controller.

## 3.0.1 - 2016-06-02

### Fixed
- Update brKeys to use new key generator API.

## 3.0.0 - 2016-05-28

### Changed
- **BREAKING**: New API for key selector and key generator. Key
  generation and addition actions are exposed as events that
  other components may do something with, rather than direct
  integration with particular key services. This allows for
  greater flexibility and reuse of components.

## 2.1.0 - 2016-05-26

### Added
- Allow deselect option in key selector.

## 2.0.1 - 2016-05-16

### Fixed
- Supply proper parameters to br-generate-key-pair-modal.

## 2.0.0 - 2016-05-02

### Changed
- **BREAKING**: New API for key selector. The key selector now uses the
  `bedrock-angular-selector` 3.x API.

## 1.0.0 - 2016-04-29

- See git history for changes.
