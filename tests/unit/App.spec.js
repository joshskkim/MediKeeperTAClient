import { mount } from '@vue/test-utils';
import App from '../../src/App.vue';
import Items from '../../src/components/Items.vue';
import SingleItem from '../../src/components/SingleItem.vue';
import SearchBar from '../../src/components/SearchBar.vue';


describe('Main App Mounting', () => {
  const appFactory = (values = {}) => mount(App, {
    data() {
      return {
        ...values,
      };
    },
  });

  const appWrapper = appFactory();

  it('renders main app', () => {
    expect(appWrapper.findComponent(App)).toBeTruthy();
  });

  describe('Items component', () => {
    const item = {
      id: 1,
      iname: 'SAMPLE ITEM',
      cost: 100,
    };
  
    const itemsFactory = (propsData) => {
      return mount(Items, {
        propsData: {
          item,
          ...propsData,
        },
      });
    };
  
    const itemsWrapper = itemsFactory();
  
    it('renders the table', () => {
      expect(itemsWrapper.findComponent(Items)).toBeTruthy();
    });
    
    describe('SingleItems Component', () => {
  
      const singleItemFactory = (propsData) => {
        return mount(SingleItem, {
          propsData: {
            item,
            ...propsData,
          },
        });
      };
  
      const singleItemWrapper = singleItemFactory();
  
      it('inputs sample item to table', () => {
        expect(singleItemWrapper.findComponent(SingleItem)).toBeTruthy();
      });
  
      it('should allow item editing', async () => {
        await singleItemWrapper.find('.edit').trigger('click.prevent');
  
        expect(singleItemWrapper.emitted('edit-item')).toBeTruthy();
      });
  
      it('should delete item', async () => {
        await singleItemWrapper.find('.del').trigger('click.prevent');
  
        expect(singleItemWrapper.emitted('del-item')).toBeTruthy();
      });
    });
  });

  describe('Main App functionality', () => {
    const item = {
      id: 1,
      iname: 'sample',
      cost: '10',
    }
    const local = {
      items: [],
      allItems: [],
      newItem: item,
      originalItem: {},
      maxPriceItem: {},
    };

    it('Adds an item', () => {
      App.methods.handleAdd.call(local);

      expect(local.items.length).toEqual(1);
    });

    it('searches an item', () => {
      App.methods.handleSearch.call(local, item.iname);

      expect(local.allItems.length).toBeDefined();

    });

    it('deletes an item', () => {
      App.methods.handleDelete.call(local, item.iname);

      expect(local.items.length).toBe(0);
    });

    it('unfilters the items', () => {
      App.methods.handleUnfilter.call(local);

      expect(local.items).toHaveLength(local.allItems.length);
    })

  })

  describe('Search Bar Component', () => {
    const searchWrapper = mount(SearchBar);
    
    it('renders the search bar', () => {
      expect(searchWrapper.findComponent(SearchBar)).toBeTruthy();
    });
    
    it('searches on user input', async () => {
      await searchWrapper.find('#search').setValue('Sample Item');
      await searchWrapper.find('form').trigger('submit.prevent');
      
      expect(searchWrapper.emitted('search-name')).toBeTruthy();
    });
  });
});
  