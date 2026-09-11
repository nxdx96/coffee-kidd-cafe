import { photo } from './photo';
import { siteSettings } from './siteSettings';
import { homePage } from './homePage';
import { storyPage } from './storyPage';
import { contactPage } from './contactPage';
import { mailingListPage } from './mailingListPage';
import { menuItem } from './menuItem';
import { event } from './event';

export const schemaTypes = [
  // object
  photo,
  // singletons (one document each)
  siteSettings,
  homePage,
  storyPage,
  contactPage,
  mailingListPage,
  // collections
  menuItem,
  event,
];
