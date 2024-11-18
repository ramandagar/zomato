const areCustomizationsEqual = (options1: any[], options2: any[]) => {
    if (!options1 || !options2) return false;
    if (options1.length !== options2.length) return false;
    
    return options1.every((opt1: any, index: number) => {
        const opt2 = options2[index];
        return opt1.selectedOption?.id === opt2.selectedOption?.id;
    });
}