const PROMPT = '$';
const PREVIOUS_DIR = '..';
const ROOT_DIR = '/';
const KEYWORDS = {
  CD: 'cd',
  DIR: 'dir',
  LS: 'ls',
};

class Node {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.dirs = {};
    this.files = {};
  }

  getSizeOfFiles() {
    if (this.size === undefined) {
      this.size = 0;
      Object.values(this.files).forEach((filesize) => (this.size += filesize));
    }
    return this.size;
  }

  addFile(name, size) {
    if (!this.files[name]) {
      this.files[name] = parseInt(size, 10);
    }
  }

  addDir(name) {
    if (!this.dirs[name]) {
      this.dirs[name] = new Node(name, this);
    }
  }
}

function executeCd(param) {
  // go to root
  if (param === ROOT_DIR) {
    currentNode = nodeMap;
  } else if (param === PREVIOUS_DIR) {
    currentNode = currentNode.parent || nodeMap;
  } else {
    // go to dir if exists in folder
    if (!currentNode.dirs[param]) {
      currentNode.dirs[param] = new Node(param, currentNode);
    }
    currentNode = currentNode.dirs[param];
  }
}

function getDirSize(node) {
  let totalSize = node.getSizeOfFiles();

  Object.keys(node.dirs).forEach(
    (dir) => (totalSize += getDirSize(node.dirs[dir]))
  );

  if (totalSize <= SIZE_TRESHOLD) {
    problemTotal += totalSize;
  }

  folderSizes.push(totalSize);

  return totalSize;
}

const TOTAL_SIZE = 70000000;
const MINIMUM_AVALIABLE_SIZE = 30000000;
const SIZE_TRESHOLD = 100000;
const folderSizes = [];

const nodeMap = new Node('/');

let problemTotal = 0;
let currentNode = nodeMap;

function buildFolderStructure(input) {
  input.split('\n').forEach((line) => {
    const lineContent = line.split(' ');

    // parse command
    if (lineContent[0] === PROMPT) {
      if (lineContent[1] === KEYWORDS.CD) {
        executeCd(lineContent[2]);
      }
    } else if (lineContent[0] !== KEYWORDS.DIR) {
      currentNode.addFile(lineContent[1], lineContent[0]);
    } else {
      currentNode.addDir(lineContent[1]);
    }
  });
}

export function solve(input) {
  buildFolderStructure(input);
  const neededDeleteSize =
    MINIMUM_AVALIABLE_SIZE - (TOTAL_SIZE - getDirSize(nodeMap));

  folderSizes.sort((a, b) => a - b);
  for (let i = 0; i < folderSizes.length; i++) {
    if (folderSizes[i] > neededDeleteSize)
      return { part1: problemTotal, part2: folderSizes[i] };
  }
}
