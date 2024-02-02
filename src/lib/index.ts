export function getSkillLevel(yearsOfExperience: number) {
  if (yearsOfExperience <= 1) {
    return 'junior'
  } else if (yearsOfExperience > 1 && yearsOfExperience <= 3) {
    return 'mid'
  } else {
    return 'senior'
  }
}
