import React from "react";
import { Link } from "react-router-dom";

function lvlSettings() {
  return (
    <div>
        <div class="container sticky-top mb-4 pt-2">
            <nav class="navbar dark-nav">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Настройки уровней</a>
                </div>
            </nav>
        </div>

        <main class="container px-4">
            <small>Для каждого уровня укажите перерыв (в днях) до следующего повторения</small>
            <div class="mb-2 mt-3">
                <label for="lvl1" class="form-label">Уровень 1</label>
                <input type="text" class="form-control py-2-5" id="lvl1" value="1"/>
            </div>
            <div class="mb-2">
                <label for="lvl2" class="form-label">Уровень 2</label>
                <input type="text" class="form-control py-2-5" id="lvl2" value="3"/>
            </div>
            <div class="mb-2">
                <label for="lvl3" class="form-label">Уровень 3</label>
                <input type="text" class="form-control py-2-5" id="lvl3" value="5"/>
            </div>
            <div class="mb-2">
                <label for="lvl4" class="form-label">Уровень 4</label>
                <input type="text" class="form-control py-2-5" id="lvl4" value="10"/>
            </div>
            <div class="mb-5">
                <label for="lvl5" class="form-label">Уровень 5</label>
                <input type="text" class="form-control py-2-5" id="lvl5" value="12"/>
            </div>


            <div class="mt-3">
                <button type="text" class="btn btn-primary py-2 w-100">
                    <span>Добавить уровень</span>
                </button>
            </div>
            <small>если слово на последнем уровне, то дни будут добавляться одни и те же</small>

        </main>

        
    </div>
  );
}

export default lvlSettings;
