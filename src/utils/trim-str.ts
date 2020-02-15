export const isNullStr = (str: string) => {
    const eg = /\"(.*?)\"/g;
    console.log(str.length);
    console.log(str.match(eg).length);
}
