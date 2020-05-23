<p align="center">
  <img src="https://raw.githubusercontent.com/Exelord/ember-initials/master/ember-initials.png" alt="ember-initials"/>
  <a href="https://travis-ci.org/Exelord/ember-initials">
    <img src="https://travis-ci.org/Exelord/ember-initials.svg?branch=master">
  </a>
  <a href="https://david-dm.org/exelord/ember-initials">
    <img src="https://david-dm.org/exelord/ember-initials/status.svg">
  </a>
  <a href="https://gitter.im/Exelord/ember-initials?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge">
    <img src="https://badges.gitter.im/Exelord/ember-initials.svg">
  </a>
  <a href="https://codeclimate.com/github/Exelord/ember-initials/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/05c3ebd3e7a075ab21ef/maintainability">
  </a>
</p>

Ember Initials is a package for generating simple avatars using users initials, images, gravatars or adorables. It definitely supports Ember 3.8 (or higher). Thanks to highly customizable interface you can define defaults and even set fallbacks.

## Demo App with code generators
Demo app with interactive examples you can find at [http://exelord.github.io/ember-initials][9225812a]

[9225812a]: http://exelord.github.io/ember-initials/ "Ember Initials Demo App"

## Compatibility

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above

This addon has been tested on:
- IE 10 and UP including EDGE
- Firefox 44 and UP
- Chrome 48 and UP
- Opera 35 and UP

## Install
`ember install ember-initials`

## Quick start
Ember Initials gives you a built-in components which you can use in yours templates:

##### Initials avatars:
```hbs
<EmberInitials @name="John Doe" />
```
or

```hbs
<EmberInitials::Initials @name="John Doe" />
```

##### Image avatars:
```hbs
<EmberInitials::Image @image="/url/to/avatar.png" />
```

##### Gravatar avatars:
```hbs
<EmberInitials::Gravatar @email="gravatar@email.com" />
```

##### Adorables avatars:
```hbs
<EmberInitials::Adorable @email="email.to@generate.com" />
```

> Examples, configuration and code generator are available on [Project Site][9225812a].

## API Documentation

### `EmberInitials`
```hbs
<EmberInitials
  @image="images/user.jpg"
  @name="Ember Initials"
  @defaultName="?"
  @seedText="Ember Initials"
  @textColor="white"
  @fontSize=55
  @fontWeight=100
  @fontFamily="Helvetica Neue Light, Arial, sans-serif"
  @size=200
/>
```

- `image` - image url | if image will be not found the initials avatars will be used

- `name` - name of user to generate initials

- `defaultName` - if `name` will be not passed this name will be used

- `seedText` - uniq string which will be used to generate background color, eg. user's email

- `textColor` - color of the text (initials) | hash or name

- `fontSize` - font size in `px`

- `fontWeight` - font weight in `px`

- `fontFamily` - names of fonts with fallbacks | at this time only system fonts can be used

- `size` - size of the avatar in pixels (set `null` if you do not want to use elements attributes like `width` and `height`)

### `EmberInitials::Image`
```hbs
<EmberInitials::Image
  @image="images/user.jpg"
  @size=200
  @defaultImage="images/default.jpg"
/>
```

- `image` - image url | if image will be not found the `defaultImage` will be used

- `defaultImage` - default image url

- `size` - size of the avatar in pixels (set `null` if you do not want to use elements attributes like `width` and `height`)

### `EmberInitials::Gravatar`
```hbs
<EmberInitials::Gravatar
  @image="images/user.jpg"
  @email="example@example.com"
  @defaultImage="images/default.jpg"
  @relativeUrl="true"
  @size=200
/>
```

- `image` - image url | if image will be not passed the avatar will be generated form email thanks to gravatar

- `email` - Email which will be used to fetching the gravatar

- `defaultImage` - image src (relative or absolute URL depends on `relativeUrl` option) | if gravatar will not be found this image will be used

- `relativeUrl` - `true` or `false` | decide which `defaultImage` url do you want to use - relative or absolute

- `size` - size of the avatar in pixels (set `null` if you do not want to use elements attributes like `width` and `height`)

### `EmberInitials::Adorable`
```hbs
<EmberInitials::Adorable
  @image="images/user.jpg"
  @email="email@user.com"
  @size=50
/>
```
- `image` - image url | if image will be not found the avatar will be generated form email thanks to adorable

- `email` - Email which will be used to generating unique adorable avatar

- `size` - size of the avatar in pixels (set `null` if you do not want to use elements attributes like `width` and `height`)
