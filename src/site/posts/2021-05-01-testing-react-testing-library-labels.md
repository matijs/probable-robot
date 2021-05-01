---
title: Using i18n labels to target components using react-testing-library
---

Testing is always difficult

Adding test-id's to a dom that goes to production feels wrong

Targeting elements using classnames is error prone and not a correct use of
those classnames

testing-library uses \*ByText methods to find elements by the text that they
contain

our application is multilanguage

we use react-i18next for this

As the app started growing we needed a different strategy for building
dictiornaries

decided to pick element.sub-element.leaf-element for example
'remove-foo.dialog.primary-button'

in testing the translations themselves are not important at all

the hook for testing is mocked as an identity function

that means key -> key

that means those actual keys end up in the dom

that means they can be targeted as such!

so much win
