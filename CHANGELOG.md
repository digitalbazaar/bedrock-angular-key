# bedrock-angular-key ChangeLog

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
