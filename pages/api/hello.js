let counter = 0;

export default (req, res) => {
    res.status(200).json({ text: `hello ${++counter}` });
};
