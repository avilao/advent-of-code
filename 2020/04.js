const FIELD_VALIDATORS = {
  byr: (v) => {
    if (!v.match(/[0-9]{4}$/)) return false;
    const n = parseInt(v);
    return n >= 1920 && n <= 2002;
  },
  ecl: (v) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
  eyr: (v) => {
    if (!v.match(/[0-9]{4}$/)) return false;
    const n = parseInt(v);
    return n >= 2020 && n <= 2030;
  },
  hcl: (v) => {
    return !!v.match(/#[a-f0-9]{6}$/);
  },
  hgt: (v) => {
    if (!v.match(/\d+(in|cm)/)) return false;
    const unit = v.slice(-2);
    const valueStr = v.slice(0, -2);

    const value = parseInt(valueStr, 10);
    if (unit === 'cm') return value >= 150 && value <= 193;
    if (unit === 'in') return value >= 59 && value <= 76;
    return false;
  },
  iyr: (v) => {
    if (!v.match(/[0-9]{4}$/)) return false;
    const n = parseInt(v);
    return n >= 2010 && n <= 2020;
  },
  pid: (v) => !!v.match(/^[0-9]{9}$/),
};

function checkValidFieldValues(fields) {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (!FIELD_VALIDATORS[field[0]](field[1])) return false;
  }
  return true;
}

export function solve(input, validateFieldValues = false) {
  const passports = input.split('\n\n').map((p) => {
    const fields = [];
    p.split(/[\n\s]/).forEach((kv) => {
      const pair = kv.split(':');
      if (pair[0] !== 'cid') {
        fields.push(pair);
      }
    });
    return fields;
  });

  let validPassportCount = 0;
  // assuming keys cannot be repeated
  passports.forEach((passport) => {
    if (
      passport.length === 7 &&
      (!validateFieldValues || checkValidFieldValues(passport))
    ) {
      validPassportCount++;
    }
  });
  return validPassportCount;
}
