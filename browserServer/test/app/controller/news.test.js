'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const cheerio = require("cheerio");
const egg_mock_1 = require("egg-mock");
describe('test/app/controller/news.test.ts', () => {
    const app = egg_mock_1.default.app();
    before(async () => {
        await app.ready();
    });
    after(() => app.close());
    afterEach(egg_mock_1.default.restore);
    it('should GET /news', async () => {
        const result = await app.httpRequest().get('/news').expect(200);
        const $ = cheerio.load(result.text);
        const listItem = $('.news-view .item');
        assert(listItem.length === app.context.news.pageSize);
    });
    it('should GET /news/item/:id', async () => {
        await app.httpRequest()
            .get('/news/item/1')
            .expect(/\/news\/item\/1/)
            .expect(200);
    });
    it('should GET /news/user/:id', async () => {
        await app.httpRequest()
            .get('/news/user/activatedgeek')
            .expect(/<span class="label">user:<\/span> activatedgeek/)
            .expect(200);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3cy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3cy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFFYixpQ0FBaUM7QUFDakMsbUNBQW1DO0FBQ25DLHVDQUEwQjtBQUUxQixRQUFRLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO0lBQ2hELE1BQU0sR0FBRyxHQUFHLGtCQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDckIsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ2hCLE1BQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBRUgsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRXpCLFNBQVMsQ0FBQyxrQkFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXRCLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNoQyxNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDJCQUEyQixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3pDLE1BQU0sR0FBRyxDQUFDLFdBQVcsRUFBRTthQUN0QixHQUFHLENBQUMsY0FBYyxDQUFDO2FBRW5CLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQzthQUN6QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxLQUFLLElBQUksRUFBRTtRQUN6QyxNQUFNLEdBQUcsQ0FBQyxXQUFXLEVBQUU7YUFDdEIsR0FBRyxDQUFDLDBCQUEwQixDQUFDO2FBRS9CLE1BQU0sQ0FBQyxpREFBaUQsQ0FBQzthQUN6RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=