// const { details: detailsWithbio } = useContext(ProfileContext).profileUser; // getting rid of bio as it doesnt conform to theother details properties.
// const { bio, ...details } = detailsWithbio;

import { flattenObjectDeep } from "utils/flattenObjectDeep";
import { isObject } from "utils/isObject";
import { camelToLetterCase, camelToSnakeCase } from "utils/stringHelpers";

// console.log('🚀 ~ file: About2.jsx ~ line 6 ~ details', details);

const iconsBaseUrl = '../../../../../icons/';

export const createDetailsArray = details => {
  console.log('🚀 ~ file: createDetailsArray.js ~ line 13 ~ details', details)
  const createMissingText = string => `No ${string} to show`;
  const getSubItemTextAndIcon = val => {
    return {
      workPlace: {
        text: val ? `Works at ${val}` : createMissingText('workplace info'),
        icon: iconsBaseUrl + 'job.png',
      },
      job: {
        text: val ? `Works as ${val}` : createMissingText('job info'),
        icon: iconsBaseUrl + 'job.png',
      },
      college: {
        text: val ? `Went to ${val}` : createMissingText('college'),
        icon: iconsBaseUrl + 'studies.png',
      },
      highSchool: {
        text: val ? `Went to ${val}` : createMissingText('high school'),
        icon: iconsBaseUrl + 'studies.png',
      },
      currentCity: {
        text: val ? `Lives in ${val}` : createMissingText('current city'),
        icon: iconsBaseUrl + 'home.png',
      },
      hometown: {
        text: val ? `From ${val}` : createMissingText('hometown info'),
        icon: iconsBaseUrl + 'from.png',
      },
      relationshipStatus: {
        text: val ? val : createMissingText('relationship info'),
        icon: iconsBaseUrl + 'relationship.png',
      },
      familyMembers: {
        text: val ? val : createMissingText('family members'),
        icon: iconsBaseUrl + 'relationship.png',
      },
      instagram: {
        text: val ? val : createMissingText('instagram'),
        icon: iconsBaseUrl + 'instagram.png',
      },
    };
  };

  const overView = {
    title: 'Overview',
    snakeCase: 'overview',
    subItems: Object.entries(flattenObjectDeep(details)).map(([key, value]) => {
      return {
        name: camelToLetterCase(key),
        dbName: key,
        value: value,
        iconSrc: getSubItemTextAndIcon(value)[key]?.icon,
        text: getSubItemTextAndIcon(value)[key]?.text,
      };
    }),
  };

  let detailsArray = [overView];
  Object.entries(details).forEach(([key, value]) => {
    detailsArray.push({
      dbName: key,
      title: camelToLetterCase(key),
      snakeCase: camelToSnakeCase(key),
      subItems: Object.entries(value).map(([key, value]) => {
        if (isObject(value)) {
          return {
            subTitle: camelToLetterCase(key),
            nestedItems: Object.entries(value).map(([nestedKey, nestedValue]) => {
              return {
                name: camelToLetterCase(nestedKey),
                dbName: nestedKey,
                value: nestedValue,
                iconSrc: getSubItemTextAndIcon(nestedValue)[nestedKey].icon,
                text: getSubItemTextAndIcon(nestedValue)[nestedKey].text,
              };
            }),
          };
        } else {
          return {
            name: camelToLetterCase(key),
            dbName: key,
            value: value,
            iconSrc: getSubItemTextAndIcon(value)[key]?.icon,
            text: getSubItemTextAndIcon(value)[key]?.text,
          };
        }
      }),
    });
  });

  return detailsArray;
};
