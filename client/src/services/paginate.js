import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // start index dekhi pageSize ma kati ota item rakhne tyaha samma ko array bana
  // jstai 1st page ma index 0 dekhi pageSize index samma ani 2nd page ma tyo dekhi uta
  return _(items).slice(startIndex).take(pageSize).value();
}
