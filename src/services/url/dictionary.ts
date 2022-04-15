const paramWords = {
  '%22%2C%22': '%22%2C%22', // ","
  '%22%3A%22': '%22%3A%22', // ":"
  '%7B%22': '%7B%22', // {"
  '%22%7D': '%22%7D', // "}
  '%5D%7D': '%5D%7D', // ]}
};

const dictionaryKeys = Object.keys(paramWords);

export const paramDictionary = {
  '~V~': dictionaryKeys[0],
  '~W~': dictionaryKeys[1],
  '~X~': dictionaryKeys[2],
  '~Y~': dictionaryKeys[3],
  '~Z~': dictionaryKeys[4],
};
