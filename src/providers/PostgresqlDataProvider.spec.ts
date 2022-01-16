import { Underflag, JsonDataProvider } from 'underflag';

describe('Data Provider', () => {
    describe('Json', () => {

        test('should return feature test-a on', async () => {
            const dataProvider = new JsonDataProvider({ data: { "test-a": true } });
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOn('test-a')).resolves.toBeTruthy();
        });

        test('should return feature test-b off', async () => {
            const dataProvider = new JsonDataProvider({ data: { "test-b": false } });
            const underflag = new Underflag({ dataProvider });
            await expect(underflag.isOff('test-b')).resolves.toBeTruthy();
        });

        test('should return two features', async () => {
            const dataProvider = new JsonDataProvider({ data: { "test-a": true, "test-b": false } });
            const underflag = new Underflag({ dataProvider });
            const res = await underflag.getAll();
            expect(res).toBeInstanceOf(Array);
            expect(res.length).toEqual(2);
        });
    });
});