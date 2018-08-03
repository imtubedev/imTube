'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const egg_mock_1 = require("egg-mock");
describe('test/app/service/News.test.js', () => {
    const app = egg_mock_1.default.app();
    let ctx;
    before(async () => {
        await app.ready();
        ctx = app.mockContext();
    });
    after(() => app.close());
    afterEach(egg_mock_1.default.restore);
    it('getTopStories', async () => {
        const list = await ctx.service.news.getTopStories();
        assert(list.length === 30);
    });
    it('getItem', async () => {
        const item = await ctx.service.news.getItem(1);
        assert(item.id && item.title && item.url);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmV3cy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTmV3cy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFFYixpQ0FBaUM7QUFFakMsdUNBQTBCO0FBRTFCLFFBQVEsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7SUFDN0MsTUFBTSxHQUFHLEdBQUcsa0JBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQixJQUFJLEdBQVksQ0FBQztJQUVqQixNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDaEIsTUFBTSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUN6QixTQUFTLENBQUMsa0JBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV0QixFQUFFLENBQUMsZUFBZSxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQzdCLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==