<template>
  <div class="container-fluid py-3 compact-view">
    <div class="card shadow-sm border-0">
      
      <!-- HEADER PRINCIPAL -->
      <div class="card-header bg-white py-2 d-flex justify-content-between align-items-center border-bottom">
        <h5 class="mb-0 text-capitalize text-primary fw-bold">
          <i class="fa-solid fa-users me-2"></i>{{ category }}
        </h5>
        <div>
          <button class="btn btn-sm btn-success me-2" @click="openCreateModal">
            <i class="fa-solid fa-plus me-1"></i> Create
          </button>
          <button 
            class="btn btn-sm btn-outline-danger" 
            @click="deleteSelectedFootballers"
            :disabled="!selectedFootballers.length"
          >
            <i class="fa-solid fa-trash me-1"></i> Delete ({{ selectedFootballers.length }})
          </button>
        </div>
      </div>

      <!-- CUERPO DE LA TABLA -->
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-sm table-hover align-middle mb-0 text-nowrap fs-7">
            <thead class="table-light align-top">
              
              <!-- FILA 1: FILTROS DE BÚSQUEDA -->
              <tr>
                <th style="width: 30px;"></th>
                <th style="width: 35px;"></th>
                <th><input type="text" class="form-control form-control-xs" placeholder="Name..." v-model="filters.name"></th>
                <th><input type="text" class="form-control form-control-xs" placeholder="Nationality..." v-model="filters.nationality.name"></th>
                <th><input type="text" class="form-control form-control-xs" placeholder="Birthplace..." v-model="filters.birthplace"></th>
                <th><input type="text" class="form-control form-control-xs" placeholder="Country..." v-model="filters.countryOfBirth.name"></th>
                <th v-if="hasPosition"><input type="text" class="form-control form-control-xs" placeholder="Position..." v-model="filters.position"></th>
                <th><input type="number" class="form-control form-control-xs" placeholder="Height..." v-model="filters.height"></th>
                <th><input type="text" class="form-control form-control-xs" placeholder="Birthday..." v-model="filters.birthday"></th>
                <th><input type="number" class="form-control form-control-xs" placeholder="Apps..." v-model="filters.apps"></th>
                <th v-if="hasGoals"><input type="number" class="form-control form-control-xs" placeholder="Goals..." v-model="filters.goals"></th>
                <th><input type="number" class="form-control form-control-xs" placeholder="IntCaps..." v-model="filters.intCaps"></th>
                <th v-if="hasGoals"><input type="number" class="form-control form-control-xs" placeholder="IntGoals..." v-model="filters.intGoals"></th>
                <th><input type="text" class="form-control form-control-xs" placeholder="Team..." v-model="filters.team.name"></th>
                <th><input type="text" class="form-control form-control-xs" placeholder="TC..." v-model="filters.tc"></th>
                <th v-if="category === 'goalkeepers'"><input type="text" class="form-control form-control-xs" placeholder="Starter..." v-model="filters.starter"></th>
                <th style="width: 50px;"></th>
              </tr>

              <!-- FILA 2: CABECERA Y ORDENAMIENTO -->
              <tr class="text-secondary fw-semibold">
                <th><input type="checkbox" class="form-check-input" @change="toggleSelectAll"></th>
                <th>#</th>
                <th @click="sortByColumn('name')" class="cursor-pointer">Name <i class="fa-solid fa-sort"></i></th>
                <th @click="sortByColumn('nationality')" class="cursor-pointer">Nationality <i class="fa-solid fa-sort"></i></th>
                <th @click="sortByColumn('birthplace')" class="cursor-pointer">Birthplace <i class="fa-solid fa-sort"></i></th>
                <th @click="sortByColumn('countryOfBirth')" class="cursor-pointer">Country of Birth <i class="fa-solid fa-sort"></i></th>
                <th v-if="hasPosition" @click="sortByColumn('position')" class="cursor-pointer">Position <i class="fa-solid fa-sort"></i></th>
                <th @click="sortByColumn('height')" class="cursor-pointer">Height <i class="fa-solid fa-sort"></i></th>
                <th @click="sortByColumn('birthday')" class="cursor-pointer">Birthday <i class="fa-solid fa-sort"></i></th>
                <th @click="sortByColumn('apps')" class="cursor-pointer">Apps <i class="fa-solid fa-sort"></i></th>
                <th v-if="hasGoals" @click="sortByColumn('goals')" class="cursor-pointer">Goals <i class="fa-solid fa-sort"></i></th>
                <th @click="sortByColumn('intCaps')" class="cursor-pointer">IntCaps <i class="fa-solid fa-sort"></i></th>
                <th v-if="hasGoals" @click="sortByColumn('intGoals')" class="cursor-pointer">IntGoals <i class="fa-solid fa-sort"></i></th>
                <th @click="sortByColumn('team')" class="cursor-pointer">Team <i class="fa-solid fa-sort"></i></th>
                <th @click="sortByColumn('tc')" class="cursor-pointer">TC <i class="fa-solid fa-sort"></i></th>
                <th v-if="category === 'goalkeepers'" @click="sortByColumn('starter')" class="cursor-pointer">Starter <i class="fa-solid fa-sort"></i></th>
                <th class="text-end pe-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(footballer, index) in filteredFootballers" :key="footballer._id">
                <td><input type="checkbox" class="form-check-input" v-model="selectedFootballers" :value="footballer._id"></td>
                <td class="text-muted">{{ index + 1 }}</td>
                <td>{{ footballer.name }}</td>
                <td>
                  <img v-if="footballer.nationality?.flag" :src="footballer.nationality.flag" class="me-1 border rounded-1" width="18" height="12" alt="flag">
                  <span>{{ footballer.nationality?.name }}</span>
                </td>
                <td>{{ footballer.birthplace || '-' }}</td>
                <td>
                  <img v-if="footballer.countryOfBirth?.flag" :src="footballer.countryOfBirth.flag" class="me-1 border rounded-1" width="18" height="12" alt="flag">
                  <span>{{ footballer.countryOfBirth?.name }}</span>
                </td>
                <td v-if="hasPosition"><span class="badge bg-light text-dark border py-1">{{ footballer.position }}</span></td>
                <td>{{ footballer.height ? footballer.height.toFixed(2) : '0.00' }}</td>
                <td>{{ footballer.birthday || '-' }}</td>
                <td>{{ footballer.apps }}</td>
                <td v-if="hasGoals">{{ footballer.goals }}</td>
                <td>{{ footballer.intCaps }}</td>
                <td v-if="hasGoals">{{ footballer.intGoals }}</td>
                <td>
                  <img v-if="footballer.team?.logo" :src="footballer.team.logo" class="me-1" width="16" height="16" alt="logo">
                  <span>{{ footballer.team?.name }}</span>
                </td>
                <td><span class="badge bg-secondary-subtle text-secondary border">{{ footballer.tc }}</span></td>
                <td v-if="category === 'goalkeepers'">
                  <span :class="{
                    'badge bg-success': footballer.starter === 'a',
                    'badge bg-primary': footballer.starter === 'b',
                    'badge bg-warning text-dark': footballer.starter === 'c',
                    'badge bg-secondary': footballer.starter === 'd'
                  }">
                    {{ footballer.starter }}
                  </span>
                </td>
                <td class="text-end pe-2">
                  <button class="btn btn-sm btn-link text-primary p-0" @click="showEditDialog(footballer)">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- MODAL DE FORMULARIO DE CREACIÓN/EDICIÓN -->
    <div class="modal fade" id="footballerModal" tabindex="-1" ref="modalRef">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header py-2">
            <h6 class="modal-title fw-bold">{{ isEditing ? 'Update' : 'Create' }} {{ category }}</h6>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body fs-7">
            <form class="row g-2">
              <div class="col-md-6">
                <label class="form-label mb-0 fw-semibold">Name</label>
                <input type="text" class="form-control form-control-sm" v-model="formData.name">
              </div>

              <!-- SELECT DINÁMICO DE POSICIÓN -->
              <div class="col-md-6" v-if="hasPosition">
                <label class="form-label mb-0 fw-semibold">Position</label>
                <select class="form-select form-select-sm" v-model="formData.position">
                  <option value="" disabled>Select Position</option>
                  <option v-for="pos in positionOptions" :key="pos" :value="pos">
                    {{ pos }}
                  </option>
                </select>
              </div>

              <!-- NACIONALIDAD -->
              <div class="col-md-6">
                <label class="form-label mb-0 fw-semibold">Nationality</label>
                <input type="text" class="form-control form-control-sm mb-1" v-model="formData.nationality.name" placeholder="Country Name">
                <input type="text" class="form-control form-control-sm" v-model="formData.nationality.flag" placeholder="Flag URL">
              </div>

              <!-- NACIMIENTO -->
              <div class="col-md-6">
                <label class="form-label mb-0 fw-semibold">Birthplace</label>
                <input type="text" class="form-control form-control-sm mb-1" v-model="formData.birthplace" placeholder="Place (City)">
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control" v-model="formData.countryOfBirth.name" placeholder="Country Name">
                  <input type="text" class="form-control" v-model="formData.countryOfBirth.flag" placeholder="Flag URL">
                </div>
              </div>

              <!-- DATOS FÍSICOS Y ESTADÍSTICAS -->
              <div class="col-md-3">
                <label class="form-label mb-0 fw-semibold">Height (m)</label>
                <input type="number" step="0.01" class="form-control form-control-sm" v-model="formData.height">
              </div>
              <div class="col-md-3">
                <label class="form-label mb-0 fw-semibold">Birthday</label>
                <input type="text" class="form-control form-control-sm" v-model="formData.birthday" placeholder="DD-MM-YYYY">
              </div>
              <div class="col-md-3">
                <label class="form-label mb-0 fw-semibold">Apps</label>
                <input type="number" class="form-control form-control-sm" v-model="formData.apps">
              </div>
              <div class="col-md-3" v-if="hasGoals">
                <label class="form-label mb-0 fw-semibold">Goals</label>
                <input type="number" class="form-control form-control-sm" v-model="formData.goals">
              </div>

              <!-- SELECCIÓN NACIONAL -->
              <div class="col-md-3">
                <label class="form-label mb-0 fw-semibold">IntCaps</label>
                <input type="number" class="form-control form-control-sm" v-model="formData.intCaps">
              </div>
              <div class="col-md-3" v-if="hasGoals">
                <label class="form-label mb-0 fw-semibold">IntGoals</label>
                <input type="number" class="form-control form-control-sm" v-model="formData.intGoals">
              </div>

              <!-- EQUIPO Y SELECT RESTRINGIDO DE TC -->
              <div class="col-md-6">
                <label class="form-label mb-0 fw-semibold">Team</label>
                <div class="input-group input-group-sm mb-1">
                  <input type="text" class="form-control" v-model="formData.team.name" placeholder="Team Name">
                  <select class="form-select" v-model="formData.tc" style="max-width: 90px;">
                    <option value="" disabled>TC</option>
                    <option value="ENG">ENG</option>
                    <option value="FRA">FRA</option>
                    <option value="GER">GER</option>
                    <option value="ITA">ITA</option>
                    <option value="ESP">ESP</option>
                  </select>
                </div>
                <input type="text" class="form-control form-control-sm" v-model="formData.team.logo" placeholder="Team Logo URL">
              </div>

              <!-- SELECT DE STARTER PARA GOALKEEPERS -->
              <div class="col-md-6" v-if="category === 'goalkeepers'">
                <label class="form-label mb-0 fw-semibold">Starter</label>
                <select class="form-select form-select-sm" v-model="formData.starter">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer py-2">
            <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-sm btn-primary" @click="saveFootballer">
              {{ isEditing ? 'Save' : 'Create' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ipdata from '@/constants/ipdata';
import portdata from '@/constants/portdata';
import axios from 'axios';
import { Modal } from 'bootstrap';

export default {
  name: 'FootballersTable',
  props: {
    category: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      footballers: [],
      selectedFootballers: [],
      isEditing: false,
      currentId: null,
      bsModal: null,
      formData: this.getEmptyForm(),
      filters: {
        name: '',
        nationality: { name: '' },
        birthplace: '',
        countryOfBirth: { name: '' },
        position: '',
        height: null,
        birthday: '',
        apps: null,
        goals: null,
        intCaps: null,
        intGoals: null,
        team: { name: '' },
        tc: '',
        starter: ''
      },
      sortBy: '',
      sortDirection: 'asc'
    };
  },
  computed: {
    hasPosition() {
      return this.category !== 'goalkeepers';
    },
    hasGoals() {
      return this.category !== 'goalkeepers';
    },
    positionOptions() {
      switch (this.category) {
        case 'forwards':
          return ['Centre Forward', 'Left Winger', 'Right Winger'];
        case 'midfielders':
          return ['Central Midfielder', 'Defensive Midfielder', 'Attacking Midfielder', 'Left Midfielder', 'Right Midfielder'];
        case 'defenders':
          return ['Centre Back', 'Left Back', 'Right Back'];
        default:
          return [];
      }
    },
    filteredFootballers() {
      const specialCharsMap = {
        'å': 'a', 'æ': 'ae', 'ð': 'd', 'Đ': 'Dj', 'đ': 'dj', 'ı': 'i',
        'Ł': 'L', 'ł': 'l', 'Ø': 'O', 'ø': 'o', 'ß': 'ss'
      };

      const normalizeText = text => (text || '')
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/-/g, ' ')
        .replace(/å|æ|ð|Đ|đ|ı|Ł|ł|Ø|ø|ß/g, match => specialCharsMap[match] || match)
        .toLowerCase();

      return this.footballers.filter(footballer => {
        const filterName = normalizeText(this.filters.name);
        const filterNationality = normalizeText(this.filters.nationality.name);
        const filterBirthplace = normalizeText(this.filters.birthplace);
        const filterCountryOfBirth = normalizeText(this.filters.countryOfBirth.name);
        const filterPosition = normalizeText(this.filters.position);
        const filterBirthday = normalizeText(this.filters.birthday);
        const filterTeam = normalizeText(this.filters.team.name);
        const filterTc = normalizeText(this.filters.tc);
        const filterStarter = normalizeText(this.filters.starter);

        const matchesName = !filterName || normalizeText(footballer.name).includes(filterName);
        const matchesNationality = !filterNationality || normalizeText(footballer.nationality?.name).includes(filterNationality);
        const matchesBirthplace = !filterBirthplace || normalizeText(footballer.birthplace).includes(filterBirthplace);
        const matchesCountryOfBirth = !filterCountryOfBirth || normalizeText(footballer.countryOfBirth?.name).includes(filterCountryOfBirth);
        const matchesPosition = !filterPosition || normalizeText(footballer.position).includes(filterPosition);
        const matchesBirthday = !filterBirthday || normalizeText(footballer.birthday).includes(filterBirthday);
        const matchesTeam = !filterTeam || normalizeText(footballer.team?.name).includes(filterTeam);
        const matchesTc = !filterTc || normalizeText(footballer.tc).includes(filterTc);
        const matchesStarter = !filterStarter || normalizeText(footballer.starter).includes(filterStarter);

        let matchesHeight = true;
        let matchesApps = true;
        let matchesGoals = true;
        let matchesIntCaps = true;
        let matchesIntGoals = true;

        if (this.filters.height !== null && this.filters.height !== '') {
          matchesHeight = footballer.height === parseFloat(this.filters.height);
        }
        if (this.filters.apps !== null && this.filters.apps !== '') {
          matchesApps = footballer.apps === parseInt(this.filters.apps);
        }
        if (this.filters.goals !== null && this.filters.goals !== '') {
          matchesGoals = footballer.goals === parseInt(this.filters.goals);
        }
        if (this.filters.intCaps !== null && this.filters.intCaps !== '') {
          matchesIntCaps = footballer.intCaps === parseInt(this.filters.intCaps);
        }
        if (this.filters.intGoals !== null && this.filters.intGoals !== '') {
          matchesIntGoals = footballer.intGoals === parseInt(this.filters.intGoals);
        }

        return matchesName && matchesNationality && matchesBirthplace && matchesCountryOfBirth &&
               matchesPosition && matchesBirthday && matchesTeam && matchesTc && matchesStarter &&
               matchesHeight && matchesApps && matchesGoals && matchesIntCaps && matchesIntGoals;
      });
    }
  },
  mounted() {
    this.getFootballers();
    this.bsModal = new Modal(this.$refs.modalRef);
  },
  methods: {
    getEmptyForm() {
      let defaultPosition = '';
      if (this.category === 'forwards') defaultPosition = 'Centre Forward';
      else if (this.category === 'midfielders') defaultPosition = 'Central Midfielder';
      else if (this.category === 'defenders') defaultPosition = 'Centre Back';

      return {
        name: '',
        nationality: { flag: '', name: '' },
        birthplace: '',
        countryOfBirth: { flag: '', name: '' },
        position: defaultPosition,
        height: 1.80,
        birthday: '',
        apps: 0,
        goals: 0,
        intCaps: 0,
        intGoals: 0,
        team: { logo: '', name: '' },
        tc: 'ENG',
        starter: 'A'
      };
    },
    async getFootballers() {
      if (!this.category) return;
      try {
        const res = await axios.get(`http://${ipdata}:${portdata}/${this.category}`);
        this.footballers = res.data;
      } catch (err) {
        console.error(`Error fetching ${this.category}:`, err);
      }
    },
    openCreateModal() {
      this.isEditing = false;
      this.formData = this.getEmptyForm();
      this.bsModal.show();
    },
    showEditDialog(footballer) {
      this.isEditing = true;
      this.currentId = footballer._id;
      this.formData = JSON.parse(JSON.stringify(footballer));
      this.bsModal.show();
    },
    async saveFootballer() {
      const url = `http://${ipdata}:${portdata}/${this.category}`;
      try {
        if (this.isEditing) {
          await axios.put(`${url}/${this.currentId}`, this.formData);
        } else {
          await axios.post(url, this.formData);
        }
        this.bsModal.hide();
        this.getFootballers();
      } catch (err) {
        console.error('Error saving:', err);
      }
    },
    deleteSelectedFootballers() {
      const promises = this.selectedFootballers.map(id => 
        axios.delete(`http://${ipdata}:${portdata}/${this.category}/${id}`)
      );
      Promise.all(promises).then(() => {
        this.selectedFootballers = [];
        this.getFootballers();
      });
    },
    toggleSelectAll(e) {
      if (e.target.checked) {
        this.selectedFootballers = this.filteredFootballers.map(f => f._id);
      } else {
        this.selectedFootballers = [];
      }
    },
    sortByColumn(column) {
      this.sortDirection = (this.sortBy === column && this.sortDirection === 'asc') ? 'desc' : 'asc';
      this.sortBy = column;

      const numericColumns = ["height", "apps", "goals", "intCaps", "intGoals"];

      if (numericColumns.includes(column)) {
        this.footballers.sort((a, b) => {
          return this.sortDirection === 'asc' 
            ? (a[column] || 0) - (b[column] || 0) 
            : (b[column] || 0) - (a[column] || 0);
        });
      } else {
        this.footballers.sort((a, b) => {
          let aValue = a[column];
          let bValue = b[column];

          if (["nationality", "countryOfBirth", "team"].includes(column)) {
            aValue = a[column]?.name || '';
            bValue = b[column]?.name || '';
          }

          aValue = String(aValue || '').toLowerCase();
          bValue = String(bValue || '').toLowerCase();

          return this.sortDirection === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        });
      }
    }
  }
};
</script>

<style scoped>
.compact-view {
  font-size: 0.82rem;
}

.fs-7 {
  font-size: 0.8rem !important;
}

.form-control-xs {
  height: 24px;
  padding: 1px 4px;
  font-size: 0.75rem;
}

.cursor-pointer {
  cursor: pointer;
  user-select: none;
}

.cursor-pointer:hover {
  background-color: rgba(0, 0, 0, 0.025);
}
</style>