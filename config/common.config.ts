interface IAppConfig{
    port: number
    secret: string
}
export default ():IAppConfig => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    secret: process.env.SECRET
});

