[![Build Status](https://travis-ci.org/Exelord/ember-initials.svg?branch=master)](https://travis-ci.org/Exelord/ember-initials)

<p align="center">
  <img src="https://raw.githubusercontent.com/Exelord/ember-initials/master/ember-initials.png" alt="ember-initials"/>
</p>

Ember Initials is a package for generating simple avatars with users initials. It support Ember 2 apps. Thanks to highly customizable interface you can define your own colors, defaults and styles. I promise you, it will do the job!

## Demo App
Demo app with interactive examples you can find at [http://exelord.github.io/ember-initials][9225812a]

[9225812a]: http://exelord.github.io/ember-initials/ "Ember Initials Demo App"

## Install
`ember install ember-initials`

## Usage

### Quick start
Ember Initials gives you a built-in component which you can use in yours templates:

```hbs
{{ember-initials name="John Doe"}}
```

It will generate an avatar with `JD` initials.

### Customization
You can pass options to the `{{ember-initials}}` directive or extend your Component with a mixin:

```js
import Initials from 'ember-initials/mixin';

export default Ember.Component.extend(Initials, {
  // your extensions
});
```
**Full list of options is available right in the code (mixin.js). If you read this probably you know what you are doing ;)**


### Examples
Bellow you can find some code examples with usage of available options.

#### Font customization
You can customize font by these arguments:
``` hbs
{{ember-initials
  name="John Doe"
  textColor='white'
  fontSize='12px'
  fontWeight=200
  fontFamily='Helvetica Neue Light, Arial, sans-serif'}}
```

#### Size
To change the size of avatar add `size` options (size in pixels):
```hbs
{{ember-initials name="John Doe" size=40}}
```

#### Seed Text
Seed text is a background color id generated through uniq string. By default it is a `name`.

```hbs
{{ember-initials name="John Doe"}}
```
Eg. It will return avatar with `red` background.

```hbs
{{ember-initials name="John Doe" seedText=user.email}}
```
Now it will return avatar with `blue` background.

#### Default name and background color
To change the default name and background color of avatar add `defaultName` and `defaultBackground` options:

```hbs
{{ember-initials
  name="John Doe"
  defaultName='!?'
  defaultBackground="#dd6a58"}}
```
